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
import Comment from "./Comment";
import Photo from "./Photo";
import Place from "./Place";
import User from "./User";

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ nullable: false, default: 0 })
  wifi: number; // 와이파이 0: 모름, 1: 있음, 2: 없음

  @Column({ nullable: false, default: 0 })
  childChair: number; // 아기의자 0: 모름, 1: 있음, 2: 없음

  @Column({ nullable: false, default: 0 })
  study: number; // 스터디하기에 0: 모름, 1: 적합, 2: 부적합

  @Column({ nullable: true })
  placeId: number;

  @ManyToOne(type => Place, place => place.posts)
  place: Place;

  @OneToMany(type => Photo, photo => photo.post)
  photos: Photo[];

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @Column({ type: "bigint", default: 0 })
  hit: number;

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

  get isLiked() {
    return false;
  }

  checkIsLiked(userId: number): Promise<boolean> {
    return User.createQueryBuilder("user")
      .leftJoinAndSelect("user.likePosts", "likePosts")
      .leftJoinAndSelect("likePosts.likes", "likeUsers")
      .where("likePosts.id = :postId and likeUsers.id = :userId", {
        postId: this.id,
        userId
      })
      .getOne()
      .then(res => !!res);
  }
}

export default Post;
