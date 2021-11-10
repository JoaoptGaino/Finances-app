import { Categories, Operations, OperationType } from '.prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Transform } from 'class-transformer';

export class OperationEntity {
  id: string;
  description: string;
  amount: Decimal | number;
  operationType: OperationType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;

  @Transform(({ value }) => ({
    name: value.name,
  }))
  Categories: Categories;

  constructor(operation: Operations, Categories: Categories) {
    this.id = operation.id;
    this.description = operation.description;
    this.amount = operation.amount.toNumber();
    this.operationType = operation.operationType;
    this.date = operation.date;
    this.createdAt = operation.createdAt;
    this.updatedAt = operation.updatedAt;
    this.Categories = Categories;
  }
}
