import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2'
import { JwtService } from "@nestjs/jwt"
import { IUser } from 'src/types/types';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import * as crypto from 'crypto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) { }


  checkTelegramAuth(data: Record<string, any>, token: string): boolean {
    const secret = crypto.createHash('sha256').update(token).digest();
    const checkString = Object.keys(data)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${data[key]}`)
      .join('\n');

    const hash = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
    return hash === data.hash;
  }


  async validateUser(telegramUserData: Prisma.UserCreateInput, token: string) {
    if (!this.checkTelegramAuth(telegramUserData, token)) {
      throw new UnauthorizedException('Invalid Telegram data');
    }

    const { telegramId } = telegramUserData;
    let user = await this.databaseService.user.findUnique({ where: { telegramId } });

    if (!user) {
      user = await this.databaseService.user.create({
        data: telegramUserData,
      });
    }

    return user;
  }


  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}

