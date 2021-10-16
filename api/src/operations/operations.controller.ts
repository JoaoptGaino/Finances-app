import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Prisma } from '.prisma/client';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationsService.create(createOperationDto);
  }

  @Get()
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
    @Query('appUserId') appUserId?: string,
    //@Query('') obj?: string,
  ) {
    const where = {
      description: { contains: description, mode: 'insensitive' },
      amount: amount && Number(amount),
      operationType: operationType && operationType,
      date: date && date,
      categoryId,
      appUserId,
    } as Prisma.OperationsWhereInput;
    // const objDesirialized = JSON.parse(JSON.stringify(obj));
    // console.log(objDesirialized);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationsService.findOne(id);
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
