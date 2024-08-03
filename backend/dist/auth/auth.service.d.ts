import { JwtService } from "@nestjs/jwt";
import { IUser } from 'src/types/types';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): unknown;
    login(user: IUser): unknown;
}
