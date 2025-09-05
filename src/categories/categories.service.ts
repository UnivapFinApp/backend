import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './domain/category.dto';
import { CategoryRepository } from './domain/category.repository';
import { CategoryEntity } from './domain/entities/category.entity';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CategoriesService implements CategoryRepository {
  constructor(private prisma: PrismaService) { }

  async category(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput
  ): Promise<CategoryEntity | null> {
    return this.prisma.category.findUnique({
      where: categoryWhereUniqueInput,
    });
  }

  categories(
    categoryWhereInput: Prisma.CategoryWhereInput
  ): Promise<CategoryEntity[]> {
    return this.prisma.category.findMany({
      where: categoryWhereInput
    });
  }

  createCategory(
    data: Prisma.CategoryCreateInput
  ): Promise<CategoryEntity> {
    return this.prisma.category.create({ data });
  }
  updateCategory(
    categoryWhereInput: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput
  ): Promise<CategoryEntity> {
    return this.prisma.category.update({
      where: categoryWhereInput,
      data
    });
  }

  deleteCategory(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput
  ): Promise<CategoryEntity> {
    return this.prisma.category.update({
      data: {
        isActive: false
      }, where: categoryWhereUniqueInput
    })
  }

}
