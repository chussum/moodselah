import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink, concat, Operation, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { toast } from 'react-toastify';
import Storage, { KEY } from '~/helpers/storage';

const graphQLUrl = process.env.GRAPHQL_URI || '';
const subscritionUrl = process.env.SUBSCRIPTION_URI || '';

const getUser = () => {
  const user = Storage.get(KEY.USER);
  if (user) {
    return Object.assign(
      {
        __typename: 'User'
      },
      user
    );
  }
  return null;
};

const getToken = () => {
  const user = getUser();
  if (user && user.token) {
    return user.token;
  }
  return '';
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      Authorization: getToken()
    }
  });
  return forward(operation);
});

const httpLink = new createUploadLink({
  uri: graphQLUrl
});

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      Authorization: getToken()
    },
    reconnect: true
  },
  uri: subscritionUrl
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: 'Auth',
      user: getUser(),
      isLoggedIn: Boolean(getToken())
    }
  },
  resolvers: {
    Mutation: {
      logUserIn: (_, { token, user }, { cache: appCache }) => {
        const loggedUserData = {
          ...user,
          token
        };
        Storage.set(KEY.USER, JSON.stringify(loggedUserData));
        appCache.writeData({
          data: {
            auth: {
              __typename: 'Auth',
              isLoggedIn: true,
              user: getUser()
            }
          }
        });
        return null;
      },
      logUserOut: (_, __, { cache: appCache }) => {
        Storage.remove(KEY.USER);
        appCache.writeData({
          data: {
            auth: {
              __typename: 'Auth',
              isLoggedIn: false,
              user: null
            }
          }
        });
        return null;
      }
    }
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, localStateLink, concat(authMiddleware, combinedLinks)])
});

export default client;
