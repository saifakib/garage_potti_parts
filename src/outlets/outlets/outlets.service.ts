import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { OutletRepository } from './outlet.repository';
import { FindAllDto } from '@/validationSchema/common/findAll.schema';
import { CreateOutletDto, UpdateOutletDto } from '@/validationSchema/outlets';
import { Prisma } from '@prisma/client';

@Injectable()
export class OutletService {
  constructor(private readonly outletRepository: OutletRepository) {}

  async findOne(payload: any) {
    const response = await this.outletRepository.findOne({
      where: {
        uuid: payload.uuid,
      },
      include: {
        employees: true,
      },
    });
    if (!response) {
      throw new NotFoundException('Brand not found!!');
    }
    return response;
  }

  async findAll(payload: FindAllDto) {
    try {
      return await this.outletRepository.findAll({
        where: {
          softDelete: false,
        },
        orderBy: {
          id: payload.sort,
        },
        page: Number(payload.page) || 1,
        perPage: Number(payload.limit),
        include: {
          employees: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async create(payload: CreateOutletDto) {
    try {
      const createData: Prisma.OutletsCreateInput = {
        name: payload.name,
        address: payload.address ?? undefined,
        description: payload.description ?? undefined,
        image: payload.image ?? undefined,
      };
      return await this.outletRepository.create(createData);
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: string, payload: UpdateOutletDto) {
    try {
      return await this.outletRepository.update({
        where: {
          uuid: uuid,
        },
        args: {
          name: payload.name,
          image: payload.image,
          address: payload.address,
          description: payload.description,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(payload: any) {
    try {
      const outlet = await this.outletRepository.findOne({
        where: {
          uuid: payload.uuid,
        },
        include: {
          employees: true,
        },
      });
      if (!outlet) throw new NotFoundException('Not found!!');
      if (outlet.employees.length > 0) throw new NotAcceptableException('Cannot delete this outlet!!');
      await this.outletRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
  }
}
