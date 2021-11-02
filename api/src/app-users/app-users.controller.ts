import { Prisma } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from 'src/decorators';
import { AppUsersService } from './app-users.service';
import { AppUserResponse, CreateAppUserDto, UpdateAppUserDto } from './dto';

@Controller('app-users')
export class AppUsersController {
  constructor(private readonly appUsersService: AppUsersService) {}

  @Public()
  @Post()
  create(@Body() createAppUserDto: CreateAppUserDto) {
    return this.appUsersService.create(createAppUserDto);
  }
  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('sort') sort?: Prisma.AppUsersOrderByWithRelationInput,
    @Query('username') username?: string,
    @Query('email') email?: string,
    @Query('cityId') cityId?: string,
    @Query('fullName') fullName?: string,
  ) {
    const where = {
      username: { contains: username, mode: 'insensitive' },
      email: { contains: email, mode: 'insensitive' },
      cityId,
      fullName: { contains: fullName, mode: 'insensitive' },
    } as Prisma.AppUsersWhereInput;
    const totalCount = await this.appUsersService.count({ where });
    const allUsers = await this.appUsersService.findAll({
      take: limit || take ? Number(limit ?? take) : undefined,
      orderBy: sort,
      skip: skip && Number(skip),
      cursor: cursor && {
        id: cursor,
      },
    });
    return {
      total: totalCount,
      data: allUsers.map((user) => new AppUserResponse(user)),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const appUser = await this.appUsersService.findOne(id);
    return new AppUserResponse(appUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppUserDto: UpdateAppUserDto) {
    return this.appUsersService.update(id, updateAppUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appUsersService.remove(id);
  }

  @Get(':username/operations')
  async operationsFromUser(@Param('username') username: string) {
    const operations = await this.appUsersService.operationsFromUser(username);
    const totalCount = await this.appUsersService.countOperationsFromUser(
      username,
    );

    return {
      total: totalCount,
      data: operations,
    };
  }
}
