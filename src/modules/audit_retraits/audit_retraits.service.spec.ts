import { Test, TestingModule } from '@nestjs/testing';
import { AuditRetraitsService } from './audit_retraits.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditRetraitEntity } from './audit_retrait.entity';

const mockAuditRetraitRepository = () => ({});

describe('AuditRetraitsService', () => {
  let service: AuditRetraitsService;
  let auditRetraitRepository: Partial<Repository<AuditRetraitEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditRetraitsService,
        {
          provide: getRepositoryToken(AuditRetraitEntity),
          useFactory: mockAuditRetraitRepository,
        },
      ],
    }).compile();

    service = module.get<AuditRetraitsService>(AuditRetraitsService);
    auditRetraitRepository = module.get<Repository<AuditRetraitEntity>>(
      getRepositoryToken(AuditRetraitEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(auditRetraitRepository).toBeDefined();
  });
});
