import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { IAdmin } from './interfaces/admin.interface';
import { CreateAdminDTO } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async findOneAdmin(email: string): Promise<IAdmin> {
    return await this.adminRepository.findOne({ where: { email } });
  }

  async createAdmin(admin: CreateAdminDTO): Promise<IAdmin> {
    const { password } = admin;
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedAdmin = this.adminRepository.create({
      ...admin,
      password: hashedPassword,
    });
    const returnedAdmin = await this.adminRepository.save(savedAdmin);
    return returnedAdmin;
  }
}
