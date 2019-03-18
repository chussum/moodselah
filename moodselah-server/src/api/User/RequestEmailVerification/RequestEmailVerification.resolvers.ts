import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { RequestEmailVerificationResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../helpers/privateResolver";
import { sendVerificationEmail } from "../../../helpers/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
        const user: User = req.user;
        if (user.email && !user.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({
              payload: user.email
            });
            if (oldVerification) {
              oldVerification.remove();
            }
            const newVerification = await Verification.create({
              payload: user.email,
              target: "EMAIL"
            }).save();
            await sendVerificationEmail(user.nick, newVerification.key);
            return {
              success: true,
              error: null
            };
          } catch (error) {
            return {
              success: false,
              error: error.message
            };
          }
        } else {
          return {
            success: false,
            error: "사용자가 인증할 이메일이 없습니다."
          };
        }
      }
    )
  }
};

export default resolvers;
