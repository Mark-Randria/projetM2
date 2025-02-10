import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientAuthGuard } from './strategy/client-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(ClientAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    // req.user is set by the LocalStrategy after successful authentication
    return this.authService.login(req.user);
  }
}
