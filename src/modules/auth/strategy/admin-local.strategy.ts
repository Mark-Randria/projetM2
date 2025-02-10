import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(numCompte: number, password: string): Promise<any> {
    const client = await this.authService.validateClient(numCompte, password);
    if (!client) throw new UnauthorizedException('Invalid credentials');
    return client;
  }
}
