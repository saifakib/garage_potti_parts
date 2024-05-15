import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { EnginesRepository } from './Engines.repository';
import { CreateEngineDto } from '@/validationSchema/parts/Engines';

@Injectable()
export class EnginesService {
  constructor(private readonly enginesRepository: EnginesRepository) {}

  async findOne(payload: any) {
    const response = await this.enginesRepository.findOne({
      where: {
        uuid: payload.uuid,
      },
      include: {
        parts: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Engine not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.enginesRepository.findAll({
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

  async create(payload: CreateEngineDto) {
    try {
      const createData = {
        name: payload.name,
        image: payload.image,
        description: payload.description ?? payload.description,
      };
      return await this.enginesRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }
}
