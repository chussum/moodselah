import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../helpers/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(
      async (
        _,
        args: AddPlaceMutationArgs,
        { req }
      ): Promise<AddPlaceResponse> => {
        const user: User = req.user;
        try {
          await Place.create({ ...args, user }).save();
          return {
            success: true,
            error: null
          };
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
