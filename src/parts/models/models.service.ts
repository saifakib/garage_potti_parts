import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { ModelsRepository } from './models.repository';
import { CreateModelDto } from '@/validationSchema/models';

@Injectable()
export class ModelsService {
  constructor(private readonly modelsRepository: ModelsRepository) {}

  async findOne(payload: any) {
    const response = await this.modelsRepository.findOne({
      where: {
        uuid: payload.uuid,
      },
      include: {
        parts: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Model not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.modelsRepository.findAll({
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

  async create(payload: CreateModelDto) {
    try {
      const createData = {
        name: payload.name,
        image: payload.image,
      };
      return await this.modelsRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }
}
