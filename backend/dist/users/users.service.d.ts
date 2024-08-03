import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private readonly databaseService;
    private readonly jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    create(usersCreateDto: Prisma.UsersCreateInput): unknown;
    findOne(email: string): unknown;
    findAll(): unknown;
}
