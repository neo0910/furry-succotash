import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PublicFile {
  @Expose()
  @PrimaryGeneratedColumn()
  public id: number;

  @Expose()
  @Column()
  public url: string;

  @Expose()
  @Column()
  public key: string;
}

export default PublicFile;
