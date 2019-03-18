import { getConnection } from "typeorm";
import Place from "../../../entities/Place";
import Post from "../../../entities/Post";
import User from "../../../entities/User";
import cleanNullArgs from "../../../helpers/cleanNullArg";
import privateResolver from "../../../helpers/privateResolver";
import { EditPostMutationArgs, EditPostResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    EditPost: privateResolver(
      async (
        _,
        args: EditPostMutationArgs,
        { req }
      ): Promise<EditPostResponse> => {
        const user: User = req.user;
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const post = await Post.findOne(
            { id: args.id },
            {
              relations: ["author", "photos", "place"]
            }
          );
          if (!post) {
            return {
              success: false,
              error: "게시글을 찾을 수 없습니다.",
              post: null
            };
          }
          if (post.authorId === user.id) {
            const notNull: any = cleanNullArgs(args);
            await queryRunner.manager.update(Post, args.id, {
              content: args.content,
              wifi: args.wifi,
              childChair: args.childChair,
              study: args.study
            });
            if (notNull.lat || notNull.lng || notNull.address) {
              const place = await Place.findOne({ address: notNull.address });
              if (place) {
                await queryRunner.manager.update(Post, args.id, { place });
              } else {
                const place = await Place.create({
                  address: notNull.address,
                  lat: notNull.lat,
                  lng: notNull.lng,
                  posts: [post],
                  user
                });
                await queryRunner.manager.save(place);
              }
            }
            await queryRunner.commitTransaction();
            return {
              success: true,
              error: null,
              post
            };
          } else {
            return {
              success: false,
              error: "권한이 없습니다.",
              post: null
            };
          }
        } catch (error) {
          await queryRunner.rollbackTransaction();
          return {
            success: false,
            error: error.message,
            post: null
          };
        } finally {
          await queryRunner.release();
        }
      }
    )
  }
};

export default resolvers;
