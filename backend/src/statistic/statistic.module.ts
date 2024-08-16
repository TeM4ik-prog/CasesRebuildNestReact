import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    StatisticController,

  ],
  providers: [StatisticService],
  exports: [StatisticService]
})
export class StatisticModule { }
