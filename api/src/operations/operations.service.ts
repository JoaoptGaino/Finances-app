import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { Operation } from './entities/operation.entity';
import { UpdateOperationDto } from './dto/update-operation.dto';

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOperationDto: CreateOperationDto) {
    try {
      const entity = await this.prisma.operations.create({
        data: createOperationDto,
      });
      return new Operation(entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OperationsWhereUniqueInput;
    where?: Prisma.OperationsWhereInput;
    orderBy?: Prisma.OperationsOrderByWithRelationInput;
  }) {
    const { cursor, orderBy, skip, take, where } = params;
    const entities = await this.prisma.operations.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    const entity = entities.map((entity) => new Operation(entity));

    const totalIncome = entity
      .filter((item) => item.operationType === 'INCOME')
      .reduce((sum, current) => sum + Number(current.amount), 0);
    const totalExpenses = entity
      .filter((item) => item.operationType === 'EXPENSES')
      .reduce((sum, current) => sum + Number(current.amount), 0);
    const totalAmount = entity.reduce(
      (sum, current) => sum + Number(current.amount),
      0,
    );
    return {
      entities: entity,
      totalAmount,
      totalIncome,
      totalExpenses,
    };
  }

  count = this.prisma.operations.count;

  async findOne(id: string) {
    const entity = await this.prisma.operations.findUnique({
      where: { id },
      rejectOnNotFound: () => new NotFoundException(),
    });
    return entity;
  }

  async update(id: string, updateOperationDto: UpdateOperationDto) {
    try {
      const updatedEntity = await this.prisma.operations.update({
        where: { id },
        data: updateOperationDto,
      });
      return updatedEntity;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      const deletedEntity = await this.prisma.operations.delete({
        where: { id },
      });
      return deletedEntity;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
