import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query getUser($nick: String!, $skip: Int!, $where: String!) {
    GetUserByNick(nick: $nick) {
      success
      error
      user {
        id
        email
        nick
        profilePhoto
        followingCount
        followerCount
      }
    }
    GetPosts(skip: $skip, limit: 20, order: "{id: 'DESC'}", where: $where) {
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
