import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, VehicleTypes } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class VehicleTypesRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne({ where, include }: { where?: Prisma.VehicleTypesWhereInput; include?: Prisma.VehicleTypesInclude }) {
    try {
      const find = await this.database.vehicleTypes.findFirst({
        where: where,
        include: include,
      });
      return find;
    } catch (err) {
      throw err;
    }
  }

  async findAll({
    where,
    orderBy,
    page,
    perPage,
    include,
  }: {
    where?: Prisma.VehicleTypesWhereInput;
    orderBy?: Prisma.VehicleTypesOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.VehicleTypesInclude;
  }): Promise<PaginatorTypes.PaginatedResult<VehicleTypes>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(
        this.database.vehicleTypes,
        {
          where,
          orderBy,
          ...args,
        },
        {
          page,
          perPage,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async create(args: Prisma.VehicleTypesCreateInput) {
    try {
      const create = await this.database.vehicleTypes.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid?: string, args?: Prisma.VehicleTypesUpdateInput) {
    try {
      const create = await this.database.vehicleTypes.update({
        where: {
          uuid: uuid,
        },
        data: args,
        include: {
          parts: true,
        },
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async delete(uuid?: string) {
    try {
      const response = await this.database.vehicleTypes.update({
        where: {
          uuid: uuid,
        },
        data: {
          soft_delete: true,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
}
