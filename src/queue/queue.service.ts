import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class QueueService {
  constructor(private readonly httpService: HttpService) {}

  async triggerAnalysis(data: any): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post('/ai/analyze', data),
    );

    return response;
  }
}
