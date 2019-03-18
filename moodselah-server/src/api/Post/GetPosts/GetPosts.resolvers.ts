import JSON5 from "json5";
import Post from "../../../entities/Post";
import parseWhere from "../../../helpers/parseWhere";
import { GetPostsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetPosts: async (_, args, { req }): Promise<GetPostsResponse> => {
      try {
        const order = JSON5.parse(args.order || "{}");
        const where = parseWhere(args.where);
        const take = args.limit || 40;
        // const posts = await Post.find({
        //   relations: ["author", "photos"],
        //   where,
        //   order,
        //   skip: args.skip,
        //   take
        // });
        let posts: any = Post.createQueryBuilder("post")
          .leftJoinAndSelect("post.author", "author")
          .leftJoinAndSelect("post.photos", "photos");
        if (where) {
          Object.keys(where).forEach(key => {
            const bind = key.replace(".", "_");
            posts = posts.where(`${key} = :${bind}`, {
              [bind]: where[key]
            });
          });
        }
        if (order) {
          Object.keys(order).forEach(key => {
            posts = posts.orderBy(`post.${key}`, order[key]);
          });
        }
        posts = posts.skip(args.skip).take(args.limit);
        posts = await posts.getMany();
        if (posts) {
          return {
            success: true,
            error: null,
            posts: posts.map(post => {
              const isLiked = req.user ? post.checkIsLiked(req.user.id) : false;
              return Object.assign({}, post, { isLiked });
            }),
            hasNext: take <= posts.length ? true : false
          };
        } else {
          return {
            success: false,
            error: "게시글들을 찾을 수 없습니다.",
            posts: null,
            hasNext: false
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
          posts: null,
          hasNext: false
        };
      }
    }
  }
};
export default resolvers;
