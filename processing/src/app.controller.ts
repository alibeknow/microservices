import { Controller, Logger, Get } from '@nestjs/common';
import { MathService } from './entry.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private mathService: MathService) {}

  // Define the message pattern for this method
  @EventPattern('sendMessage')
  // Define the logic to be executed
  async accumulate(data: any) {
    data = data.value;
    this.logger.log('Adding ' + JSON.stringify(data));

    return await this.mathService.accumulate(data);
  }
  @EventPattern('errorQueue')
  async errorEvent(data: any) {
    data = data.value;
    this.logger.log('erroring ' + JSON.stringify(data));
    await this.mathService.errorQueue(data);
    return data;
  }

  @Get('health')
  async health() {
    return {
      status: 'UP',
    };
  }
}
