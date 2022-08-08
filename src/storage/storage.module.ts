import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { storageProvider } from '../providers/storage.provider';
import { StorageService } from './storage.service';

@Module({
  exports: [StorageService],
  imports: [ConfigModule],
  providers: [StorageService, storageProvider],
})
export class StorageModule {}
