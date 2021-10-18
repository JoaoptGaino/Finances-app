import { Prisma } from '.prisma/client';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppUser } from 'src/decorators/app-user.decorator';
import { CreateOperationDto } from './dto/create-operation.dto';
import { OperationSnippetDto } from './dto/operation-snippet-dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  create(@Body() createOperationDto: CreateOperationDto, @AppUser() app_user) {
    return this.operationsService.create(createOperationDto, app_user.id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('sort') sort?: Prisma.OperationsOrderByWithAggregationInput,
    @Query('description') description?: string,
    @Query('amount') amount?: string,
    @Query('operationType') operationType?: string,
    @Query('date') date?: string,
    @Query('categoryId') categoryId?: string,
    @Query('username') username?: string,
  ) {
    const where = {
      description: { contains: description, mode: 'insensitive' },
      amount: amount && Number(amount),
      operationType: operationType && operationType,
      date: date && date,
      categoryId,
      AppUsers: {
        username: { contains: username, mode: 'insensitive' },
      },
    } as Prisma.OperationsWhereInput;
    const total = await this.operationsService.count({ where });
    const entity = await this.operationsService.findAll({
      take: limit || take ? Number(limit ?? take) : undefined,
      orderBy: sort,
      skip: skip && Number(skip),
      cursor: cursor && {
        id: cursor,
      },
    });
    return {
      total,
      entity,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.operationsService.findOne(id);
  // }

  @Get(':user')
  findOperationFromUser(@Param('user') user: string) {
    return this.operationsService.findAll({
      where: { AppUsers: { username: user } },
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.update(id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationsService.remove(id);
  }
}
