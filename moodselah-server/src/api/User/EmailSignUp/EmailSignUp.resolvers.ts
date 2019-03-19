import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../helpers/createJWT";
import { sendVerificationEmail } from "../../../helpers/sendEmail";
import cleanNullArg from "../../../helpers/cleanNullArg";

const generateError = message => ({
  success: false,
  error: message,
  token: null,
  user: null
});

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const notNull: any = cleanNullArg(args);
      const { email, nick, password, confirmPassword } = notNull;

      if (!email) {
        return generateError("이메일을 입력해주세요.");
      }
      if (!nick) {
        return generateError("닉네임을 입력해주세요.");
      }
      if (!password) {
        return generateError("비밀번호를 입력해주세요.");
      }
      if (password !== confirmPassword) {
        return generateError("비밀번호를 확인해주세요.");
      }

      try {
        const existingUserOfEmail = await User.findOne({ email });
        if (existingUserOfEmail) {
          return generateError("이미 존재하는 이메일입니다.");
        }
        const existingUserOfNick = await User.findOne({ nick });
        if (existingUserOfNick) {
          return generateError("이미 존재하는 닉네임입니다.");
        }
        const newUser = await User.create({
          email,
          nick,
          password,
          profilePhoto: notNull.profilePhoto || "",
          phoneNumber: notNull.phoneNumber || ""
        }).save();
        if (newUser.email) {
          const emailVerification = await Verification.create({
            payload: newUser.email,
            target: "EMAIL"
          }).save();
          await sendVerificationEmail(newUser.nick, emailVerification.key);
        }
        const token = createJWT(newUser.id);
        return {
          success: true,
          error: null,
          token,
          user: newUser
        };
      } catch (error) {
        return generateError(error.message);
      }
    }
  }
};

export default resolvers;
