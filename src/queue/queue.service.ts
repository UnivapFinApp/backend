import { HttpService } from '@nestjs/axios';
import { Body, Injectable, Request } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { CategoriesService } from 'src/categories/categories.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class QueueService {
  constructor(
    private readonly httpService: HttpService,
    private readonly transactionService: TransactionsService,
    private readonly categoryService: CategoriesService,
  ) {}

  async triggerAnalysis(userId: string): Promise<any> {
    const aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7);

    const raw_tr = await this.transactionService.transactions({
      date: {
        gte: aWeekAgo,
        lte: new Date(),
      },
    });

    const raw_cat = await this.categoryService.categories({});

    const data = {
      raw_transactions: raw_tr,
      raw_categories: raw_cat,
      user_id: userId,
    };

    const response = await firstValueFrom(
      this.httpService.post('/ai/analyze', data),
    );

    return response.data;
  }

  async triggerSuggestion(transactionInfo): Promise<any> {
    const data = {
      description: transactionInfo.description,
      amount: transactionInfo.amount,
    };

    const response = await firstValueFrom(
      this.httpService.post('/ai/suggest', data),
    );

    return response.data;
  }
}
