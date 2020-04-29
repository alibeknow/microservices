import { dbService } from './modules/logModule/dbService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  constructor(private readonly logService: dbService) {}
  public async accumulate(data: any) {
    const logData = {
      uid: data.data.uid,
      logDate: Date.now(),
      module: data.data.module,
      method: data.data.method,
      status: data.status === 'success' ? 0 : 1,
      log: JSON.stringify(data.data),
    };
    const result = await this.logService.log.Save(logData);
    return result;
  }
}
