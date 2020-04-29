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
    const myParams = {
      login: this.configEnv.get('smsLogin'),
      psw: this.configEnv.get('smsPassword'),
      phones: data.data.msisdn,
      mes: data.data.text,
    };
    this.logger.log('try to send on smsCenter' + JSON.stringify(myParams));
    const response = await yelp
      .get('/sys/send.php', {
        params: {
          myParams,
        },
      })
      .catch(err => {
        return err;
      });
    this.logger.log('get Response' + JSON.stringify(response.data));
    if (response.data.indexOf('OK') !== -1) {
      data.status = 'success';
      for (const item of Object.keys(data.data.routes)) {
        if (data.data.routes[item].channel === 'SMSC') {
          const historyModel = Object.assign({}, data.data, {
            status: 1,
            provider: data.data.routes[item].provider,
            sended: Date.now(),
          });
          this.historyService.history.Update(historyModel);
          data.data.routes[item].status = 'sended';

          break;
        }
      }
      this.client.emit('addLog', data);
    } else {
      for (const item of Object.keys(data.data.routes)) {
        if (data.data.routes[item].channel === 'SMSC') {
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
      this.logger.log(
        'prepare to send on queue' + JSON.stringify(response.data),
      );
      await this.client.emit('addLog', data);
      await this.client.emit('errorQueue', data);
      this.logger.log('sended to queue' + JSON.stringify(response.data));
    }

    return response;
  }
  async onModuleInit() {
    const logCLient = this.kafkaMQService.getClient();
    this.client = logCLient;
    this.client.subscribeToResponseOf('addLog');
    this.client.subscribeToResponseOf('errorQueue');
    await this.client.connect();
  }
}
