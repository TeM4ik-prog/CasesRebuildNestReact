import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { LootService } from 'src/loot/loot.service';
export declare class UsersService {
    private readonly databaseService;
    private readonly jwtService;
    private readonly lootService;
    constructor(databaseService: DatabaseService, jwtService: JwtService, lootService: LootService);
    create(usersCreateDto: Prisma.UserCreateInput): Promise<{
        user: {
            id: number;
            telegramId: string;
            password: string;
            username: string | null;
            money: number;
        };
    }>;
    findOne(telegramId: string): Promise<{
        id: number;
        telegramId: string;
        password: string;
        username: string | null;
        money: number;
    }>;
    findOneById(id: number): Promise<{
        id: number;
        telegramId: string;
        password: string;
        username: string | null;
        money: number;
    }>;
    incrementUserMoney(id: number, amount: number): Promise<{
        id: number;
        telegramId: string;
        password: string;
        username: string | null;
        money: number;
    }>;
    findAll(): Promise<{
        id: number;
        telegramId: string;
        password: string;
        username: string | null;
        money: number;
    }[]>;
    getInventory(userId: number): Promise<import("../types/types").ILootWithSellData[]>;
}
