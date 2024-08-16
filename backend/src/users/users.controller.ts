import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() usersCreateDto: Prisma.UserCreateInput) {
    return this.usersService.create(usersCreateDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/inventory')
  @UseGuards(JwtAuthGuard)
  getInventory(@Request() req) {
    return this.usersService.getInventory(req.user.id);
  }



}
