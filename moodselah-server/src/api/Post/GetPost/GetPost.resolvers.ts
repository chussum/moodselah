import Post from "../../../entities/Post";
import { GetPostResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetPost: async (_, { id }, { req }): Promise<GetPostResponse> => {
      try {
        const post = await Post.findOne(
          { id },
          {
            relations: [
              "author",
              "photos",
              "place",
              "place.posts",
              "place.posts.photos"
            ]
          }
        );
        if (post) {
          const isLiked = req.user ? post.checkIsLiked(req.user.id) : false;
          return {
            success: true,
            error: null,
            post: Object.assign({}, post, {
              isLiked
            })
          };
        } else {
          return {
            success: false,
            error: "게시글을 찾을 수 없습니다.",
            post: null
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
          post: null
        };
      }
    }
  }
};
export default resolvers;
