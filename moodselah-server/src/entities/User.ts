import dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { userRole } from "../types/types";
import Chat from "./Chat";
import Megazine from "./Megazine";
import Message from "./Message";
import Place from "./Place";
import Post from "./Post";

const BCRYPT_ROUNDS = 10;
const USER_ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
  DEVELOPER: "DEVELOPER"
};

const { UPLOAD_FILE_PATH } = process.env;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: [USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.DEVELOPER],
    default: USER_ROLE.USER
  })
  role: userRole;

  @Column({ type: "varchar", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ default: false })
  verifiedEmail: boolean;

  @Column({ type: "varchar", length: 24 })
  nick: string;

  @Column({ type: "varchar", nullable: true })
  password: string;

  @Column({ type: "varchar", nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "varchar", name: "profilePhoto" })
  _profilePhoto: string;

  @Column({ type: "varchar", nullable: true })
  fbId: string;

  @OneToMany(type => Chat, chat => chat.receiver)
  chatsAsReceiver: Chat[];

  @OneToMany(type => Chat, chat => chat.sender)
  chatsAsSender: Chat[];

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @Column({ type: "bigint", default: 0 })
  followingCount: number;

  @ManyToMany(type => User, user => user.follower)
  @JoinTable()
  following: User[];

  @Column({ type: "bigint", default: 0 })
  followerCount: number;

  @ManyToMany(type => User, user => user.following)
  follower: User[];

  @OneToMany(type => Place, place => place.user)
  places: Place[];

  @OneToMany(type => Post, post => post.author)
  posts: Post[];

  @OneToMany(type => Megazine, megazine => megazine.author)
  megazines: Megazine[];

  @ManyToMany(type => Post, post => post.likes)
  likePosts: Post[];

  @ManyToMany(type => Megazine, megazine => megazine.likes)
  likeMegazines: Megazine[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  get profilePhoto() {
    return `${this._profilePhoto}`.replace(
      UPLOAD_FILE_PATH as string,
      "/images"
    );
  }

  set profilePhoto(path: string) {
    this._profilePhoto = path;
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  @BeforeUpdate()
  async updateFollowerCount(): Promise<void> {
    if (this.follower && this.follower.length) {
      this.followerCount = this.follower.length;
    }
  }

  @BeforeUpdate()
  async updateFollowingCount(): Promise<void> {
    if (this.following && this.following.length) {
      this.followingCount = this.following.length;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
