import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, PartsCategory } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class CategoryRepository {
  constructor(private readonly database: DatabaseService) {}

  async find(arg: Prisma.PartsCategoryWhereInput) {
    try {
      const role = await this.database.partsCategory.findFirst({
        where: arg,
      });
      return role;
    } catch (err) {
      throw err;
    }
  }

  async findOne({ where, include }: { where?: Prisma.PartsCategoryWhereInput; include?: Prisma.PartsCategoryInclude }) {
    try {
      const find = await this.database.partsCategory.findFirst({
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
    where?: Prisma.PartsCategoryWhereInput;
    orderBy?: Prisma.PartsCategoryOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.PartsCategoryInclude;
  }): Promise<PaginatorTypes.PaginatedResult<PartsCategory>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(
        this.database.partsCategory,
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

  async create(args: Prisma.PartsCategoryCreateInput) {
    try {
      const create = await this.database.partsCategory.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async createOption(args: Prisma.PartsCategoryOptionsCreateInput) {
    try {
      const create = await this.database.partsCategoryOptions.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async createOptionEntity(args: Prisma.PartsCategoryOptionsEntityCreateInput) {
    try {
      const create = await this.database.partsCategoryOptionsEntity.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }
}
