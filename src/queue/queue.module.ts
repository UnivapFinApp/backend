import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://gateway:8080',
      timeout: 10000,
    }),
    TransactionsModule,
    CategoriesModule,
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
