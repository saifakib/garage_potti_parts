import { DatabaseService } from '.././database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UUID } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(private readonly database: DatabaseService) {}

  async findOne(where?: Prisma.UsersWhereInput) {
    try {
      const find = await this.database.users.findFirst({
        where: where,
        select: {
          uuid: true,
          user_id: true,
          user_type: true,
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

  async findAll(where?: Prisma.UsersWhereInput) {
    try {
      const find = await this.database.users.findMany({
        where: where,
        include: {
          profile: true,
        },
      });
      return find;
    } catch (err) {
      throw err;
    }
  }

  async create(data: any) {
    try {
      const create = await this.database.users.create({
        data,
        select: {
          uuid: true,
          user_id: true,
          user_type: true,
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
