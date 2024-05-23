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

  async findOne({ where, include }: { where?: Prisma.PartsWhereInput; include?: Prisma.PartsInclude }) {
    try {
      const find = await this.database.parts.findFirst({
        where: where,
        include: include,
      });
      return find;
    } catch (err) {
      throw err;
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

  async update({ where, args }: { where?: Prisma.PartsWhereUniqueInput; args?: Prisma.PartsUpdateInput }) {
    try {
      const create = await this.database.parts.update({
        where: where,
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async delete(uuid: string) {
    return this.database.parts.update({
      where: { uuid },
      data: { softDelete: true },
    });
  }

  async partsEntriesCreate(args?: Prisma.PartsEntriesCreateInput) {
    try {
      return await this.database.partsEntries.create({
        data: args,
      });
    } catch (err) {
      throw err;
    }
  }

  async partsEntryListCreate(args?: Prisma.PartsEntryListsCreateInput) {
    try {
      return await this.database.partsEntryLists.create({
        data: args,
      });
    } catch (err) {
      throw err;
    }
  }
}
