import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LootModule } from './loot/loot.module';
import { DatabaseService } from './database/database.service';
import { LootService } from './loot/loot.service';
import { JwtModule } from '@nestjs/jwt';
import { StatisticModule } from './statistic/statistic.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    TelegramModule,
    LootModule,
    ConfigModule.forRoot(),

    

    StatisticModule,

    GamesModule
  ],
  controllers: [AppController],
  providers: [AppService, LootService],
})
export class AppModule implements OnModuleInit {

  constructor(
    private readonly lootService: LootService,
    private readonly databaseService: DatabaseService
  ) { }


  async onModuleInit() {
    this.lootService.createLootRareOnInit()

    //полная очистка базы данных
    // await this.cleanDatabase()
  }

  async cleanDatabase() {
    await this.databaseService.inventoryLoot.deleteMany();
    await this.databaseService.loot.deleteMany();
    await this.databaseService.categoryRare.deleteMany();
    await this.databaseService.user.deleteMany();

  }
}
