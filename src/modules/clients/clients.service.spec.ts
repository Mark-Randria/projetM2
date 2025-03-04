import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import * as bcrypt from 'bcrypt';
import { IClient } from './interfaces/client.interface';
import { CreateClientDTO } from './dto/create-client.dto';

const mockClientRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('ClientsService', () => {
  let service: ClientsService;
  let clientRepository: ReturnType<typeof mockClientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(ClientEntity),
          useFactory: mockClientRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    clientRepository = module.get(getRepositoryToken(ClientEntity));
  });

  describe('findOneClient', () => {
    it('should return a client given a numCompte', async () => {
      const client: Partial<IClient> = {
        numCompte: 1,
        nomClient: 'Test Client',
      };
      clientRepository.findOne.mockResolvedValue(client);

      const result = await service.findOneClient(1);

      expect(clientRepository.findOne).toHaveBeenCalledWith({
        where: { numCompte: 1 },
      });
      expect(result).toEqual(client);
    });
  });

  describe('createClient', () => {
    it('should hash the password and save the client', async () => {
      const createClientDTO: CreateClientDTO = {
        password: 'myPassword',
        email: 'email@test.com',
        nomClient: 'Test Client',
        solde: 0,
      };
      const hashedPassword = 'hashedPassword';

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

      const createdClient: Partial<IClient> = {
        ...createClientDTO,
        password: hashedPassword,
      };
      const savedClient: Partial<IClient> = { numCompte: 1, ...createdClient };

      clientRepository.create.mockReturnValue(createdClient);
      clientRepository.save.mockResolvedValue(savedClient);

      const result = await service.createClient(createClientDTO);

      expect(bcrypt.hash).toHaveBeenCalledWith('myPassword', 10);
      expect(clientRepository.create).toHaveBeenCalledWith({
        ...createClientDTO,
        password: hashedPassword,
      });
      expect(clientRepository.save).toHaveBeenCalledWith(createdClient);
      expect(result).toEqual(savedClient);
    });
  });
});
