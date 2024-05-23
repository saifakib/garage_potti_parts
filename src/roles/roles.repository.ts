import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Roles } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class RolesRepository {
  constructor(private readonly database: DatabaseService) {}

  async find(arg: Prisma.RolesWhereInput) {
    try {
      const role = await this.database.roles.findFirst({
        where: arg,
      });
      return role;
    } catch (err) {
      throw err;
    }
  }

  async findOne(where?: Prisma.RolesWhereInput) {
    try {
      const find = await this.database.roles.findFirst({
        where: where,
        include: {
          permissions: true,
        },
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
    where?: Prisma.RolesWhereInput;
    orderBy?: Prisma.RolesOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.RolesInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Roles>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(
        this.database.roles,
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

  async create(args: Prisma.RolesCreateInput) {
    try {
      const create = await this.database.roles.create({
        data: args,
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async delete(uuid: string) {
    try {
      const find = await this.database.roles.update({
        where: {
          uuid: uuid,
        },
        data: {
          softDelete: true,
        },
      });
      return find;
    } catch (err) {
      throw err;
    }
  }

  async syncRoleToUser(data: any) {
    try {
      const permission = await this.database.users.update(data);
      return permission;
    } catch (error) {
      throw error;
    }
  }
}
