import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LootCategory, LootCreateObj, LootItem } from './box_config/box_loot';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { lootChances, LootChances } from './box_config/loot_chance';
import { RandElemFromAr, RandInt } from 'src/utils/functions.utils';
import { ILootWithSellData, ISellData } from 'src/types/types';
import { ReturnSellCoefficientByCategoryId } from './box_config/loot_sellConf';
import { assert } from 'console';

@Injectable()
export class LootService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) { }

  async createLootRareOnInit(): Promise<void> {
    for (const rareName in LootCreateObj) {
      try {
        let categoryRare = await this.databaseService.categoryRare.findUnique({
          where: { name: rareName },
        });

        if (!categoryRare) {
          categoryRare = await this.databaseService.categoryRare.create({
            data: { name: rareName },
          });
        }

        for (const lootData of LootCreateObj[rareName]) {
          const createdLoot = await this.createLoot({ ...lootData, categoryRareId: categoryRare.id })
        }
      } catch (error) {
        console.error('Ошибка обработки', error);
      }
    }
  }

  async createLoot(lootCreateDto: Prisma.LootCreateInput) {

    let existingLoot = await this.databaseService.loot.findUnique({
      where: { img: lootCreateDto.img },
    })

    if (existingLoot) return

    return await this.databaseService.loot.create({
      data: lootCreateDto,
    })
  }

  async getArLootByCategories(): Promise<LootCategory> {
    const objOfLootArs = {} as LootCategory;


    for (const rareName in LootCreateObj) {
      const categoryRareWithLoot = await this.databaseService.categoryRare.findUnique({
        where: { name: rareName },
        include: {
          Loot: {
            include: {
              categoryRare: {
                select: { name: true }
              }
            }
          }
        }
      });

      if (categoryRareWithLoot) {
        objOfLootArs[rareName as keyof LootCategory] = categoryRareWithLoot.Loot;
      }
    }

    return objOfLootArs;
  }

  getRandomLoot(lootPools: LootCategory, itemsValue: number): LootItem[] {
    const Result_Loot_box: LootItem[] = []

    for (let i = 0; i < itemsValue; i++) {
      const chance = RandInt(0, 100)
      let loot = {} as LootItem

      if (chance < lootChances.legendary) {
        loot = RandElemFromAr(lootPools.legendary)
      }
      else if (chance < lootChances.epic) {
        loot = RandElemFromAr(lootPools.epic)
      }
      else if (chance < lootChances.uncommon) {
        loot = RandElemFromAr(lootPools.uncommon)
      }
      else {
        loot = RandElemFromAr(lootPools.common)
      }

      Result_Loot_box.push(loot);
    }
    return Result_Loot_box
  }

  async createInventoryLoot(winnerLootModelObj: LootItem, userId: number, openPrice: number) {
    const createdInventoryLoot = await this.databaseService.inventoryLoot.findFirst({
      where: {
        userId: +userId,
        img: winnerLootModelObj.img,
        openPrice: +openPrice
      }
    });
    console.log(createdInventoryLoot)
    if (createdInventoryLoot) {
      await this.databaseService.inventoryLoot.update({
        where: { id: createdInventoryLoot.id },
        data: { quantity: { increment: 1 } }
      });
    }
    else {
      let categoryModel = await this.databaseService.categoryRare.findUnique({
        where: { id: winnerLootModelObj.categoryRareId }
      });

      if (!categoryModel) throw new Error('CategoryRare not found');


      await this.databaseService.inventoryLoot.create({
        data: {
          userId: +userId,
          img: winnerLootModelObj.img,
          openPrice: +openPrice,
          categoryRareId: categoryModel.id
        }
      });
    }
  }

  async CalculateSellPrice(userInventory: any[]): Promise<ILootWithSellData[]> {
    let LootWithSellPrice = []

    for (const item of userInventory) {
      let SellCoefficient = await ReturnSellCoefficientByCategoryId(item.categoryRare.name as keyof LootCategory)

      item.sellOne = Number((item.openPrice * SellCoefficient).toFixed(2))
      item.sellAll = Number((item.quantity * item.openPrice * SellCoefficient).toFixed(2))

      LootWithSellPrice.push(item)
    }

    return LootWithSellPrice
  }

  async incrementLootQuantity(id: number, quantity: number) {
    const incrementedLoot = await this.databaseService.inventoryLoot.update({
      where: { id },
      data: { quantity: { increment: quantity } },
    })

    if (incrementedLoot.quantity == 0) this.deleteLoot(incrementedLoot.id)
  }

  async deleteLoot(id: number) {
    return this.databaseService.inventoryLoot.delete({
      where: { id }
    })
  }


  // private

  async openBox(openPrice: number, userId: number): Promise<LootItem[]> {
    const itemsValue: number = 30

    const user = await this.usersService.findOneById(userId)

    console.log(user)

    if (user.money < openPrice) throw new BadRequestException('Not enough money')

    const { common, uncommon, epic, legendary } = await this.getArLootByCategories()
    const resultLootBox = this.getRandomLoot({ common, uncommon, epic, legendary }, itemsValue)

    const winnerLootModelObj = resultLootBox[itemsValue - 5]

    this.createInventoryLoot(winnerLootModelObj, userId, openPrice)
    await this.usersService.incrementUserMoney(userId, -openPrice)

    return resultLootBox
  }

  async sellLoot(sellData: ISellData, userId: number) {
    const itemModel = await this.databaseService.inventoryLoot.findUnique({
      where: { id: sellData.itemIdInDb, userId: +userId },
      include: { categoryRare: true }
    })

    if (!itemModel) throw new NotFoundException('Item not found')

    let amountReceived: number

    if (!sellData.isSellAll) {
      const sellPrice = (await this.CalculateSellPrice([itemModel]))[0].sellOne
      await this.usersService.incrementUserMoney(userId, sellPrice)
      await this.incrementLootQuantity(itemModel.id, -1)

      amountReceived = sellPrice;
    }
    else {
      const sellPrice = (await this.CalculateSellPrice([itemModel]))[0].sellAll
      await this.usersService.incrementUserMoney(userId, sellPrice)
      await this.deleteLoot(itemModel.id)

      amountReceived = sellPrice
    }

    return {
      itemId: itemModel.id,
      amountReceived,
    };
  }


}
