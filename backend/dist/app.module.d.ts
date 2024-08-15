import { OnModuleInit } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { LootService } from './loot/loot.service';
export declare class AppModule implements OnModuleInit {
    private readonly lootService;
    private readonly databaseService;
    constructor(lootService: LootService, databaseService: DatabaseService);
    onModuleInit(): Promise<void>;
    cleanDatabase(): Promise<void>;
}
