import { Test, TestingModule } from '@nestjs/testing';
import { RetraitsService } from './retraits.service';
import { Repository } from 'typeorm';
import { RetraitEntity } from './retrait.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRetraitRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
});

describe('RetraitsService', () => {
  let service: RetraitsService;
  let retraitRepository: Partial<Repository<RetraitEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RetraitsService,
        {
          provide: getRepositoryToken(RetraitEntity),
          useFactory: mockRetraitRepository,
        },
      ],
    }).compile();

    service = module.get<RetraitsService>(RetraitsService);
    retraitRepository = module.get<Repository<RetraitEntity>>(
      getRepositoryToken(RetraitEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(retraitRepository).toBeDefined();
  });
});
