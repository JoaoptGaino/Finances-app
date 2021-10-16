import { IsEmail, IsString, IsUUID } from 'class-validator';

export class AuthenticatedAppUserDto {
  @IsUUID()
  id: string;
  
  @IsEmail()
  email: string;

  @IsString()
  username: string;
}
