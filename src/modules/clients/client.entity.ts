import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IClient } from './interfaces/client.interface';

@Entity({ name: 'Client' })
export class ClientEntity implements IClient {
  @PrimaryGeneratedColumn()
  numCompte: number;

  @Column({ length: 128 })
  nomClient: string;

  @Column('decimal', { precision: 15, scale: 2 })
  solde: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
