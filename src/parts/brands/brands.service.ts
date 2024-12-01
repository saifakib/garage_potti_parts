import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { BrandsRepository } from './brands.repository';
import { CreateBrandDto, UpdateBrandDto } from '@/validationSchema/parts/brands';

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
        where: {
          softDelete: false,
        },
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page) || 1,
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

  async update(uuid: string, payload: UpdateBrandDto) {
    try {
      return await this.brandsRepository.update({
        where: {
          uuid: uuid,
        },
        args: {
          name: payload.name,
          image: payload.image,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(payload: any) {
    try {
      const brand = await this.brandsRepository.findOne({
        where: {
          uuid: payload.uuid,
        },
        include: {
          parts: true,
        },
      });
      if (!brand) throw new NotFoundException('Not found!!');
      if (brand.parts.length > 0) throw new NotAcceptableException('Cannot delete this brand!!');
      await this.brandsRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
  }
}
