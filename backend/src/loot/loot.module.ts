import { Module } from '@nestjs/common';
import { LootService } from './loot.service';
import { LootController } from './loot.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LootController],
  providers: [LootService],
  exports: [LootModule]
})
export class LootModule {}
