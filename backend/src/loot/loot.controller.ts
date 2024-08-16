import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LootService } from './loot.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ISellData } from 'src/types/types';


@Controller('loot')
export class LootController {
  constructor(
    private readonly lootService: LootService,

  ) { }


  @Post('/open')
  @UseGuards(JwtAuthGuard)
  create(@Body() openPrice: { openPrice: number }, @Request() req) {
    console.log(openPrice, req.user.id)
    return this.lootService.openBox(openPrice.openPrice, req.user.id);
  }


  @Post('/sell')
  @UseGuards(JwtAuthGuard)
  sell(@Body() sellData, @Request() req) {
    return this.lootService.sellLoot(sellData.sellData, req.user.id);
  }


  // @Get()
  // findAll() {
  //   return this.lootService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lootService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLootDto: UpdateLootDto) {
  //   return this.lootService.update(+id, updateLootDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lootService.remove(+id);
  // }
}
