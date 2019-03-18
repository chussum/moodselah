import User from "../../../entities/User";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../helpers/createJWT";

const generateError = message => ({
  success: false,
  error: message,
  token: null,
  user: null
});

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      if (!email) {
        return generateError("이메일을 입력해주세요.");
      }
      if (!password) {
        return generateError("비밀번호를 입력해주세요.");
      }

      try {
        const user = await User.findOne({ email });
        if (!user) {
          return generateError("사용자를 찾을 수 없습니다.");
        }
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          const token = createJWT(user.id);
          return {
            success: true,
            error: null,
            token,
            user
          };
        } else {
          return generateError("비밀번호를 확인해주세요.");
        }
      } catch (error) {
        return generateError(error.message);
      }
    }
  }
};
export default resolvers;
