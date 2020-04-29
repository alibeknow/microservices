import { ConfigModule } from '../../config/config.module';
import { Module } from '@nestjs/common';

import { ConfService } from './confService';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ConfService],
  exports: [ConfService],
})
export class ConfModule {}
