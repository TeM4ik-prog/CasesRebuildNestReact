"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const jwt_1 = require("@nestjs/jwt");
const argon2 = require("argon2");
const loot_service_1 = require("../loot/loot.service");
let UsersService = class UsersService {
    constructor(databaseService, jwtService, lootService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
        this.lootService = lootService;
    }
    async create(usersCreateDto) {
        let existingUser = await this.databaseService.user.findUnique({
            where: { telegramId: usersCreateDto.telegramId },
        });
        if (existingUser)
            throw new common_1.BadRequestException(`User ${usersCreateDto.username} already exists`);
        const user = await this.databaseService.user.create({
            data: {
                ...usersCreateDto,
                password: await argon2.hash(usersCreateDto.password),
                BombDefuserGameData: { create: {} }
            }
        });
        let token = this.jwtService.sign({ id: user.id, telegramId: user.telegramId });
        return { user };
    }
    async findOne(telegramId) {
        const user = await this.databaseService.user.findUnique({
            where: { telegramId },
        });
        if (!user)
            throw new common_1.NotFoundException(`User with telegramId ${telegramId} not found`);
        return user;
    }
    async findOneById(id) {
        return await this.databaseService.user.findUnique({
            where: { id },
        });
    }
    async incrementUserMoney(id, amount) {
        return await this.databaseService.user.update({
            where: { id },
            data: {
                money: {
                    increment: amount,
                },
            },
        });
    }
    async findAll() {
        return await this.databaseService.user.findMany();
    }
    async getInventory(userId) {
        const userInventory = await this.databaseService.inventoryLoot.findMany({
            where: {
                userId: userId
            },
            include: {
                categoryRare: true
            }
        });
        if (!userInventory)
            return;
        return await this.lootService.CalculateSellPrice(userInventory);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService,
        loot_service_1.LootService])
], UsersService);
//# sourceMappingURL=users.service.js.map