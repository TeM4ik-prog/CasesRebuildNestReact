import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/types/types';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,
    private readonly usersService: UsersService

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(user: IUser) {
    const userFromDb = await this.usersService.findOne(user.telegramId);
    return { id: user.id, telegramId: user.telegramId, money: userFromDb.money, username: userFromDb.username };
  }
}