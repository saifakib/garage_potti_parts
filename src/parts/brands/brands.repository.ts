import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Brands } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class BrandsRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne({ where, include }: { where?: Prisma.BrandsWhereInput; include?: Prisma.PartsCategoryInclude }) {
    try {
      const find = await this.database.brands.findFirst({
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
    where?: Prisma.BrandsWhereInput;
    orderBy?: Prisma.BrandsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.BrandsInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Brands>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(
        this.database.brands,
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

  async create(args: Prisma.BrandsCreateInput) {
    try {
      const create = await this.database.brands.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid?: string, args?: Prisma.BrandsUpdateInput) {
    try {
      const create = await this.database.brands.update({
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
      const create = await this.database.brands.update({
        where: {
          uuid: uuid,
        },
        data: {
          soft_delete: true,
        },
      });
      return create;
    } catch (err) {
      throw err;
    }
  }
}
