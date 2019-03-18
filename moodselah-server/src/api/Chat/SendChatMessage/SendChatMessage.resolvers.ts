import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../helpers/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: privateResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (chat) {
            if (chat.senderId === user.id || chat.receiverId === user.id) {
              const message = await Message.create({
                text: args.text,
                chat,
                user
              }).save();
              pubSub.publish("newChatMessage", {
                MessageSubscription: message
              });
              return {
                success: true,
                error: null,
                message
              };
            } else {
              return {
                success: false,
                error: "올바르지 않은 접근입니다.",
                message: null
              };
            }
          } else {
            return {
              success: false,
              error: "채팅을 찾을 수 없습니다.",
              message: null
            };
          }
        } catch (error) {
          return {
            success: false,
            error: error.message,
            message: null
          };
        }
      }
    )
  }
};

export default resolvers;
