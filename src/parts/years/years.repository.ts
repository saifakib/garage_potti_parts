import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Years } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class YearsRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne({ where, include }: { where?: Prisma.YearsWhereInput; include?: Prisma.YearsInclude }) {
    try {
      const find = await this.database.years.findFirst({
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
    where?: Prisma.YearsWhereInput;
    orderBy?: Prisma.YearsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.YearsInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Years>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(this.database.years, { where, orderBy, ...args }, { page, perPage });
    } catch (error) {
      throw error;
    }
  }

  async create(args: Prisma.YearsCreateInput) {
    try {
      const create = await this.database.years.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update({ where, args }: { where?: Prisma.YearsWhereUniqueInput; args?: Prisma.YearsUpdateInput }) {
    try {
      const create = await this.database.years.update({
        where,
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async delete(uuid?: string) {
    try {
      const response = await this.database.years.update({
        where: { uuid },
        data: { soft_delete: true },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
}
