import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { TelegramAuthGuard } from './guards/telegram-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('telegram-login')
  @UseGuards(TelegramAuthGuard)
  async telegramLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Get('profile')
  // @UseGuards(JwtAuthGuard)
  // getProfile(@Request() req) {
  //   return req.user;
  // }



}
