import { Test, TestingModule } from '@nestjs/testing';
import { RetraitsController } from './retraits.controller';
import { RetraitsService } from './retraits.service';

const mockRetraitsService = () => ({});

describe('RetraitsController', () => {
  let controller: RetraitsController;
  let retraitsService: ReturnType<typeof mockRetraitsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetraitsController],
      providers: [
        {
          provide: RetraitsService,
          useFactory: mockRetraitsService,
        },
      ],
    }).compile();

    controller = module.get<RetraitsController>(RetraitsController);
    retraitsService = module.get<RetraitsService>(RetraitsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(retraitsService).toBeDefined();
  });
});
