import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRetraitDTO {
  @IsNotEmpty()
  @IsString()
  readonly numCheque: string;

  readonly numCompte: number;

  @IsNumber({}, { message: 'montant should be a number' })
  readonly montant: number;
}
