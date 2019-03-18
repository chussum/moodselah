import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Message, message => message.chat, { nullable: true })
  messages: Message[];

  @Column({ nullable: true })
  senderId: number;

  @ManyToOne(type => User, user => user.chatsAsSender)
  sender: User;

  @Column({ nullable: true })
  receiverId: number;

  @ManyToOne(type => User, user => user.chatsAsReceiver)
  receiver: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Chat;
