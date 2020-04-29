import { KafkaMQModule } from './modules/kafkaModule/kafkaModule';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MathService } from './entry.service';
import { DatabaseModule } from './modules/historyModule/databaseModule';
import { ConfModule } from './modules/configModule/confModule';

@Module({
  imports: [DatabaseModule, ConfModule, KafkaMQModule],
  controllers: [AppController],
  providers: [MathService],
})
export class AppModule {}
