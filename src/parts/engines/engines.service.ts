import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { EnginesRepository } from './engines.repository';
import { CreateEngineDto, UpdateEngineDto } from '@/validationSchema/parts/engines';

@Injectable()
export class EnginesService {
  constructor(private readonly enginesRepository: EnginesRepository) {}

  async findOne(payload: any) {
    const response = await this.enginesRepository.findOne({
      where: { uuid: payload.uuid },
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

  async update(uuid: string, payload: UpdateEngineDto) {
    try {
      return await this.enginesRepository.update({
        where: { uuid },
        args: {
          name: payload.name,
          image: payload.image,
          description: payload.description ?? payload.description,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(payload: any) {
    try {
      const engine = await this.enginesRepository.findOne({
        where: { uuid: payload.uuid },
        include: {
          parts: true,
        },
      });
      if (!engine) throw new NotFoundException('Not found!!');
      if (engine.parts.length > 0) throw new NotAcceptableException('Cannot delete this engine!!');
      await this.enginesRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
  }
}
