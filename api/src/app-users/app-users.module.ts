import { Module } from '@nestjs/common';
import { PasswordService } from 'src/auth/services/password.service';
import { OperationsModule } from 'src/operations/operations.module';
import { PrismaService } from 'src/prisma.service';
import { AppUsersController } from './app-users.controller';
import { AppUsersService } from './app-users.service';

@Module({
  imports: [OperationsModule],
  controllers: [AppUsersController],
  providers: [AppUsersService, PasswordService, PrismaService],
  exports: [AppUsersService],
})
export class AppUsersModule {}
