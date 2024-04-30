import { DatabaseService } from '.././database/database.service';
import { Injectable } from '@nestjs/common';
import {} from '@prisma/client';
import { UUID } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(private readonly database: DatabaseService) {}

  async searchUser(data: any) {
    try {
      const find = await this.database.users.findFirst({
        where: { ...data },
      });
      return find;
    } catch (err) {
      throw err;
    }
  }

  async create(data: any) {
    try {
      console.log(data);
      const create = await this.database.users.create({ data });
      console.log(create);
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
        data: {
          profile: {
            update: {
              ...data,
            },
          },
        },
      });
      return update;
    } catch (err) {
      throw err;
    }
  }
}
