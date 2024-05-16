import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { VehicleTypesRepository } from './vehicle-types.repository';
import { CreateVehicleTypedDto } from '@/validationSchema/parts/vehicleTypes';

@Injectable()
export class BrandsService {
  constructor(private readonly vehicleTypesRepository: VehicleTypesRepository) {}

  async findOne(payload: any) {
    const response = await this.vehicleTypesRepository.findOne({
      where: {
        uuid: payload.uuid,
      },
      include: {
        parts: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Vehicle type not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.vehicleTypesRepository.findAll({
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

  async create(payload: CreateVehicleTypedDto) {
    try {
      const createData = {
        name: payload.name,
        image: payload.image,
        description: payload.description ?? payload.description,
      };
      return await this.vehicleTypesRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }
}
