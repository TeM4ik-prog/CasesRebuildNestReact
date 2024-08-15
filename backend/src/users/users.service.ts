import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) { }

  async create(usersCreateDto: Prisma.UserCreateInput) {
    let existingUser = await this.databaseService.user.findUnique({
      where: { telegramId: usersCreateDto.telegramId },
    })

    if (existingUser) throw new BadRequestException(`User ${usersCreateDto.username} already exists`);

    const user = await this.databaseService.user.create({
      data: {
        ...usersCreateDto,
        password: await argon2.hash(usersCreateDto.password)
      }
    });

    let token = this.jwtService.sign({ id: user.id, telegramId: user.telegramId })

    return { user }
  }

  async findOne(telegramId: string) {
    const user = await this.databaseService.user.findUnique({
      where: { telegramId },
    })

    if (!user) throw new NotFoundException(`User with telegramId ${telegramId} not found`);
    return user
  }

  async findAll() {
    return await this.databaseService.user.findMany();
  }
}
