import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(usersCreateDto: Prisma.UserCreateInput): Promise<{
        user: {
            id: number;
            telegramId: string;
            password: string;
            username: string | null;
            money: Prisma.Decimal;
        };
    }>;
    findAll(): Promise<{
        id: number;
        telegramId: string;
        password: string;
        username: string | null;
        money: Prisma.Decimal;
    }[]>;
    getInventory(req: any): Promise<import("../types/types").ILootWithSellData[]>;
    addMoney({ money }: {
        money: any;
    }, req: any): any;
}
