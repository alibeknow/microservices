import { kafkaHost } from '../../config/config.service';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientKafka, Client, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaMQService {
  private readonly logger = new Logger(KafkaMQService.name);
  constructor() {
    this.logger.log('SERVICE INIT');
  }
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'smsConsult',
        brokers: [kafkaHost],
      },
      consumer: {
        groupId: 'smsConsult',
      },
    },
  })
  client: ClientKafka;

  public send(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
  public getClient() {
    return this.client;
  }
}
