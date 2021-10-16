import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/services/password.service';
import { PrismaService } from 'src/prisma.service';
import { transformerUnique } from 'src/utils/transformers';
import { FindAppUser } from './context/types';
import { CreateAppUserDto, UpdateAppUserDto } from './dto';

@Injectable()
export class AppUsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}
  async create(createAppUserDto: CreateAppUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      createAppUserDto.password,
    );
    try {
      const entity = await this.prisma.appUsers.create({
        data: { ...createAppUserDto, password: hashedPassword },
      });
      return entity;
    } catch (err) {
      throw new BadRequestException({
        message: 'Error on sign-up',
        error: err.message,
      });
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppUsersWhereUniqueInput;
    where?: Prisma.AppUsersWhereInput;
    orderBy?: Prisma.AppUsersOrderByWithRelationInput;
  }) {
    const { cursor, orderBy, skip, take, where } = params;
    const entities = await this.prisma.appUsers.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return entities;
  }
  count = this.prisma.appUsers.count;
  async findOne(id: string) {
    const entity = await this.prisma.appUsers.findUnique({ where: { id } });

    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async update(
    id: string,
    updateAppUserDto: UpdateAppUserDto,
  ): Promise<FindAppUser> {
    try {
      const updated = await this.prisma.appUsers.update({
        where: { id },
        data: updateAppUserDto,
      });
      return transformerUnique(updated);
    } catch (err) {
      throw new BadRequestException({
        error: err,
      });
    }
  }

  async remove(id: string) {
    try {
      const removed = await this.prisma.appUsers.delete({ where: { id } });
      return transformerUnique(removed);
    } catch (err) {
      throw new BadRequestException({
        error: err,
      });
    }
  }

  async findByEmail(email: string) {
    const entity = await this.prisma.appUsers.findFirst({ where: { email } });

    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }
}
