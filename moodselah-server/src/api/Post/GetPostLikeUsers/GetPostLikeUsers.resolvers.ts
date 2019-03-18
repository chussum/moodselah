import { GetPostLikeUsersResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetPostLikeUsers: async (
      _,
      args,
      { req }
    ): Promise<GetPostLikeUsersResponse> => {
      try {
        const users = await User.createQueryBuilder("user")
          .leftJoinAndSelect("user.likePosts", "likePosts")
          .where("likePosts.id = :postId", { postId: args.id })
          .skip(args.skip)
          .take(args.limit || 40)
          .getMany();
        if (users) {
          return {
            success: true,
            error: null,
            users
          };
        } else {
          return {
            success: false,
            error: "사용자를 찾을 수 없습니다.",
            users: null
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
          users: null
        };
      }
    }
  }
};
export default resolvers;
