import User from "../../../entities/User";
import cleanNullArgs from "../../../helpers/cleanNullArg";
import privateResolver from "../../../helpers/privateResolver";
import processUpload, { passingUpload } from "../../../helpers/processUpload";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const generateError = message => ({
  success: false,
  error: message,
  user: null
});

const passingProfileUploadedFile = file => {
  if (file) {
    return passingUpload(file);
  }
  return null;
};

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        if (notNull.email) {
          const existingUserOfEmail = await User.findOne({
            email: notNull.email
          });
          if (existingUserOfEmail && existingUserOfEmail.id !== user.id) {
            await passingProfileUploadedFile(notNull.profileFile);
            return generateError("이미 존재하는 이메일입니다.");
          }
        }
        if (notNull.nick) {
          const existingUserOfNick = await User.findOne({ nick: notNull.nick });
          if (existingUserOfNick && existingUserOfNick.id !== user.id) {
            await passingProfileUploadedFile(notNull.profileFile);
            return generateError("이미 존재하는 닉네임입니다.");
          }
        }
        if (notNull.password) {
          if (notNull.password !== notNull.confirmPassword) {
            await passingProfileUploadedFile(notNull.profileFile);
            return generateError("비밀번호를 확인해주세요.");
          } else {
            user.password = notNull.password;
            user.save();
            delete notNull.password;
            delete notNull.confirmPassword;
          }
        }
        if (notNull.profileFile) {
          const file = await processUpload(
            notNull.profileFile,
            `avatar/${user.id}`
          );
          notNull._profilePhoto = file.path;
          delete notNull.profileFile;
        }
        try {
          await User.update({ id: user.id }, { ...notNull });
          return {
            success: true,
            error: null
          };
        } catch (error) {
          await passingProfileUploadedFile(args.profileFile);
          return {
            success: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
