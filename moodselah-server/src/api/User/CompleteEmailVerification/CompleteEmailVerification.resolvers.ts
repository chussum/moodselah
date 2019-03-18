import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../helpers/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const user: User = req.user;
        const { key } = args;
        if (user.email) {
          try {
            const verification = await Verification.findOne({
              key,
              payload: user.email
            });
            if (verification) {
              user.verifiedEmail = true;
              user.save();
              return {
                success: true,
                error: null
              };
            } else {
              return {
                success: false,
                error: "유효하지 않은 키"
              };
            }
          } catch (error) {
            return {
              success: false,
              error: error.message
            };
          }
        } else {
          return {
            success: false,
            error: "존재하지 않는 이메일입니다."
          };
        }
      }
    )
  }
};

export default resolvers;
