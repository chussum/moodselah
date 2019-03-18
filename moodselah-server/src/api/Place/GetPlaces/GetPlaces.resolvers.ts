import Place from "../../../entities/Place";
import parseWhere from "../../../helpers/parseWhere";
import { GetMyPlacesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetPlaces: async (_, args, { req }): Promise<GetMyPlacesResponse> => {
      try {
        const where = parseWhere({
          where: args.where,
          lat_between: [+args.lat - 0.5, +args.lat + 0.5],
          lng_between: [+args.lng - 0.5, +args.lng + 0.5]
        });
        const places = await Place.find({
          relations: ["posts", "posts.photos"],
          where
        });
        if (places) {
          return {
            success: true,
            places,
            error: null
          };
        } else {
          return {
            success: false,
            places: null,
            error: "장소들을 찾을 수 없습니다."
          };
        }
      } catch (error) {
        return {
          success: false,
          error: error.message,
          places: null
        };
      }
    }
  }
};

export default resolvers;
