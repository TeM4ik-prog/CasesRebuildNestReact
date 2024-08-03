import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(usersCreateDto: Prisma.UsersCreateInput): unknown;
    findAll(): unknown;
}
