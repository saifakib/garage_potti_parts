import { Injectable } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { PartsRepository } from './parts.repository';
import { CreatePartsDto } from '@/validationSchema/parts/parts';
import { PARTS_STATUS, Prisma } from '@prisma/client';

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

  async create(payload: CreatePartsDto) {
    const createPartsInput: Prisma.PartsCreateInput = {
      name: payload.name,
      price: payload.price,
      qty: 0,
      status: PARTS_STATUS.INACTIVE,
      alert_qty: payload.alert_qty,
      category: payload.categoryUuid ? { connect: { uuid: payload.categoryUuid } } : undefined,
      partsCategoryOptionsEntities:
        payload.partsCategoryOptionsEntities.length > 0
          ? { connect: payload.modelUuids.map((uuid) => ({ uuid })) }
          : undefined,
      description: payload.description,
      brands: { connect: { uuid: payload.brandUuid } },
      models: payload.modelUuids?.length ? { connect: payload.modelUuids.map((uuid) => ({ uuid })) } : undefined,
      engines: payload.engineUuids?.length ? { connect: payload.engineUuids.map((uuid) => ({ uuid })) } : undefined,
      years: payload.yearUuids?.length ? { connect: payload.yearUuids.map((uuid) => ({ uuid })) } : undefined,
      vehicleTypes: payload.vehicleTypeUuids?.length
        ? { connect: payload.vehicleTypeUuids.map((uuid) => ({ uuid })) }
        : undefined,
    };
    return this.partsRepository.create(createPartsInput);
  }
}
