import { DatabaseService } from '.././database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesRepository {
  constructor(private readonly database: DatabaseService) {}

  async find(arg: any) {
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
      });
      return find;
    } catch (err) {
      throw err;
    }
  }
}
