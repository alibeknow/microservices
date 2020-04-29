import { Injectable, Inject } from '@nestjs/common';
import * as umgL from 'umg-log';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class dbService {
  log = null;

  constructor(private readonly configService: ConfigService) {
    let config = {
      dbName: this.configService.get('dbName'),
      dbUser: this.configService.get('dbUser'),
      dbPass: this.configService.get('dbPass'),
      dbHost: this.configService.get('dbHost'),
      dbDialect: this.configService.get('dbDialect'),
      createTable: false,
    };
    const { LogService } = umgL(config);
    this.log = LogService;
  }
  getObjects() {
    return this;
  }
}
