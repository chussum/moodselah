import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../helpers/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });
        if (!verification) {
          return {
            success: false,
            error: "'Verification key'가 존재하지 않습니다.",
            token: null
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
          token: null
        };
      }

      try {
        const user = await User.findOne({ phoneNumber });
        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();
          const token = createJWT(user.id);
          return {
            success: true,
            error: null,
            token
          };
        } else {
          return {
            success: true,
            error: null,
            token: null
          };
        }
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
