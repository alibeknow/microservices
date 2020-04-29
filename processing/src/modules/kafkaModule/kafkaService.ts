import { kafkaHost } from '../../config/config.service';
import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka, Client, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaMQService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'Processing',
        brokers: [kafkaHost],
      },
      consumer: {
        groupId: 'umg',
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
