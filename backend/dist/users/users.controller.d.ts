import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(usersCreateDto: Prisma.UserCreateInput): Promise<{
        user: {
            id: number;
            telegramId: string;
            username: string | null;
            money: number;
            avatar: string | null;
        };
    }>;
    findAll(): Promise<{
        id: number;
        telegramId: string;
        username: string | null;
        money: number;
        avatar: string | null;
    }[]>;
}
