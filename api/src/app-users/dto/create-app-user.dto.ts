import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAppUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsString()
  @MinLength(6)
  password: string;
}
