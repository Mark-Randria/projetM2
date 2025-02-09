import { Test, TestingModule } from '@nestjs/testing';
import { AuditRetraitsService } from './audit_retraits.service';

describe('AuditRetraitsService', () => {
  let service: AuditRetraitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditRetraitsService],
    }).compile();

    service = module.get<AuditRetraitsService>(AuditRetraitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
