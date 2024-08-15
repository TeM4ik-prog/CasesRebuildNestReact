import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    DatabaseModule,
    ConfigModule
  ],
  controllers: [
    TelegramController,
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
