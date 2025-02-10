import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { IClient } from './interfaces/client.interface';
import { CreateClientDTO } from './dto/create-client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findOneClient(numCompte: number): Promise<IClient> {
    return await this.clientRepository.findOne({ where: { numCompte } });
  }

  async createClient(client: CreateClientDTO): Promise<IClient> {
    const { password } = client;
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedClient = this.clientRepository.create({
      ...client,
      password: hashedPassword,
    });
    const returnedClient = await this.clientRepository.save(savedClient);
    return returnedClient;
  }
}
