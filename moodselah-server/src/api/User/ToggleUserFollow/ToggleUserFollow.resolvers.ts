import User from "../../../entities/User";
import { ToggleUserFollowResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../helpers/privateResolver";
import findIndex from "lodash/findIndex";

const resolvers: Resolvers = {
  Mutation: {
    ToggleUserFollow: privateResolver(
      async (_, { userId }, { req }): Promise<ToggleUserFollowResponse> => {
        const user: User = req.user;
        try {
          const targetUser = await User.findOne({ id: userId });
          const currentUser = await User.findOne(
            { id: user.id },
            {
              relations: ["following"]
            }
          );
          if (currentUser && targetUser) {
            const isFollowingUserIdx = findIndex(
              currentUser.following,
              user => user.id === userId
            );
            let isFollowed = false;
            if (isFollowingUserIdx !== -1) {
              currentUser.following.splice(isFollowingUserIdx, 1);
              targetUser.followerCount = Number(targetUser.followerCount) - 1;
            } else {
              currentUser.following.push(targetUser);
              targetUser.followerCount = Number(targetUser.followerCount) + 1;
              isFollowed = true;
            }
            currentUser.followingCount = currentUser.following.length;
            currentUser.save();
            targetUser.save();
            return {
              success: true,
              error: null,
              isFollowed
            };
          } else {
            return {
              success: false,
              error: "사용자를 찾을 수 없습니다.",
              isFollowed: null
            };
          }
        } catch (error) {
          return {
            success: false,
            error: error.message,
            isFollowed: null
          };
        }
      }
    )
  }
};

export default resolvers;
