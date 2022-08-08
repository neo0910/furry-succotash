import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bucket, Storage } from '@google-cloud/storage';

export const STORAGE_BUCKET = 'STORAGE_BUCKET';

export const storageProvider: Provider<Bucket> = {
  provide: STORAGE_BUCKET,
  useFactory: (configService: ConfigService) => {
    const keyFilename = configService.get('GOOGLE_STORAGE_KEY_FILENAME');
    const bucketName = configService.get('GOOGLE_STORAGE_BUCKET');
    const projectId = configService.get('GOOGLE_STORAGE_PROJECT_ID');
    const storage = new Storage({ keyFilename, projectId });

    return storage.bucket(bucketName);
  },
  inject: [ConfigService],
};
