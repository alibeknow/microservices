import { dbService } from './modules/logModule/dbService';
import { Controller, Logger, Body } from '@nestjs/common';
import { MathService } from './entry.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');

  // Inject the math service
  constructor(
    private readonly mathService: MathService,
    private readonly logService: dbService,
  ) {}

  // Define the message pattern for this method
  @EventPattern('addLog')
  // Define the logic to be executed
  async accumulate(data: any) {
    data = data.value;
    this.logger.log('Adding ' + JSON.stringify(data));

    return await this.mathService.accumulate(data); // use math service to calc result & return
  }
}
