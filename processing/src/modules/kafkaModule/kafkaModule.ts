import { Module } from '@nestjs/common';

import { ConfigModule } from '../../config/config.module';
import { KafkaMQService } from './kafkaService';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [KafkaMQService],
  exports: [KafkaMQService],
})
export class KafkaMQModule {}
