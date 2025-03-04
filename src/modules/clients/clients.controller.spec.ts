import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

const mockClientService = () => ({});

describe('ClientsController', () => {
  let controller: ClientsController;
  let clientService: ReturnType<typeof mockClientService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useFactory: mockClientService,
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    clientService = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(clientService).toBeDefined();
  });
});
