import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MathService } from './entry.service';
import { dbModule } from './modules/logModule/dbModule';

@Module({
  imports: [dbModule],
  controllers: [AppController],
  providers: [MathService],
})
export class AppModule {}
