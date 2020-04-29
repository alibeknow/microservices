import { DatabaseService } from './modules/historyModule/database.service';
import { KafkaMQService } from './modules/kafkaModule/kafkaService';
import { ConfigService } from './config/config.service';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

import yelp from './api/yelp';

@Injectable()
export class MathService implements OnModuleInit {
  private logger = new Logger('AppController');
  client = null;
  constructor(
    private readonly configEnv: ConfigService,
    private readonly kafkaMQService: KafkaMQService,
    private readonly historyService: DatabaseService,
  ) {}
  public async accumulate(data: any) {
    data.data.module = this.configEnv.get('ERROR_CODE_NAMESPACE');
    data.data.method = this.configEnv.get('ERROR_CODE_NAMESPACE');
    const params = {
      login: this.configEnv.get('smsLogin'),
      password: this.configEnv.get('smsPassword'),
      // id: data.data.uid,
      type: 'message',
      recipient: data.data.address,
      sender: 'MESSAGE',
      text: data.data.message,
    };
    this.logger.log('try send' + JSON.stringify(params));
    const response = await yelp
      .get('/get.ashx', {
        params,
      })
      .catch(err => {
        return err;
      });
    this.logger.log('response get' + JSON.stringify(response.data));
    if (response.data === 'status=100') {
      data.status = 'success';
      for (const item of Object.keys(data.data.routes)) {
        if (data.data.routes[item].channel === 'SMSConsult') {
          const historyModel = Object.assign({}, data.data, {
            status: 1,
            sended: Date.now(),
            provider: data.data.routes[item].provider,
          });
          this.historyService.history.Update(historyModel);
          data.data.routes[item].status = 'sended';
          break;
        }
      }
      this.client.emit('addLog', data);
    } else {
      for (const item of Object.keys(data.data.routes)) {
        if (data.data.routes[item].channel === 'SMSConsult') {
          data.data.routes[item].status = 'error';
          await this.historyService.history.Update({
            channel: data.data.routes[item].channel,
            uid: data.data.uid,
            provider: data.data.routes[item].provider,
            status: 2,
          });
          break;
        }
      }
      data.status = 'error';
      this.logger.log('try send on queue' + JSON.stringify(data));
      await this.client.emit('addLog', data);
      await this.client.emit('errorQueue', data);
    }

    return response;
  }
  async onModuleInit() {
    const logCLient = this.kafkaMQService.getClient();
    this.client = logCLient;
    this.client.subscribeToResponseOf('addLog');
    await this.client.connect();
  }
}
