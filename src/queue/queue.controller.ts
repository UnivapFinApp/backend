import { Body, Controller, Post, Request } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly api: QueueService) {}

  @Post('/analyze')
  startAnalysis(@Request() req) {
    const userId = req.user.id;
    return this.api.triggerAnalysis(userId);
  }

  @Post('/suggest')
  startSuggestion(@Request() req, @Body() transactionInfo) {
    return this.api.triggerSuggestion(transactionInfo);
  }
}
