import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { YearsRepository } from './years.repository';
import { YearDto } from '@/validationSchema/common/year.schema';

@Injectable()
export class YearsService {
  constructor(private readonly yearsRepository: YearsRepository) {}

  async findOne(payload: any) {
    const response = await this.yearsRepository.findOne({
      where: { uuid: payload.uuid },
      include: {
        parts: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Year not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.yearsRepository.findAll({
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

  async create(payload: YearDto) {
    try {
      const createData = {
        year: payload.year,
      };
      return await this.yearsRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, payload: YearDto) {
    try {
      return await this.yearsRepository.update({
        where: { uuid },
        args: {
          year: payload.year ?? payload.year,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(payload: any) {
    try {
      const year = await this.yearsRepository.findOne({
        where: { uuid: payload.uuid },
        include: {
          parts: true,
        },
      });
      if (!year) throw new NotFoundException('Not found!!');
      if (year.parts.length > 0) throw new NotAcceptableException('Cannot delete this year!!');
      await this.yearsRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
  }
}
