import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './domain/transaction.dto';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { TransactionRepository } from './domain/transactions.repository';
import { TransactionEntity } from './domain/entities/transaction.entity';
import { Prisma } from 'generated/prisma';
import { UpdateCategoryDto } from 'src/categories/domain/category.dto';

@Injectable()
export class TransactionsService implements TransactionRepository {
  constructor(
    private readonly service: PrismaService
  ) { }

  async createTransaction(
    userId: string,
    data: CreateTransactionDto
  ): Promise<TransactionEntity> {
    const category = await this.service.category.count({ where: { id: data.categoryId, isActive: true } });
    if(category === 0) {
      throw new NotFoundException('Category ID points to a non-existing category.');
    }

    return await this.service.transaction.create({ data: {...data, userId} });
  }

  async transactions(transactionWhereInput: Prisma.TransactionWhereInput): Promise<TransactionEntity[]> {
    return await this.service.transaction.findMany({ where: transactionWhereInput });
  }

  async transaction(transactionWhereInput: Prisma.TransactionWhereInput): Promise<TransactionEntity | null> {
    return await this.service.transaction.findFirst({ where: transactionWhereInput });
  }

  async updateTransaction(transactionWhereInput: Prisma.TransactionWhereUniqueInput, data: UpdateCategoryDto) {
    return await this.service.transaction.update({ where: transactionWhereInput, data })
  }

  async removeTransaction(transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput): Promise<TransactionEntity> {
    return await this.service.transaction.update({ data: { isActive: false }, where: transactionWhereUniqueInput })
  }
}
