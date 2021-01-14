import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AmtechModule } from './amtech/amtech.module';

@Module({
  imports: [
    AmtechModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
