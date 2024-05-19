import { Injectable } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { PartsRepository } from './parts.repository';

@Injectable()
export class PartsService {
  constructor(private readonly partsRepository: PartsRepository) {}

  async findAll(payload: FindAllDto) {
    try {
      return await this.partsRepository.findAll({
        where: {},
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page) || 1,
        perPage: Number(payload.limit),
      });
    } catch (err) {
      throw err;
    }
  }
}
