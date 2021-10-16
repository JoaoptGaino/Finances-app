import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators';
import { LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/verify-jwt')
  async verifyJwt(@Body() data) {
    return await this.authService.verifyJwt(data.token);
  }
}
