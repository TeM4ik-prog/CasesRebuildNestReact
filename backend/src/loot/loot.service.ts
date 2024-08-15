import { Injectable } from '@nestjs/common';
import { LootCreateObj } from './box_config/box_loot';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LootService {
  constructor(private readonly databaseService: DatabaseService) { }

  async createLootRareOnInit(): Promise<void> {
    for (const rareName in LootCreateObj) {
      console.log(rareName);

      try {
        let categoryRare = await this.databaseService.categoryRare.findFirst({
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


  async openBox(openPrice: number) {

  }


}

