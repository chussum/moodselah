import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Megazine from "./Megazine";
import Post from "./Post";
import User from "./User";

@Entity()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  content: string;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(type => Post, post => post.comments, {
    cascade: true,
    onDelete: "CASCADE"
  })
  post: Post;

  @Column({ nullable: true })
  megazineId: number;

  @ManyToOne(type => Megazine, megazine => megazine.comments, {
    cascade: true,
    onDelete: "CASCADE"
  })
  megazine: Megazine;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(type => Comment, comment => comment.childs)
  parent: Comment;

  @OneToMany(type => Comment, comment => comment.parent)
  childs: Comment[];

  @Column({ type: "bigint", default: 0 })
  likeCount: number;

  @ManyToMany(type => User, user => user.likePosts)
  @JoinTable()
  likes: User[];

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(type => User, user => user.posts)
  author: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Comment;
