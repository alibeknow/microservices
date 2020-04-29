import { Module } from '@nestjs/common';

import { DbService } from './dbService';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
