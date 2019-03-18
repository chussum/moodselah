import { gql } from 'apollo-boost';

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      success
      error
      user {
        id
        nick
        email
        profilePhoto
      }
    }
  }
`;
