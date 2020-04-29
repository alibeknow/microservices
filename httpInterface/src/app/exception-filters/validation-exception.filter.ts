import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
  Logger,
  HttpException,
} from '@nestjs/common';

import { UtilsService } from '../../utils/utils.service';
import * as jsontoxml from 'jsontoxml';
import { ErrCodes } from '../../core/enums/error-codes.enum';
import { CustomResponse } from '../../core/interfaces/custom-res.interface';

import { Request, Response } from 'express';

// ! This is used to catch validation pipes errors
@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException> {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  constructor(private readonly utils: UtilsService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errs: object[] = exception.message.message.map(
      (err: any) => err.constraints,
    );

    const errMessages: string[] = errs.map(
      (err: any) => err[Object.keys(err)[0]],
    );

    const res: CustomResponse = this.utils.buildErrorResponse(
      ErrCodes.BAD_PARAMETERS,
      errMessages,
    );
    const customWrapper = { message: res };
    response.contentType('application/xml');
    response.status(status).send(jsontoxml(customWrapper));
  }
}
