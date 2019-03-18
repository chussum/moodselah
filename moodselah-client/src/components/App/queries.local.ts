import { gql } from 'apollo-boost';

export const IS_LOGGED_IN = gql`
  {
    auth @client {
      isLoggedIn
      user {
        id
        nick
        email
        profilePhoto
      }
    }
  }
`;
