import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { ModelsRepository } from './models.repository';
import { CreateModelDto, UpdateModelDto } from '@/validationSchema/parts/models';

@Injectable()
export class ModelsService {
  constructor(private readonly modelsRepository: ModelsRepository) {}

  async findOne(payload: any) {
    const response = await this.modelsRepository.findOne({
      where: { uuid: payload.uuid },
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
        where: { softDelete: false },
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
        description: payload.description ?? payload.description,
      };
      return await this.modelsRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, payload: UpdateModelDto) {
    try {
      return await this.modelsRepository.update({
        where: { uuid },
        args: {
          name: payload.name ?? payload.name,
          description: payload.description ?? payload.description,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(payload: any) {
    try {
      const model = await this.modelsRepository.findOne({
        where: { uuid: payload.uuid },
        include: {
          parts: true,
        },
      });
      if (!model) throw new NotFoundException('Not found!!');
      if (model.parts.length > 0) throw new NotAcceptableException('Cannot delete this model!!');
      await this.modelsRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
  }
}
