import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { IAdmin } from './interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async findOneAdmin(email: string): Promise<IAdmin> {
    return await this.adminRepository.findOne({ where: { email } });
  }
}
