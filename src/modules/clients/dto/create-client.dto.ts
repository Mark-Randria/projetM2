import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateClientDTO {
  @IsNotEmpty()
  @IsString()
  readonly nomClient: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'solde should be a number' })
  readonly solde: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
