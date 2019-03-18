import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";
import Post from "./Post";
import Megazine from "./Megazine";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "double", default: 0 })
  lat: number;

  @Column({ type: "double", default: 0 })
  lng: number;

  @Column({ type: "text" })
  address: string;

  @Column({ default: false })
  isFav: boolean;

  @OneToMany(type => Post, post => post.place)
  posts: Post[];

  @OneToMany(type => Megazine, megazine => megazine.place)
  megazines: Megazine[];

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.places)
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Place;
