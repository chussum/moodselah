import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../helpers/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne(
            {
              id: args.chatId
            },
            { relations: ["messages"] }
          );
          if (chat) {
            if (chat.receiverId === user.id || chat.senderId === user.id) {
              return {
                success: true,
                error: null,
                chat
              };
            } else {
              return {
                success: false,
                error: "이 채팅을 볼 수있는 권한이 없습니다.",
                chat: null
              };
            }
          } else {
            return {
              success: false,
              error: "채팅을 찾을 수 없습니다.",
              chat: null
            };
          }
        } catch (error) {
          return {
            success: false,
            error: error.message,
            chat: null
          };
        }
      }
    )
  }
};

export default resolvers;
