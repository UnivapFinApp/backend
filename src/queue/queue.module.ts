import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:8080',
      timeout: 10000,
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
