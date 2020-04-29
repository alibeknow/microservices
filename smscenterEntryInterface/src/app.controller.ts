import { Controller, Logger, Get } from '@nestjs/common';
import { MathService } from './entry.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');

  // Inject the math service
  constructor(private mathService: MathService) {}

  // Define the message pattern for this method
  @EventPattern('SMSC')
  // Define the logic to be executed
  async accumulate(data: any) {
    data = data.value;
    this.logger.log('Adding ' + JSON.stringify(data));

    return await this.mathService.accumulate(data); // use math service to calc result & return
  }

  @Get('health')
  async health() {
    return {
      status: 'UP',
    };
  }
}
