import { OperationType } from '.prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { classToPlain, Exclude } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { getArrayFromPrismaEnum } from 'src/utils/validation';

export class CreateOperationDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: Decimal | number;

  @IsNotEmpty()
  @IsIn(getArrayFromPrismaEnum(OperationType))
  operationType: OperationType;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsUUID('4')
  categoryId: string;

  // @Exclude()
  // @IsNotEmpty()
  // @IsUUID('4')
  // appUserId: string;

  toJSON() {
    return classToPlain(this);
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}
