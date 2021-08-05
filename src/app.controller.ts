import { Body, Controller, Get, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { LoginUserDto } from './login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe)
 @Post('auth/login')
  async login(@Request() req,@Body() body:LoginUserDto) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

@Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
  }
  
}
