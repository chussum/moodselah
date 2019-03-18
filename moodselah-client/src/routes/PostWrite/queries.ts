import { gql } from 'apollo-boost';

export const ADD_POST = gql`
  mutation addPost(
    $content: String
    $files: [Upload!]!
    $wifi: Int!
    $childChair: Int!
    $study: Int!
    $address: String
    $lat: Float
    $lng: Float
  ) {
    AddPost(
      content: $content
      files: $files
      wifi: $wifi
      childChair: $childChair
      study: $study
      address: $address
      lat: $lat
      lng: $lng
    ) {
      success
      error
      post {
        id
        title
        content
        photos {
          id
          title
          content
          path
        }
        author {
          id
          nick
          profilePhoto
        }
        createdAt
        updatedAt
      }
    }
  }
`;
