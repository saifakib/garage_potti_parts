import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Engines } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class EnginesRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne({ where, include }: { where?: Prisma.EnginesWhereInput; include?: Prisma.EnginesInclude }) {
    try {
      const find = await this.database.engines.findFirst({
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
    where?: Prisma.EnginesWhereInput;
    orderBy?: Prisma.EnginesOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.EnginesInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Engines>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(
        this.database.engines,
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

  async create(args: Prisma.EnginesCreateInput) {
    try {
      const create = await this.database.engines.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid?: string, args?: Prisma.EnginesUpdateInput) {
    try {
      const create = await this.database.engines.update({
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
      const create = await this.database.engines.update({
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