import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import * as path from 'path';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;
  private user: Prisma.UserCreateInput



  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) { }

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_TOKEN');
    this.bot = new TelegramBot(token, { polling: true });
    this.initializeBot();
  }

  async initializeBot() {
    const CHANNEL_ID = '@caserush';
    const WebAppUrl = 'https://af733b5f-edd6-4d66-8db1-0f3f007a2a41-00-1pqn1ekfc2xsb.spock.replit.dev';

    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const userId = msg.from.id;
      const username = msg.chat.username;
      const telegramId = chatId.toString();

      this.user = await this.userService.findOne(telegramId)

      const photoPath = path.join(__dirname, 'images/startAppImg.jpg');
      const chatMember = await this.bot.getChatMember(CHANNEL_ID, userId);

      if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
        this.sendUserExit(chatId, photoPath, telegramId, WebAppUrl, username);
      } else {
        this.bot.sendMessage(chatId, 'Вы не подписаны на канал!\n\nОтправтье повторно /start для проверки подписки', {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Join community', url: 'https://t.me/caserush' }]
            ]
          }
        });
      }
    });
  }

  sendUserExit(chatId: number, photoPath: string, telegramId: string, WebAppUrl: string, username: string) {
    console.log(`${WebAppUrl}/entry/${this.user ? 'singIn' : 'login'}?token=${telegramId}`)

    this.bot.sendPhoto(chatId, 'https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg', {
      caption: `Готовы испытать удачу?\nОткрывайте кейсы, собирайте редкие предметы и соревнуйтесь с другими игроками! 🎁🏆`,
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Let's go",
            web_app: { url: `${WebAppUrl}/entry/${this.user ? 'login' : 'register'}?telegramId=${telegramId}&username=${username}` }
          }],
        ]
      }
    });
  }
}
