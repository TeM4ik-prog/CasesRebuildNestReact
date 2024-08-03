import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() usersCreateDto: Prisma.UsersCreateInput) {
    return this.usersService.create(usersCreateDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }


}
