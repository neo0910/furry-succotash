import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import User from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
