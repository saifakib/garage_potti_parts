import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Models } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ModelsRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne({ where, include }: { where?: Prisma.ModelsWhereInput; include?: Prisma.ModelsInclude }) {
    try {
      const find = await this.database.models.findFirst({
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
    where?: Prisma.ModelsWhereInput;
    orderBy?: Prisma.ModelsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.ModelsInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Models>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(
        this.database.models,
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

  async create(args: Prisma.ModelsCreateInput) {
    try {
      const create = await this.database.models.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid?: string, args?: Prisma.ModelsUpdateInput) {
    try {
      const create = await this.database.models.update({
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
      const response = await this.database.models.update({
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
