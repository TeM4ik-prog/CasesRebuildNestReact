import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/types/types';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(user: IUser): unknown;
}
export {};
