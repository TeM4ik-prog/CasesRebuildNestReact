import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        id: string;
        telegramId: string;
        money: number;
        username: string;
        token: string;
    }>;
    getProfile(req: any): any;
}
