import { AllExceptionsFilter } from './exception/globalException';
import { appPort, kafkaHost } from './config/config.service';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

// Create a logger instance
const logger = new Logger('Main');

// Create the microservice options object
const microserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'smsConsult',
      brokers: [kafkaHost],
    },
    consumer: {
      groupId: 'smsConsult2',
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(microserviceOptions);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.startAllMicroservicesAsync();
  await app.listen(4000);
}
bootstrap();
