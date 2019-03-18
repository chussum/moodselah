import { GetFollowerResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetFollower: async (_, args, { req }): Promise<GetFollowerResponse> => {
      try {
        const users = await User.createQueryBuilder("user")
          .leftJoinAndSelect("user.following", "followUsers")
          .where("followUsers.id = :userId", { userId: args.userId })
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
