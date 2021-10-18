import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { OperationsService } from './operations/operations.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly operationsService: OperationsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get(':username/operations')
  async getOperationsFromUser(@Param('username') username: string) {
    const operationsFromUser = await this.operationsService.findAll({
      where: { AppUsers: { username } },
    });
    return operationsFromUser;
  }
}
