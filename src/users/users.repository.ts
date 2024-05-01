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
        },
      });
      return create;
    } catch (err) {
      throw err;
    }
  }

  async update(uuid: UUID, data: any) {
    console.log(uuid, data);
    try {
      const update = await this.database.users.update({
        where: {
          uuid: uuid,
        },
        data: data,
      });
      return update;
    } catch (err) {
      throw err;
    }
  }
}
