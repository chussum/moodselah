import User from "../../../entities/User";
import { GetUserResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const generateError = message => ({
  success: false,
  error: message,
  user: null
});

const resolvers: Resolvers = {
  Query: {
    GetUser: async (_, { id }, { req }): Promise<GetUserResponse> => {
      try {
        const user = await User.findOne({ id });
        if (user) {
          return {
            success: true,
            error: null,
            user
          };
        } else {
          return generateError("사용자를 찾을 수 없습니다.");
        }
      } catch (error) {
        return generateError(error.message);
      }
    },
    GetUserByNick: async (_, { nick }, { req }): Promise<GetUserResponse> => {
      try {
        const user = await User.findOne({ nick });
        if (user) {
          return {
            success: true,
            error: null,
            user
          };
        } else {
          return generateError("사용자를 찾을 수 없습니다.");
        }
      } catch (error) {
        return generateError(error.message);
      }
    }
  }
};

export default resolvers;
