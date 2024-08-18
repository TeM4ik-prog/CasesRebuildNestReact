import { JwtService } from "@nestjs/jwt";
import { IUser } from 'src/types/types';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(telegramId: string, password: string): Promise<{
        id: number;
        telegramId: string;
        password: string;
        username: string | null;
        money: import("@prisma/client/runtime/library").Decimal;
    }>;
    login(user: IUser): Promise<{
        id: string;
        telegramId: string;
        money: number;
        username: string;
        token: string;
    }>;
}
