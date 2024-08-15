import { JwtService } from "@nestjs/jwt";
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
export declare class AuthService {
    private readonly usersService;
    private readonly databaseService;
    private readonly jwtService;
    constructor(usersService: UsersService, databaseService: DatabaseService, jwtService: JwtService);
    checkTelegramAuth(data: Record<string, any>, token: string): boolean;
    validateUser(telegramUserData: Prisma.UserCreateInput, token: string): Promise<{
        id: number;
        telegramId: string;
        username: string | null;
        money: number;
        avatar: string | null;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
