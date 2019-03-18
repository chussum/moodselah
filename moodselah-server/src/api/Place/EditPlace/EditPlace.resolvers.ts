import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../helpers/cleanNullArg";
import privateResolver from "../../../helpers/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              const notNull = cleanNullArgs(args);
              await Place.update({ id: args.placeId }, { ...notNull });
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
              error: "장소를 찾을 수 없습니다."
            };
          }
        } catch (error) {
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
