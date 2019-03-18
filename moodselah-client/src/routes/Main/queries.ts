import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
  query getPosts($skip: Int!) {
    GetPosts(skip: $skip, limit: 20, order: "{id: 'DESC'}", where: "") {
      success
      error
      hasNext
      posts {
        id
        title
        content
        wifi
        childChair
        study
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
