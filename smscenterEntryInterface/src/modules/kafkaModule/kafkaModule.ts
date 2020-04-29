import { KafkaMQService } from './kafkaService';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [KafkaMQService],
  exports: [KafkaMQService],
})
export class KafkaMQModule {}
