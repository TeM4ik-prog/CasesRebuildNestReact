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
  async create(usersCreateDto: Prisma.UsersCreateInput) {
    let existingUser = await this.databaseService.users.findUnique({
      where: { email: usersCreateDto.email },
    })

    if (existingUser) throw new BadRequestException(`Employee ${usersCreateDto.email} already exists`);

    const user = await this.databaseService.users.create({
      data: {
        ...usersCreateDto,
        password: await argon2.hash(usersCreateDto.password)
      }
    });
    return { user }
  }

  async findOne(email: string) {
    const user = await this.databaseService.users.findUnique({
      where: { email },
    })

    if (!user) throw new NotFoundException(`User with email ${email} not found`);
    return user
  }
  
  async findAll() {
    return await this.databaseService.users.findMany();
  }
}
