import { Prisma } from '.prisma/client';
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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('sort') sort?: Prisma.CategoriesOrderByWithAggregationInput,
    @Query('name') name?: string,
  ) {
    const where = {
      name: { contains: name, mode: 'insensitive' },
    } as Prisma.CategoriesWhereInput;

    const total = await this.categoriesService.count({ where });
    const entity = await this.categoriesService.findAll({
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
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
