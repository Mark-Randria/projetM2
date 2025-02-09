import { Module } from '@nestjs/common';
import { AuditRetraitsService } from './audit_retraits.service';
import { AuditRetraitsController } from './audit_retraits.controller';

@Module({
  providers: [AuditRetraitsService],
  controllers: [AuditRetraitsController],
})
export class AuditRetraitsModule {}
