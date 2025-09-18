import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './domain/category.dto';
import { CategoryEntity } from './domain/entities/category.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("JWT")
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly service: CategoriesService,
  ) { }

  @Post()
  async create(
      @Body() createCategoryDto: CreateCategoryDto,
      @Req() req: any
    ): Promise<CategoryEntity> {
      const userId = req.user?.id;
      return await this.service.createCategory(
        { ...createCategoryDto, userId: userId }
      );
  }

  @Get()
  async findAll(
    @Request() request
  ): Promise<CategoryEntity[]> {
    return await this.service.categories({ isActive: true, userId: request.user.id });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() request
  ): Promise<CategoryEntity | null> {
    return await this.service.category({ id, userId: request.user.id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() request
  ): Promise<CategoryEntity> {
    return await this.service.updateCategory({
      id, userId: request.user.id
    }, updateCategoryDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() request
  ) {
    return this.service.deleteCategory({ id, userId: request.user.id });
  }
}
