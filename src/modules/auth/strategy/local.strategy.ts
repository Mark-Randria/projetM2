import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class ClientLocalStrategy extends PassportStrategy(
  Strategy,
  'client-local',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'numCompte', passwordField: 'password' });
  }

  async validate(numCompte: number, password: string): Promise<any> {
    const numCompteNumber = Number(numCompte);
    if (isNaN(numCompteNumber)) {
      throw new BadRequestException('numCompte must be a number');
    }

    const client = await this.authService.validateClient(numCompte, password);
    if (!client) throw new UnauthorizedException('Invalid credentials');
    return client;
  }
}
