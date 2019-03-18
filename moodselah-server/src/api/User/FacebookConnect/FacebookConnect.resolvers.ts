import User from "../../../entities/User";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../helpers/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          const token = createJWT(existingUser.id);
          return {
            success: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
          token: null
        };
      }
      try {
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();
        const token = createJWT(newUser.id);
        return {
          success: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
