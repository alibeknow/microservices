import { DbModule } from './../historyModule/dbModule';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MathService } from './math.service';
import { UtilsModule } from '../utils/utils.module';
import { KafkaMQModule } from '../kafkaModule/kafkaModule';

@Module({
  imports: [UtilsModule, KafkaMQModule, DbModule],
  controllers: [AppController],
  providers: [MathService],
})
export class AppModule {}
