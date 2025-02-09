import { Test, TestingModule } from '@nestjs/testing';
import { AuditRetraitsController } from './audit_retraits.controller';

describe('AuditRetraitsController', () => {
  let controller: AuditRetraitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditRetraitsController],
    }).compile();

    controller = module.get<AuditRetraitsController>(AuditRetraitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
