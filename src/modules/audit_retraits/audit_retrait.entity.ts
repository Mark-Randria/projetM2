import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAuditRetrait } from './interfaces/audit_retrait.interface';
import { ClientEntity } from '../clients/client.entity';

@Entity({ name: 'Audit_Retrait' })
export class AuditRetraitEntity implements IAuditRetrait {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeAction: string;

  @CreateDateColumn()
  dateDeMAJ: Date;

  @Column()
  numRetrait: number;

  @Column()
  numCompte: number;

  @Column()
  nomClient: string;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  montantAncien: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  montantNouveau: number;

  @ManyToOne(() => ClientEntity, (utilisateur) => utilisateur.numCompte)
  utilisateur: ClientEntity;
}
