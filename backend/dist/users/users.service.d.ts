import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private readonly databaseService;
    private readonly jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    create(usersCreateDto: Prisma.UserCreateInput): Promise<{
        user: {
            id: number;
            telegramId: string;
            username: string | null;
            money: number;
            avatar: string | null;
        };
    }>;
    findOne(telegramId: string): Promise<{
        id: number;
        telegramId: string;
        username: string | null;
        money: number;
        avatar: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        telegramId: string;
        username: string | null;
        money: number;
        avatar: string | null;
    }[]>;
}
