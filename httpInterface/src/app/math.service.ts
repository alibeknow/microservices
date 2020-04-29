import { DbService } from './../historyModule/dbService';
import { KafkaMQService } from '../kafkaModule/kafkaService';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

@Injectable()
export class MathService implements OnModuleInit {
  private client = null;
  private logger = new Logger('AppController');
  constructor(
    private readonly kafkaMQService: KafkaMQService,
    private readonly historyService: DbService,
  ) {}
  public async accumulate(data: any) {
    this.logger.log('try send' + JSON.stringify(data));
    await this.client.emit('sendMessage', data);
    await this.client.emit('addLog', data);
    this.logger.log('sended' + JSON.stringify(data));
    const historyModel = {
      status: 0,
      uid: data.data.uid,
      routeType: data.data.routeType,
      address: data.data.msisdn,
      message: data.data.text,
    };
    const myRes = await this.historyService.history.Save(historyModel);
    this.logger.log('trySaveHistory' + JSON.stringify(myRes));
    return 'sended';
  }

  async onModuleInit() {
    const clientKafk = this.kafkaMQService.getClient();
    this.client = clientKafk;
    this.client.subscribeToResponseOf('sendMessage');
    this.client.subscribeToResponseOf('addLog');
    await this.client.connect();
  }
}
