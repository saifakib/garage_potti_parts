import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { BrandsRepository } from './brands.repository';
import { CreateBrandDto } from '@/validationSchema/brands';

@Injectable()
export class BrandsService {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  async findOne(payload: any) {
    const response = await this.brandsRepository.findOne({
      where: {
        uuid: payload.uuid,
      },
      include: {
        parts: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Brand not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.brandsRepository.findAll({
        where: {},
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page),
        perPage: Number(payload.limit),
        include: {
          parts: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async create(payload: CreateBrandDto) {
    try {
      const createData = {
        name: payload.name,
        image: payload.image,
      };
      return await this.brandsRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }
}
