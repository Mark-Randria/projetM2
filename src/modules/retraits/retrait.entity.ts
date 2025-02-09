import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IRetrait } from './interfaces/retrait.interface';

@Entity({ name: 'Retrait' })
export class RetraitEntity implements IRetrait {
  @PrimaryGeneratedColumn()
  numRetrait: number;

  @Column()
  numCheque: number;

  @Column()
  numCompte: number;

  @Column()
  montant: number;
}
