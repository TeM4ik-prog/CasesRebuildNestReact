import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('/global')
  findAllGlobal() {
    return this.statisticService.findGlobal();
  }
}
