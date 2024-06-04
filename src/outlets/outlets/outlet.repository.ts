import { DatabaseService } from '@/database/database.service';
import { paginator, PaginatorTypes } from '@/packages/paginator/src';
import { Injectable } from '@nestjs/common';
import { Outlets, Prisma } from '@prisma/client';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class OutletRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne({ where, include }: { where?: Prisma.OutletsWhereInput; include?: Prisma.OutletsInclude }) {
    try {
      const find = await this.database.outlets.findFirst({
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
    where?: Prisma.OutletsWhereInput;
    orderBy?: Prisma.OutletsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.OutletsInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Outlets>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(this.database.outlets, { where, orderBy, ...args }, { page, perPage });
    } catch (error) {
      throw error;
    }
  }

  async create(args: Prisma.OutletsCreateInput) {
    try {
      const create = await this.database.outlets.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update({ where, args }: { where?: Prisma.OutletsWhereUniqueInput; args?: Prisma.OutletsUpdateInput }) {
    try {
      const create = await this.database.outlets.update({
        where: where,
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async delete(uuid?: string) {
    try {
      const create = await this.database.outlets.update({
        where: { uuid },
        data: { softDelete: true },
      });
      return create;
    } catch (err) {
      throw err;
    }
  }
}
