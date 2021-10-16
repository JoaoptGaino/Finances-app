import { OperationType } from '.prisma/client';
import { Decimal } from '@prisma/client/runtime';
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

  @IsNotEmpty()
  @IsUUID('4')
  appUserId: string;
}
