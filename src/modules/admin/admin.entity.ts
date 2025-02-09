import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IAdmin } from './interfaces/admin.interface';

@Entity({ name: 'Admin' })
export class AdminEntity implements IAdmin {
  @PrimaryGeneratedColumn()
  adminId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
