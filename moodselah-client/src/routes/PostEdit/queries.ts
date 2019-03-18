import { gql } from 'apollo-boost';

export const EDIT_POST = gql`
  mutation editPost(
    $id: Int!
    $content: String!
    $wifi: Int!
    $childChair: Int!
    $study: Int!
    $address: String
    $lat: Float
    $lng: Float
  ) {
    EditPost(
      id: $id
      content: $content
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
      }
    }
  }
`;
