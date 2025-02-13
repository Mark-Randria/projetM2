import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditRetraitEntity } from './audit_retrait.entity';
import { IAuditRetrait } from './interfaces/audit_retrait.interface';

@Injectable()
export class AuditRetraitsService {
  constructor(
    @InjectRepository(AuditRetraitEntity)
    private readonly auditRetraitRepository: Repository<AuditRetraitEntity>,
  ) {}

  async getAuditStats(): Promise<any> {
    return await this.auditRetraitRepository
      .createQueryBuilder('audit')
      .select('audit.typeAction', 'typeAction')
      .addSelect('COUNT(*)', 'nb')
      .groupBy('audit.typeAction')
      .getRawMany();
  }

  async getAudit(): Promise<IAuditRetrait[]> {
    return await this.auditRetraitRepository.find();
  }
}
