import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(telegramId: string, password: string): Promise<{
        id: number;
        telegramId: string;
        password: string;
        username: string | null;
        money: import("@prisma/client/runtime/library").Decimal;
    }>;
}
export {};
