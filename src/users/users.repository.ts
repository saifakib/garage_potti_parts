import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { UUID } from 'crypto';
import { PaginatorTypes, paginator } from 'paginator';
const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class UserRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne(where?: Prisma.UsersWhereInput) {
    try {
      const find = await this.database.users.findFirst({
        where: where,
        select: {
          uuid: true,
          userId: true,
          userType: true,
          badge: true,
          password: true,
          profile: true,
          role: {
            select: {
              slug: true,
              name: true,
              permissions: {
                select: {
                  slug: true,
                  name: true,
                },
              },
            },
          },
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
    where?: Prisma.UsersWhereInput;
    orderBy?: Prisma.UsersOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    include?: Prisma.UsersInclude;
  }): Promise<PaginatorTypes.PaginatedResult<Users>> {
    try {
      const args = {};
      Object.assign(args, { include });
      return paginate(
        this.database.users,
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

  async create(data: any) {
    try {
      const create = await this.database.users.create({
        data,
        select: {
          uuid: true,
          userId: true,
          userType: true,
          badge: true,
          password: true,
          profile: true,
          role: {
            select: {
              slug: true,
              name: true,
              permissions: {
                select: {
                  slug: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: UUID, data: any) {
    try {
      const update = await this.database.users.update({
        where: {
          uuid: uuid,
        },
        data: data,
        include: {
          profile: true,
        },
      });
      return update;
    } catch (err) {
      throw err;
    }
  }
}
