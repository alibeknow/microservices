import { CustomResponse } from './custom-res.interface';
import { CustomError } from './custom-error.interface';

export interface CustomErrorWrapper {
  message: CustomError;
}
export interface CustomResWrapper {
  message: CustomResponse;
}
