import { Module } from '@nestjs/common';

import { dbService } from './dbService';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [dbService],
  exports: [dbService],
})
export class dbModule {}
