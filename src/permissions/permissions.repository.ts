import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class PermissionsRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne(where?: Prisma.PermissionsWhereInput) {
    try {
      const find = await this.database.permissions.findFirst({
        where: where,
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
  }: {
    where?: Prisma.PermissionsWhereInput;
    orderBy?: Prisma.PermissionsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.PermissionsInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Permissions>> {
    try {
      return paginate(
        this.database.permissions,
        {
          where,
          orderBy,
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

  async syncPermissionToRole(data: any) {
    try {
      const permission = await this.database.roles.update(data);
      return permission;
    } catch (error) {
      throw error;
    }
  }
}
