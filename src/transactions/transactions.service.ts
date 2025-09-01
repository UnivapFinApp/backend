import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './domain/transaction.dto';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { TransactionRepository } from './domain/transactions.repository';
import { TransactionEntity } from './domain/entities/transaction.entity';
import { Prisma } from 'generated/prisma';
import { UpdateCategoryDto } from 'src/categories/domain/category.dto';

@Injectable()
export class TransactionsService implements TransactionRepository {
  constructor(private readonly service: PrismaService) { }

  async createTransaction(
    data: CreateTransactionDto
  ): Promise<TransactionEntity> {
    return await this.service.transaction.create({ data });
  }

  async transactions(transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput): Promise<TransactionEntity[]> {
    return await this.service.transaction.findMany({ where: transactionWhereUniqueInput });
  }

  async transaction(transactionWhereInput: Prisma.TransactionWhereInput): Promise<TransactionEntity | null> {
    return await this.service.transaction.findFirst({ where: transactionWhereInput });
  }

  async updateTransaction(transactionWhereInput: Prisma.TransactionWhereUniqueInput, data: UpdateCategoryDto) {
    return await this.service.transaction.update({ where: transactionWhereInput, data })
  }

  removeTransaction(transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput) {
  }
}
