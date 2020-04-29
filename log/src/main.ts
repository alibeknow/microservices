import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { kafkaHost } from './config/config.service';

// Create a logger instance
const logger = new Logger('Main');

// Create the microservice options object
const microserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'logService',
      brokers: [kafkaHost],
    },
    consumer: {
      groupId: 'logService',
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen(() => {
    console.log('is started');
  });
}
bootstrap();
