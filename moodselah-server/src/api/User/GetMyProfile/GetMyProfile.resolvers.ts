import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../helpers/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_, __, { req }) => {
      const { user } = req;
      return {
        success: true,
        error: null,
        user
      };
    })
  }
};
export default resolvers;
