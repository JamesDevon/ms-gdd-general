import {Controller, Request, Post, UseGuards, Get} from '@nestjs/common';
import {AuthService} from "./auth/auth.service";
import {AuthResponse} from "./models/auth/auth.response";
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) : Promise<AuthResponse> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  test(): string {
    return "Hello world!";
  }

}
