import { AllExceptionsFilter } from './exeptions/all.exception';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { appPort, kafkaHost } from './config/config.service';

// Create a logger instance
const logger = new Logger('Main');

// Create the microservice options object
const microserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'Processing',
      brokers: [kafkaHost],
    },
    consumer: {
      groupId: 'Processing',
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservicesAsync();
  await app.listen(appPort);
}
bootstrap();
