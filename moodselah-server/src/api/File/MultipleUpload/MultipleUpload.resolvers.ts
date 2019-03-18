import privateResolver from "../../../helpers/privateResolver";
import processUpload from "../../../helpers/processUpload";
import {
  MultipleUploadMutationArgs,
  MultipleUploadResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    MultipleUpload: privateResolver(
      async (
        _,
        args: MultipleUploadMutationArgs,
        { req }
      ): Promise<MultipleUploadResponse> => {
        try {
          const files = await Promise.all(
            args.files.map(file => processUpload(file))
          );
          return {
            success: true,
            error: null,
            files
          };
        } catch (error) {
          return {
            success: false,
            error: error.message,
            files: null
          };
        }
      }
    )
  }
};

export default resolvers;
