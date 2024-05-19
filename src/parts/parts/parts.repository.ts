import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Parts } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class PartsRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAll({
    where,
    orderBy,
    page,
    perPage,
    include,
  }: {
    where?: Prisma.PartsWhereInput;
    orderBy?: Prisma.PartsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.PartsInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Parts>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(this.database.years, { where, orderBy, ...args }, { page, perPage });
    } catch (error) {
      throw error;
    }
  }

  async create(args?: Prisma.PartsCreateInput) {
    try {
      const create = await this.database.parts.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }
}
