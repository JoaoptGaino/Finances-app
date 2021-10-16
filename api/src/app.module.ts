import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppUsersModule } from './app-users/app-users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [AppUsersModule, AuthModule, CategoriesModule, OperationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
