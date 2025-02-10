import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditRetraitEntity } from './audit_retrait.entity';

@Injectable()
export class AuditRetraitsService {
  constructor(
    @InjectRepository(AuditRetraitEntity)
    private readonly auditRetraitRepository: Repository<AuditRetraitEntity>,
  ) {}

  async getAuditStats() {
    return null;
  }
}
