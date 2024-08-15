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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const database_service_1 = require("../database/database.service");
const crypto = require("crypto");
let AuthService = class AuthService {
    constructor(usersService, databaseService, jwtService) {
        this.usersService = usersService;
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    checkTelegramAuth(data, token) {
        const secret = crypto.createHash('sha256').update(token).digest();
        const checkString = Object.keys(data)
            .filter((key) => key !== 'hash')
            .sort()
            .map((key) => `${key}=${data[key]}`)
            .join('\n');
        const hash = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
        return hash === data.hash;
    }
    async validateUser(telegramUserData, token) {
        if (!this.checkTelegramAuth(telegramUserData, token)) {
            throw new common_1.UnauthorizedException('Invalid Telegram data');
        }
        const { telegramId } = telegramUserData;
        let user = await this.databaseService.user.findUnique({ where: { telegramId } });
        if (!user) {
            user = await this.databaseService.user.create({
                data: telegramUserData,
            });
        }
        return user;
    }
    async login(user) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        database_service_1.DatabaseService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map