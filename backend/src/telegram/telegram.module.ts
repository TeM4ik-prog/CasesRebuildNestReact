import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    UsersModule,
    ConfigModule
  ],
  controllers: [
    TelegramController,
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
