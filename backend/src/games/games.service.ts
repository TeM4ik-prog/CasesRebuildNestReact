import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { IBoostName } from 'src/types/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GamesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService
  ) { }


  GetBoostsData(gameData: object): object {
    let resultGameData = {}
    for (const boost in gameData) {
      let boost_data = {
        multiplier: gameData[boost],
        boost_price: Number((10 * gameData[boost] * Math.pow(1.5, gameData[boost])).toFixed(2))
      };
      resultGameData[boost] = boost_data
    }

    return resultGameData
  }


  async getBombDefuserBoosts(userId: number) {

    let boostsData = await this.databaseService.bombDefuserGameData.findUnique({
      where: { userId },
      select: {
        speed_boost: true,
        time_boost: true,
        money_boost: true,
        focus_boost: true,
      }

    })

    return this.GetBoostsData(boostsData)
  }



  async addBoost(boostName: IBoostName, userId: number) {
    const boostNameString: string = boostName.boostName
    const user = await this.usersService.findOneById(userId)

    const boostModel = await this.databaseService.bombDefuserGameData.findUnique({
      where: { userId },
      select: { [boostNameString]: true }
    })

    const boostDataObj = (this.GetBoostsData(boostModel))[boostNameString]
    if (user.money < boostDataObj.boost_price) return
    await this.usersService.incrementUserMoney(userId, -boostDataObj.boost_price)

    const boosted = await this.databaseService.bombDefuserGameData.update({
      where: { userId },
      data: {
        [boostNameString]: boostDataObj.multiplier * 1.25
      },
    })

    return {
      amountReceived: boostDataObj.boost_price,
      boosted: (this.GetBoostsData({ [boostNameString]: boosted[boostNameString] }))[boostNameString]
    }
  }
}
