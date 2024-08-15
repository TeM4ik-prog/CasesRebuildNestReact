import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const telegramUserData = request.body;
        const token = this.configService.get<string>('TELEGRAM_TOKEN');

        if (!this.checkTelegramAuth(telegramUserData, token)) {
            throw new UnauthorizedException('Invalid Telegram authentication');
        }

        const user = await this.authService.validateUser(telegramUserData, token);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        request.user = user;
        return true;
    }

    private checkTelegramAuth(data: Record<string, any>, token: string): boolean {
        const secret = crypto.createHash('sha256').update(token).digest();
        const checkString = Object.keys(data)
            .filter((key) => key !== 'hash')
            .sort()
            .map((key) => `${key}=${data[key]}`)
            .join('\n');

        const hash = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
        return hash === data.hash;
    }
}
