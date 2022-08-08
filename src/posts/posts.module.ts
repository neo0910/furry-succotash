import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  exports: [PostsService],
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService],
})
export class PostsModule {}
