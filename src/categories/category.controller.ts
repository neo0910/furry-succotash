import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  SerializeOptions,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('posts')
@SerializeOptions({ strategy: 'excludeAll' })
export class PostsController {
  constructor(private readonly postsService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.postsService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.postsService.getCategoryById(Number(id));
  }

  @Put(':id')
  async replaceCategory(@Param('id') id: string, @Body() category: any) {
    return this.postsService.updateCategory(Number(id), category);
  }
}
