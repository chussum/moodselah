import { getConnection } from "typeorm";
import Post from "../../../entities/Post";
import User from "../../../entities/User";
import privateResolver from "../../../helpers/privateResolver";
import {
  DeletePostMutationArgs,
  DeletePostResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    DeletePost: privateResolver(
      async (
        _,
        args: DeletePostMutationArgs,
        { req }
      ): Promise<DeletePostResponse> => {
        const user: User = req.user;
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const post = await Post.findOne(
            { id: args.id },
            {
              relations: ["place", "place.posts"]
            }
          );
          if (post) {
            if (post.authorId === user.id) {
              await queryRunner.manager.remove(post);
              if (post.place && post.place.posts.length === 1) {
                await queryRunner.manager.remove(post.place);
              }
              await queryRunner.commitTransaction();
              // await queryRunner.rollbackTransaction();
              return {
                success: true,
                error: null
              };
            } else {
              return {
                success: false,
                error: "권한이 없습니다."
              };
            }
          } else {
            return {
              success: false,
              error: "게시글을 찾을 수 없습니다."
            };
          }
        } catch (error) {
          await queryRunner.rollbackTransaction();
          return {
            success: false,
            error: error.message
          };
        } finally {
          await queryRunner.release();
        }
      }
    )
  }
};

export default resolvers;
