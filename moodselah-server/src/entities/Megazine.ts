import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";
import Place from "./Place";
import Photo from "./Photo";
import Comment from "./Comment";

@Entity()
class Megazine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ nullable: true })
  placeId: number;

  @ManyToOne(type => Place, place => place.megazines)
  place: Place;

  @OneToMany(type => Photo, photo => photo.post)
  photos: Photo[];

  @OneToMany(type => Comment, comment => comment.megazine)
  comments: Comment[];

  @Column({ type: "bigint", default: 0 })
  hit: number;

  @Column({ type: "bigint", default: 0 })
  likeCount: number;

  @ManyToMany(type => User, user => user.likeMegazines)
  @JoinTable()
  likes: User[];

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(type => User, user => user.megazines)
  author: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Megazine;
