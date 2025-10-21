import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CategoriesModule,
    TransactionsModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
