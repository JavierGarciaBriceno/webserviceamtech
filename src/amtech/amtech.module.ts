import { Module, HttpModule, forwardRef } from '@nestjs/common';

import { AmtechService } from './amtech.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  providers: [
    AmtechService,
  ],
  exports: [
    AmtechService,
  ]
})
export class AmtechModule { }