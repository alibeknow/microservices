import { Injectable, Inject } from '@nestjs/common';
import * as umgH from 'umg-history';
import { ConfigService } from '../config/config.service';

@Injectable()
export class DbService {
  history = null;
  historyArchive = null;
  phoneArchive = null;
  constructor(private readonly configService: ConfigService) {
    const config = {
      dbName: this.configService.get('dbName'),
      dbUser: this.configService.get('dbUser'),
      dbPass: this.configService.get('dbPass'),
      dbHost: this.configService.get('dbHost'),
      dbDialect: this.configService.get('dbDialect'),
      createTable: false,
    };
    const { HistoryArchiveService, HistoryService, PhoneArchiveService } = umgH(
      config,
    );
    this.history = HistoryService;
    this.historyArchive = HistoryArchiveService;
    this.phoneArchive = PhoneArchiveService;
  }
  getObjects() {
    return this;
  }
}
