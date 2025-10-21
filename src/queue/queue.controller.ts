import { Body, Controller, Post } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly api: QueueService) {}

  @Post('/analyze')
  startAnalysis(@Body() data: any) {
    return this.api.triggerAnalysis(data);
  }
}
