import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StatisticService {
  constructor(private readonly databaseService: DatabaseService) { }

  async findGlobal() {

    return await this.databaseService.user.findMany({
      orderBy: {
        money: 'desc'
      },
      take: 20
    })


  }






}
