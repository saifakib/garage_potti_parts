import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { VehicleTypesRepository } from './vehicle-types.repository';
import { CreateVehicleTypedDto, UpdateVehicleTypeDto } from '@/validationSchema/parts/vehicleTypes';

@Injectable()
export class VehicleTypesService {
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

  async update(uuid: string, payload: UpdateVehicleTypeDto) {
    try {
      return await this.vehicleTypesRepository.update({
        where: {
          uuid: uuid,
        },
        args: {
          name: payload.name ?? payload.name,
          image: payload.image ?? payload.image,
          description: payload.description ?? payload.description,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(payload: any) {
    try {
      const vType = await this.vehicleTypesRepository.findOne({
        where: {
          uuid: payload.uuid,
        },
        include: {
          parts: true,
        },
      });
      if (!vType) throw new NotFoundException('Not found!!');
      if (vType.parts.length > 0) throw new NotAcceptableException('Cannot delete this vehicle types!!');
      await this.vehicleTypesRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
  }
}
