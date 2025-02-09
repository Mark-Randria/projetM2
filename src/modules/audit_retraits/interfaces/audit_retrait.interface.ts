import { IClient } from 'src/modules/clients/interfaces/client.interface';

export interface IAuditRetrait {
  id: number;
  typeAction: string; // ajout, suppression, modif
  dateDeMAJ: Date;
  numRetrait: number;
  numCompte: number;
  nomClient: string;
  montantAncien: number;
  montantNouveau: number;
  utilisateur: IClient;
}
