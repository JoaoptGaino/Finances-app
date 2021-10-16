import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppUsersService } from 'src/app-users/app-users.service';
import { IAuthenticatedUser } from '../context/types';
import { AuthenticatedAppUserDto } from '../dto/authenticated-app-user-dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly appUserService: AppUsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedAppUserDto> {
    const user = await this.appUserService.findByEmail(email);
    const isPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (user && isPassword) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }
    return null;
  }
  async login(user: IAuthenticatedUser) {
    const payload = {
      email: user.email,
      username: user.username,
      sub: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
      user: {
        username: user.username,
        email: user.email,
      },
    };
  }
  async verifyJwt(token: string) {
    const payload = await this.jwtService.verify(token);

    return {
      user: {
        username: payload.username,
        email: payload.email,
      },
    };
  }
}
