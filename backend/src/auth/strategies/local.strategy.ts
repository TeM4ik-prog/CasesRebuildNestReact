import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'telegramId' })
    }

    async validate(telegramId: string, password: string) {
        const user = await this.authService.validateUser(telegramId, password)
        console.log(user)

        if (user) {
            return user
        }
        throw new UnauthorizedException(`Invalid telegramId ${telegramId} and password ${password}`)
    }
}
