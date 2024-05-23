import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Vendors } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class VendorsRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne({ where, include }: { where?: Prisma.VendorsWhereInput; include?: Prisma.VendorsInclude }) {
    try {
      const find = await this.database.vendors.findFirst({
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
    where?: Prisma.VendorsWhereInput;
    orderBy?: Prisma.VendorsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.VendorsInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Vendors>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(this.database.years, { where, orderBy, ...args }, { page, perPage });
    } catch (error) {
      throw error;
    }
  }

  async create(args: Prisma.VendorsCreateInput) {
    try {
      const create = await this.database.vendors.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update({ where, args }: { where?: Prisma.VendorsWhereUniqueInput; args?: Prisma.VendorsUpdateInput }) {
    try {
      return await this.database.vendors.update({
        where,
        data: args,
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(uuid?: string) {
    try {
      const create = await this.database.vendors.update({
        where: { uuid },
        data: { soft_delete: true },
      });
      return create;
    } catch (err) {
      throw err;
    }
  }
}
