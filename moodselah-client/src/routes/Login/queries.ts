import { gql } from 'apollo-boost';

export const EMAIL_SIGN_IN = gql`
  mutation emailSignIn($email: String!, $password: String!) {
    EmailSignIn(email: $email, password: $password) {
      success
      error
      token
      user {
        id
        email
        nick
        profilePhoto
      }
    }
  }
`;
