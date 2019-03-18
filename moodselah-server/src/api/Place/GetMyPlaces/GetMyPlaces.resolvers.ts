import Place from "../../../entities/Place";
import privateResolver from "../../../helpers/privateResolver";
import { GetMyPlacesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async (_, args, { req }): Promise<GetMyPlacesResponse> => {
        try {
          const places = await Place.createQueryBuilder("place")
            .leftJoinAndSelect("place.user", "user")
            .where("user.id = :userId", { userId: req.user.id })
            .skip(args.skip)
            .take(args.limit)
            .getMany();
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
    )
  }
};

export default resolvers;
