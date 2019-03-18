import { gql } from 'apollo-boost';

export const GET_POST = gql`
  query getPost($id: Int!) {
    GetPost(id: $id) {
      success
      error
      post {
        id
        content
        wifi
        childChair
        study
        photos {
          id
          path
        }
        place {
          address
          lat
          lng
          posts {
            id
            photos {
              id
              path
            }
          }
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
