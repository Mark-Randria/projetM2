import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class LoginClientDTO {
  @IsNotEmpty()
  @IsNumber({}, { message: 'numCompte should be a number' })
  readonly numCompte: number;

  @IsNotEmpty()
  @IsString({ message: 'Password should be a string' })
  @MinLength(6)
  readonly password: string;
}
