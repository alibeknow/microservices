import { AllExceptionsFilter } from './exceptions/GlobalException';
import { kafkaHost } from './config/config.service';
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
      clientId: 'smscenter',
      brokers: [kafkaHost],
    },
    consumer: {
      groupId: 'smscenter2',
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.listen(() => {
    logger.log('app is started');
  });
}
bootstrap();
