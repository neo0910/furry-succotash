import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../storage/storage.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import PublicFile from './publicFile.entity';

@Module({
  controllers: [FilesController],
  exports: [FilesService],
  providers: [FilesService],
  imports: [
    TypeOrmModule.forFeature([PublicFile]),
    ConfigModule,
    StorageModule,
  ],
})
export class FilesModule {}
