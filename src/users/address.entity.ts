import { Expose } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  @Expose()
  public id: number;

  @Column()
  @Expose()
  public street: string;

  @Column()
  @Expose()
  public city: string;

  @Column()
  @Expose()
  public country: string;

  @OneToOne(() => User, (user: User) => user.address)
  @Expose()
  public user?: User;
}

export default Address;
