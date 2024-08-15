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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const telegram_module_1 = require("./telegram/telegram.module");
const config_1 = require("@nestjs/config");
const loot_module_1 = require("./loot/loot.module");
const database_service_1 = require("./database/database.service");
const loot_service_1 = require("./loot/loot.service");
let AppModule = class AppModule {
    constructor(lootService, databaseService) {
        this.lootService = lootService;
        this.databaseService = databaseService;
    }
    async onModuleInit() {
        this.lootService.createLootRareOnInit();
    }
    async cleanDatabase() {
        await this.databaseService.inventoryLoot.deleteMany();
        await this.databaseService.loot.deleteMany();
        await this.databaseService.categoryRare.deleteMany();
        await this.databaseService.user.deleteMany();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            telegram_module_1.TelegramModule,
            loot_module_1.LootModule,
            config_1.ConfigModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, loot_service_1.LootService],
    }),
    __metadata("design:paramtypes", [loot_service_1.LootService,
        database_service_1.DatabaseService])
], AppModule);
//# sourceMappingURL=app.module.js.map