import { Module } from '@nestjs/common';
import { AuditRetraitsService } from './audit_retraits.service';
import { AuditRetraitsController } from './audit_retraits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditRetraitEntity } from './audit_retrait.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuditRetraitEntity]), DatabaseModule],
  providers: [AuditRetraitsService],
  controllers: [AuditRetraitsController],
})
export class AuditRetraitsModule {}
