import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getAllCategories() {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (category) {
      return category;
    }
    throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  async updateCategory(id: number, category: any) {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }
}
