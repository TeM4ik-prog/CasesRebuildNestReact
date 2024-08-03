import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2'
import { JwtService } from "@nestjs/jwt"
import { IUser } from 'src/types/types';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, password)

    if (user && passwordIsMatch) {
      return user
    }
    throw new UnauthorizedException(`Invalid password: ${password}`)
  }

  async login(user: IUser) {
    const { id, email } = user

    return {
      id,
      email,
      token: this.jwtService.sign({ id, email }),
    }
  }





}
