import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './domain/category.dto';
import { CategoryEntity } from './domain/entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.service.createCategory(
      createCategoryDto
    );
  }

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.service.categories({ isActive: true });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<CategoryEntity | null> {
    return await this.service.category({ id },);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.service.updateCategory({
      id
    }, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.deleteCategory({ id })
  }
}
