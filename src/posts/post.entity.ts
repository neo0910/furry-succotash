import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from '../categories/category.entity';
import User from '../users/user.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  @Expose()
  public id: number;

  @Column()
  @Expose()
  public title: string;

  @Column()
  @Expose()
  public content: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  @Expose()
  public author: User;

  @Expose()
  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];
}

export default Post;
