import { Controller, Get } from '@nestjs/common';
import { Public } from './utils/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('/health')
  async getHealth(): Promise<any> {
    return { healthy: true };
  }
}
