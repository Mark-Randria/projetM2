export interface IJwtPayload {
  numCompte?: number;
  nomClient?: string;

  email?: string;

  role: 'admin' | 'client';
}
