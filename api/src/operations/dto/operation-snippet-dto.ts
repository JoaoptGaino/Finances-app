import { AppUsers } from '.prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Transform } from 'class-transformer';
import { CreateOperationDto } from './create-operation.dto';

export class OperationSnippetDto extends CreateOperationDto {
  @Transform(({ value }) => Number(value))
  amount: Decimal | number;

  constructor(partial: Partial<OperationSnippetDto> = {}) {
    super();
    Object.assign(this, partial);
  }
}
