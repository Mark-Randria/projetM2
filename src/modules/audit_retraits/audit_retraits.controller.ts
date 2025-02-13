import {
  Controller,
  ForbiddenException,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuditRetraitsService } from './audit_retraits.service';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('audit-retraits')
export class AuditRetraitsController {
  constructor(private auditRetraitsService: AuditRetraitsService) {}

  @Get('stats')
  async getAuditStats(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Admins only');
    }
    return await this.auditRetraitsService.getAuditStats();
  }

  @Get('all')
  async getAudit(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Admins only');
    }
    return await this.auditRetraitsService.getAudit();
  }
}
