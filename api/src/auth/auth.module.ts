import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppUsersModule } from 'src/app-users/app-users.module';
import { AppUsersService } from 'src/app-users/app-users.service';
import { PrismaService } from '../prisma.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy, LocalStrategy } from './strategies';
import { jwtConstants } from './constants';
import { OperationsModule } from 'src/operations/operations.module';
@Module({
  imports: [
    AppUsersModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    OperationsModule,
  ],
  providers: [
    AuthService,
    PrismaService,
    PasswordService,
    AppUsersService,
    JwtModule,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
