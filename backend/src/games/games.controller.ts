import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GamesService } from './games.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IBoostName } from 'src/types/types';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Get("/BombDefuser/getDataBoosts")
  @UseGuards(JwtAuthGuard)
  getBoosts(@Request() req) {
    return this.gamesService.getBombDefuserBoosts(req.user.id);
  }


  @Post("/BombDefuser/addBoost")
  @UseGuards(JwtAuthGuard)
  addBoost(@Body() boostName: IBoostName, @Request() req) {
    return this.gamesService.addBoost(boostName, req.user.id);
  }





}
