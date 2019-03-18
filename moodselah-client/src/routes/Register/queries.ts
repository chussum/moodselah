import { gql } from 'apollo-boost';

export const EMAIL_SIGN_UP = gql`
  mutation emailSignUp(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $nick: String!
    $profilePhoto: String
    $phoneNumber: String
  ) {
    EmailSignUp(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      nick: $nick
      profilePhoto: $profilePhoto
      phoneNumber: $phoneNumber
    ) {
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
