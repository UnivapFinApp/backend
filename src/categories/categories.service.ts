import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from './domain/category.repository';
import { CategoryEntity } from './domain/entities/category.entity';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { CreateCategoryDto } from './domain/category.dto';

@Injectable()
export class CategoriesService implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async category(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryEntity | null> {
    return this.prisma.category.findUnique({
      where: categoryWhereUniqueInput,
    });
  }

  categories(
    categoryWhereInput: Prisma.CategoryWhereInput,
  ): Promise<CategoryEntity[]> {
    return this.prisma.category.findMany({
      where: categoryWhereInput,
    });
  }

  createCategory(data: CreateCategoryDto): Promise<CategoryEntity> {
    const user = this.prisma.user.count({ where: { id: data.userId } });
    if (!user) throw new Error('User not found');

    const alreadyExists = this.prisma.category.count({
      where: { name: data.name },
    });

    if (!!alreadyExists) {
      throw new HttpException('Duplicated category name.', HttpStatus.CONFLICT);
    }

    return this.prisma.category.create({
      data: { ...data, userId: data.userId },
    });
  }
  updateCategory(
    categoryWhereInput: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput,
  ): Promise<CategoryEntity> {
    return this.prisma.category.update({
      where: categoryWhereInput,
      data,
    });
  }

  deleteCategory(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryEntity> {
    return this.prisma.category.update({
      data: {
        isActive: false,
      },
      where: categoryWhereUniqueInput,
    });
  }
}
