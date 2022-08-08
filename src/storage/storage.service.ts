import { Inject, Injectable } from '@nestjs/common';
import { Bucket } from '@google-cloud/storage';
import { STORAGE_BUCKET } from '../providers/storage.provider';

@Injectable()
export class StorageService {
  constructor(@Inject(STORAGE_BUCKET) private readonly bucket: Bucket) {}

  async upload(
    dir: string,
    file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const preparedFile = this.bucket.file(`${dir}/${fileName}`);

    await preparedFile.save(file.buffer);
    await preparedFile.makePublic();

    return { url: preparedFile.publicUrl(), key: fileName };
  }

  async delete(fileName: string): Promise<void> {
    await this.bucket.file(fileName).delete();
  }
}
