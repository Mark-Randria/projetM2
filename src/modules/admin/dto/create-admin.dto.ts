import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAdminDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  readonly password: string;
}
