import dotenv from "dotenv";
dotenv.config({ path: '../../.env' });

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Megazine from "./Megazine";
import Post from "./Post";
import User from "./User";

const { UPLOAD_FILE_PATH } = process.env;

@Entity()
class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "text" })
  title: string;

  @Column({ nullable: true, type: "text" })
  content: string;

  @Column({ type: "text", name: "path" })
  _path: string;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(type => Post, post => post.photos, {
    cascade: true,
    onDelete: "CASCADE"
  })
  post: Post;

  @Column({ nullable: true })
  megazineId: number;

  @ManyToOne(type => Megazine, megazine => megazine.photos, {
    cascade: true,
    onDelete: "CASCADE"
  })
  megazine: Megazine;

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(type => User, user => user.posts)
  author: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  get path() {
    return `${this._path}`.replace(UPLOAD_FILE_PATH as string, "/images");
  }

  set path(path: string) {
    this._path = path;
  }
}

export default Photo;
