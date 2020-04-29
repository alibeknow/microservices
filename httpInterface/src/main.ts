import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './config/config.service';
import { AllExceptionsFilter } from './exception/globalException';
const configObject = new ConfigService();

const hostPort = configObject.get('mainPort');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(hostPort);
}
bootstrap();
