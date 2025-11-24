import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './domain/transaction.dto';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { TransactionRepository } from './domain/transactions.repository';
import { TransactionEntity } from './domain/entities/transaction.entity';
import { Prisma } from 'generated/prisma';
import { UpdateCategoryDto } from 'src/categories/domain/category.dto';

@Injectable()
export class TransactionsService implements TransactionRepository {
  constructor(private readonly service: PrismaService) {}

  async getBalance(
    transactionWhereInput: Prisma.TransactionWhereInput,
  ): Promise<{
    sum: Prisma.Decimal | 0;
    income: Prisma.Decimal | 0;
    expense: Prisma.Decimal | 0;
    assets: any;
  }> {
    const groupedAggregation = await this.service.transaction.groupBy({
      by: ['type'],
      where: transactionWhereInput,
      _sum: {
        amount: true,
      },
    });

    const groupedCategoryAggregation = await this.service.transaction.groupBy({
      by: ['categoryId'],
      where: transactionWhereInput,
      _sum: {
        amount: true,
      },
    });

    const categoryIds = groupedCategoryAggregation.map(
      (item) => item.categoryId,
    );

    const categories = await this.service.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const categoryMap = new Map(
      categories.map((category) => [category.id, category.name]),
    );

    const finalResult = groupedCategoryAggregation.map((item) => {
      return {
        cat: categoryMap.get(item.categoryId) || 'Unknown Category',
        sum: item._sum.amount,
      };
    });

    const income = groupedAggregation.find((group) => group.type === 'INCOME');
    const expense = groupedAggregation.find(
      (group) => group.type === 'EXPENSE',
    );

    const incomeSum = income?._sum.amount ?? 0;
    const expenseSum = expense?._sum.amount ?? 0;
    const sum = Prisma.Decimal.sub(incomeSum, expenseSum);

    return {
      sum: sum,
      income: incomeSum,
      expense: expenseSum,
      assets: finalResult,
    };
  }

  async createTransaction(
    userId: string,
    data: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const category = await this.service.category.count({
      where: { id: data.categoryId, isActive: true },
    });
    if (category === 0) {
      throw new NotFoundException(
        'Category ID points to a non-existing category.',
      );
    }

    return await this.service.transaction.create({ data: { ...data, userId } });
  }

  async transactions(
    transactionWhereInput: Prisma.TransactionWhereInput,
    cursorId?: string,
    take: number = 20,
  ): Promise<TransactionEntity[]> {
    const cursorObj = cursorId
      ? {
          id: cursorId,
        }
      : undefined;

    return await this.service.transaction.findMany({
      where: transactionWhereInput,
      take: take,
      skip: cursorObj ? 1 : 0,
      cursor: cursorObj,
      orderBy: {
        date: 'desc',
      },
    });
  }

  async transaction(
    transactionWhereInput: Prisma.TransactionWhereInput,
  ): Promise<TransactionEntity | null> {
    return await this.service.transaction.findFirst({
      where: transactionWhereInput,
    });
  }

  async updateTransaction(
    transactionWhereInput: Prisma.TransactionWhereUniqueInput,
    data: UpdateCategoryDto,
  ) {
    return await this.service.transaction.update({
      where: transactionWhereInput,
      data,
    });
  }

  async removeTransaction(
    transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput,
  ): Promise<TransactionEntity> {
    return await this.service.transaction.update({
      data: { isActive: false },
      where: transactionWhereUniqueInput,
    });
  }
}
