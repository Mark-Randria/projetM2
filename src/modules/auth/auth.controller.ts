import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientAuthGuard } from './strategy/client-auth.guard';
import { AdminAuthGuard } from './strategy/admin-auth.guard';
import { LoginClientDTO } from '../clients/dto/login-client.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(ClientAuthGuard)
  @Post('client/login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async clientLogin(@Request() req, @Body() loginClientDTO: LoginClientDTO) {
    return this.authService.login(req.user);
  }

  @UseGuards(AdminAuthGuard)
  @Post('admin/login')
  async adminLogin(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
