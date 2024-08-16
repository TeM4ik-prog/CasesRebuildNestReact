import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { LootController } from './loot.controller';
import { LootService } from './loot.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [LootController],
  providers: [LootService],
  exports: [LootService]
})
export class LootModule { }
