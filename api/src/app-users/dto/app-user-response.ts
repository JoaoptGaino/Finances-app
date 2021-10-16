import { Exclude } from 'class-transformer';
import { CreateAppUserDto } from './create-app-user.dto';

export class AppUserResponse extends CreateAppUserDto {
  @Exclude()
  password: string;

  constructor(partial: Partial<AppUserResponse>) {
    super();
    Object.assign(this, partial);
  }
}
