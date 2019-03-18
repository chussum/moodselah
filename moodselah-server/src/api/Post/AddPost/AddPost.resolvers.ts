import { getConnection } from "typeorm";
import Photo from "../../../entities/Photo";
import Place from "../../../entities/Place";
import Post from "../../../entities/Post";
import User from "../../../entities/User";
import privateResolver from "../../../helpers/privateResolver";
import processUpload, { passingUpload } from "../../../helpers/processUpload";
import { AddPostMutationArgs, AddPostResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const generateError = message => ({
  success: false,
  error: message,
  post: null
});

const resolvers: Resolvers = {
  Mutation: {
    AddPost: privateResolver(
      async (
        _,
        args: AddPostMutationArgs,
        { req }
      ): Promise<AddPostResponse> => {
        const user: User = req.user;
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          if (!args.files || !args.files.length) {
            return generateError("사진을 선택해주세요.");
          }
          if (!args.content) {
            await Promise.all(args.files.map(passingUpload));
            return generateError("내용을 입력해주세요.");
          }
          const post: Post = await Post.create({
            title: "",
            content: args.content,
            wifi: args.wifi,
            childChair: args.childChair,
            study: args.study,
            author: user
          });
          const files = await Promise.all(
            args.files.map(file => processUpload(file, `post/${user.id}`))
          );
          const filePromises: Photo[] = files.map(file =>
            Photo.create({
              _path: file.path
            })
          );
          const { address, lat, lng } = args;
          if (address && lat && lng) {
            const place = await Place.findOne({ address });
            if (place) {
              post.place = place;
            } else {
              const newPlace = await Place.create({
                address,
                lat,
                lng,
                user
              });
              post.place = newPlace;
              await queryRunner.manager.save(newPlace);
            }
          }
          const photos: Photo[] = await Promise.all(filePromises);
          post.photos = photos;
          await queryRunner.manager.save(photos);
          await queryRunner.manager.save(post);
          await queryRunner.commitTransaction();
          return {
            success: true,
            error: null,
            post
          };
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
