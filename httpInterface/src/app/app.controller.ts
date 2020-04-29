import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { nameSpace } from './../config/config.service';

import { CreateMessageDto } from './dto/createMessageDto';
import {
  Controller,
  Logger,
  Post,
  Body,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UtilsService } from './../utils/utils.service';
import { MathService } from './math.service';
import { ValidationExceptionFilter } from './exception-filters/validation-exception.filter';
import { CustomResponse } from '../core/interfaces/custom-res.interface';

import * as uuidRandom from 'uuid-random';
@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');
  // Inject the math serviced
  constructor(
    private readonly mathService: MathService,
    private readonly utilsService: UtilsService,
  ) {}

  // Map the 'POST /add' route to this method

  @Post('sendMessage')
  @UseFilters(ValidationExceptionFilter)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  // Define the logic to be executed
  async accumulate(@Body() data: CreateMessageDto) {
    data.uid = await uuidRandom();
    data.module = nameSpace;
    data.method = 'sendMessage';
    if (!data.routeType) {
      data.routeType = '00';
    }

    this.logger.log('Adding ' + JSON.stringify(data));
    const res: CustomResponse = await this.utilsService.buildSuccessResponse(
      data,
    );
    await this.mathService.accumulate(res);
    return res;
  }

  @Get('health')
  @UseFilters(ValidationExceptionFilter)
  async health() {
    return {
      status: 'UP',
    };
  }
}
