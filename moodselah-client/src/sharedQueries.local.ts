import { gql } from 'apollo-boost';

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!, $user: User!) {
    logUserIn(token: $token, user: $user) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
