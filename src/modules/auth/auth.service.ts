import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients/clients.service';
import * as bcrypt from 'bcrypt';
import { IClient } from '../clients/interfaces/client.interface';
import { AdminService } from '../admin/admin.service';
import { IAdmin } from '../admin/interfaces/admin.interface';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private adminsService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateClient(numCompte: number, pass: string): Promise<any> {
    const user = await this.clientsService.findOneClient(numCompte);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateAdmin(email: string, pass: string): Promise<any> {
    const user = await this.adminsService.findOneAdmin(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IClient | IAdmin) {
    const payload =
      (user as IClient).numCompte !== undefined
        ? {
            numCompte: (user as IClient).numCompte,
            nomClient: (user as IClient).nomClient,
            role: 'client',
          }
        : { email: (user as IAdmin).email, role: 'admin' };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
