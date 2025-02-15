import { IClient } from 'src/modules/clients/interfaces/client.interface';

export interface IRetrait {
  numRetrait: number;
  numCheque: string;
  montant: number;
  client?: Partial<IClient>;
}
