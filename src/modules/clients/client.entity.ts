import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IClient } from './interfaces/client.interface';
import { RetraitEntity } from '../retraits/retrait.entity';

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

  @OneToMany(() => RetraitEntity, (retrait) => retrait.client)
  retraits: RetraitEntity[];
}
