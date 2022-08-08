import { Expose } from 'class-transformer';
import Post from '../posts/post.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  @Expose()
  public id: number;

  @Column()
  @Expose()
  public name: string;

  @Expose()
  @ManyToMany(() => Post, (post: Post) => post.categories)
  public posts: Post[];
}

export default Category;
