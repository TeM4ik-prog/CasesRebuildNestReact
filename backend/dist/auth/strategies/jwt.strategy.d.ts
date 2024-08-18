import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/types/types';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(user: IUser): Promise<{
        id: string;
        telegramId: string;
        money: number;
        username: string;
    }>;
}
export {};
