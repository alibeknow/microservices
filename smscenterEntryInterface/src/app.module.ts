import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MathService } from './entry.service';
import { DatabaseModule } from './modules/historyModule/databaseModule';
import { ConfModule } from './modules/configModule/confModule';
import { KafkaMQModule } from './modules/kafkaModule/kafkaModule';

@Module({
  imports: [DatabaseModule, ConfModule, KafkaMQModule, ConfigModule],
  controllers: [AppController],
  providers: [MathService],
})
export class AppModule {}
