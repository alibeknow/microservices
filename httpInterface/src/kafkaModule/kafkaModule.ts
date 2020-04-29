import { Module } from '@nestjs/common';
import { KafkaMQService } from './kafkaService';

@Module({
  imports: [],
  controllers: [],
  providers: [KafkaMQService],
  exports: [KafkaMQService],
})
export class KafkaMQModule {}
