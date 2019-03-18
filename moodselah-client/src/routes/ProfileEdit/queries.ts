import { gql } from 'apollo-boost';

export const UPDATE_MY_PROFILE = gql`
  mutation UpdateMyProfile(
    $email: String
    $password: String
    $confirmPassword: String
    $nick: String
    $profilePhoto: String
    $profileFile: Upload
    $phoneNumber: String
  ) {
    UpdateMyProfile(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      nick: $nick
      profilePhoto: $profilePhoto
      profileFile: $profileFile
      phoneNumber: $phoneNumber
    ) {
      success
      error
    }
  }
`;
