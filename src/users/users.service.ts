import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import PublicFile from '../files/publicFile.entity';
import { CreateUserDto } from './dto/createUser.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private filesService: FilesService,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async addAvatar(
    userId: number,
    file: Express.Multer.File,
  ): Promise<PublicFile> {
    const avatar = await this.filesService.savePublicFile('avatars', file);
    const user = await this.getById(userId);
    await this.usersRepository.update(userId, { ...user, avatar });

    return avatar;
  }

  async deleteAvatar(userId: number): Promise<void> {
    const user = await this.getById(userId);
    const fileId = user.avatar?.id;

    if (fileId) {
      await this.usersRepository.update(userId, { ...user, avatar: null });
      await this.filesService.deletePublicFile(fileId);
    }
  }
}
