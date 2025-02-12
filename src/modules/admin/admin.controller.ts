import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAdmin(@Request() req, @Body() admin: CreateAdminDTO) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Admins only');
    }
    return await this.adminService.createAdmin(admin);
  }
}
