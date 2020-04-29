import { KafkaMQService } from './modules/kafkaModule/kafkaService';
import { ConfService } from './modules/configModule/confService';
import { DatabaseService } from './modules/historyModule/database.service';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { nameSpace } from './config/config.service';
@Injectable()
export class MathService implements OnModuleInit {
  private logger = new Logger(MathService.name);
  client = null;
  logClient = null;
  constructor(
    private readonly historyService: DatabaseService,
    private readonly confService: ConfService,
    private readonly kafkaService: KafkaMQService,
  ) {}
  public async accumulate(data: any) {
    const whereClause = { code: data.data.routeType };
    let result = null;
    if (data.data.routes) {
      result = data.data.routes;
    } else {
      try {
        result = await this.confService.routes.GetByRouteCode(whereClause);
      } catch (error) {
        this.logger.log(error);
      }
    }

    let historyModel;
    let historiesArray = {};
    if (result.length > 0) {
      await result.forEach(item => {
        const CodeProvider = item.tprovider.code;
        historyModel = {
          [CodeProvider]: {
            uid: data.data.uid,
            address: data.data.msisdn,
            routeType: data.data.routeType,
            message: data.data.text,
            status: !item.status ? 'delivery' : '',
            provider: item.tprovider.tchannel.code,
            channel: CodeProvider,
            module: nameSpace,
            method: 'processing_to_sms_consult',
          },
        };
        historiesArray = Object.assign(historiesArray, historyModel);
      });
      data.data = Object.assign(data.data, {
        routes: historiesArray,
      });
      for (const item of Object.keys(historiesArray)) {
        if (historiesArray[item].status === 'delivery') {
          this.logger.log(
            'try SEND to Microservice' + item + JSON.stringify(data),
          );
          this.client.emit(item, data);
          break;
        }
      }
      this.logger.log('try datasend' + JSON.stringify(data));
      await this.client.emit('addLog', data);
      this.logger.log('sended' + JSON.stringify(data));
      return result;
    }
  }

  public async errorQueue(data: any) {
    let result = null;
    result = data.data.routes;
    let isFound = false;
    for (const item of Object.keys(result)) {
      if (result[item].status === 'delivery') {
        this.logger.log('try to send' + item + JSON.stringify(data));
        this.client.emit(item, data);
        isFound = true;
        break;
      }
    }
    if (isFound === false) {
      this.logger.log('cant send to any provider' + JSON.stringify(data));
      this.historyService.history.Update({ uid: data.data.uid, status: 2 });
    }
    await this.client.emit('addLog', data);
    return result;
  }
  async onModuleInit() {
    const clientKafk = this.kafkaService.getClient();
    this.client = clientKafk;
    this.client.subscribeToResponseOf('smsConsult');
    this.client.subscribeToResponseOf('addLog');
    this.client.subscribeToResponseOf('smsC');
    await this.client.connect();
  }
}
