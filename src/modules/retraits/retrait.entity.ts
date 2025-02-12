import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IRetrait } from './interfaces/retrait.interface';
import { ClientEntity } from '../clients/client.entity';

@Entity({ name: 'Retrait' })
export class RetraitEntity implements IRetrait {
  @PrimaryGeneratedColumn()
  numRetrait: number;

  @Column()
  numCheque: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  montant: number;

  @ManyToOne(() => ClientEntity, (client) => client.numCompte)
  client: ClientEntity;
}
