import { AppUsers } from '.prisma/client';
import { CreateOperationDto } from '../dto/create-operation.dto';
export class Operation extends CreateOperationDto {
  AppUser: AppUsers;
}
