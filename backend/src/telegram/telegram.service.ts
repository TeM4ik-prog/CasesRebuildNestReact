import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import * as path from 'path';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    private readonly databaseService: DatabaseService,
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

      let photosObjData = await this.bot.getUserProfilePhotos(userId);
      let fileAvatarUrl = null;
      if (photosObjData.photos[0]) {
        let fileId = photosObjData.photos[0][photosObjData.photos[0].length - 1].file_id;
        const file = await this.bot.getFile(fileId);
        fileAvatarUrl = `https://api.telegram.org/file/bot${this.configService.get<string>('TELEGRAM_TOKEN')}/${file.file_path}`;
      }

      let user = await this.databaseService.user.findUnique({ where: { telegramId: telegramId } });
      if (!user) {
        user = await this.databaseService.user.create({
          data: { telegramId, username, avatar: fileAvatarUrl },
        });
      }

      const photoPath = path.join(__dirname, 'public/images/startAppImg.jpg');
      const chatMember = await this.bot.getChatMember(CHANNEL_ID, userId);

      if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
        this.sendUserExit(chatId, photoPath, telegramId, WebAppUrl);
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

  sendUserExit(chatId: number, photoPath: string, telegramId: string, WebAppUrl: string) {
    this.bot.sendPhoto(chatId, photoPath, {
      caption: `Готовы испытать удачу?\nОткрывайте кейсы, собирайте редкие предметы и соревнуйтесь с другими игроками! 🎁🏆`,
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Let's go",
            web_app: { url: `${WebAppUrl}/login?token=${telegramId}` }
          }],
        ]
      }
    });
  }
}
