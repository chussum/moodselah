import { gql } from 'apollo-boost';

export const DELETE_POST = gql`
  mutation deletePost($id: Int!) {
    DeletePost(id: $id) {
      success
      error
    }
  }
`;
