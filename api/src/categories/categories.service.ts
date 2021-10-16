import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const entity = await this.prisma.categories.create({
        data: createCategoryDto,
      });
      return entity;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoriesWhereUniqueInput;
    where?: Prisma.CategoriesWhereInput;
    orderBy?: Prisma.CategoriesOrderByWithRelationInput;
  }) {
    const { cursor, orderBy, skip, take, where } = params;
    const entities = await this.prisma.categories.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return entities;
  }
  count = this.prisma.categories.count;
  async findOne(id: string) {
    const entity = await this.prisma.categories.findUnique({
      where: { id },
      rejectOnNotFound: () => new NotFoundException(),
    });
    return entity;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedEntity = await this.prisma.categories.update({
        where: { id },
        data: updateCategoryDto,
      });
      return updatedEntity;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      const deletedEntity = await this.prisma.categories.delete({
        where: { id },
      });
      return deletedEntity;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
