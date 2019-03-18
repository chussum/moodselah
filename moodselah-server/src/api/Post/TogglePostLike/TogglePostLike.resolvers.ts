import Post from "../../../entities/Post";
import User from "../../../entities/User";
import { TogglePostLikeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../helpers/privateResolver";
import findIndex from "lodash/findIndex";

const resolvers: Resolvers = {
  Mutation: {
    TogglePostLike: privateResolver(
      async (_, { id }, { req }): Promise<TogglePostLikeResponse> => {
        const user: User = req.user;
        try {
          const post = await Post.findOne(
            { id },
            {
              relations: ["likes"]
            }
          );
          if (post) {
            const isLikedUserIdx = findIndex(
              post.likes,
              likeUser => likeUser.id === user.id
            );
            let isLiked = false;
            if (isLikedUserIdx !== -1) {
              post.likes.splice(isLikedUserIdx, 1);
            } else {
              post.likes.push(user);
              isLiked = true;
            }
            post.likeCount = post.likes.length;
            post.save();
            return {
              success: true,
              error: null,
              isLiked
            };
          } else {
            return {
              success: false,
              error: "게시글을 찾을 수 없습니다.",
              isLiked: null
            };
          }
        } catch (error) {
          return {
            success: false,
            error: error.message,
            isLiked: null
          };
        }
      }
    )
  }
};

export default resolvers;
