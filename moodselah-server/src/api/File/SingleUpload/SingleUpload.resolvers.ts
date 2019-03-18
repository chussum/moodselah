import processUpload from "../../../helpers/processUpload";
import privateResolver from "../../../helpers/privateResolver";
import { Resolvers } from "../../../types/resolvers";
import {
  SingleUploadMutationArgs,
  SingleUploadResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    SingleUpload: privateResolver(
      async (
        _,
        args: SingleUploadMutationArgs,
        { req }
      ): Promise<SingleUploadResponse> => {
        try {
          const file = await processUpload(args.file);
          return {
            success: true,
            error: null,
            file
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            file: null
          };
        }
      }
    )
  }
};

export default resolvers;
