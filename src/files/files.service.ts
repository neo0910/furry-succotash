import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageService } from '../storage/storage.service';
import PublicFile from './publicFile.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private readonly publicFilesRepository: Repository<PublicFile>,
    private readonly storageService: StorageService,
  ) {}

  async savePublicFile(
    dir: string,
    file: Express.Multer.File,
  ): Promise<PublicFile> {
    const data = await this.storageService.upload(dir, file);
    const newFile = this.publicFilesRepository.create(data);

    return this.publicFilesRepository.save(newFile);
  }

  async deletePublicFile(fileId: number): Promise<void> {
    const file = await this.publicFilesRepository.findOneBy({ id: fileId });
    await this.storageService.delete(file.key);
    await this.publicFilesRepository.delete(fileId);
  }
}
