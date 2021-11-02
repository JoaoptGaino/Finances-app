import { OperationType } from '.prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Exclude, Expose, Transform } from 'class-transformer';

export class Operation {
  description: string;

  operationType: OperationType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;

  @Transform((obj) => String(obj.value))
  amount: Decimal | number;

  @Exclude()
  categoryId: string;

  @Exclude()
  appUserId: string;

  constructor(partial: Partial<Operation>) {
    Object.assign(this, partial);
  }
}
