import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from '@/validationSchema/parts/category';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findOne(payload: any) {
    const response = await this.categoryRepository.findOne({
      uuid: payload.uuid,
    });
    if (!response) {
      throw new NotFoundException('Category not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.categoryRepository.findAll({
        where: {},
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page),
        perPage: Number(payload.limit),
        include: {
          PartsCategoryOptions: {
            include: {
              PartsCategoryOptionsEntity: true,
            },
          },
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async create(payload: CreateCategoryDto) {
    try {
      const createData = {
        name: payload.name,
        image: payload.image,
      };
      return await this.categoryRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }
}
