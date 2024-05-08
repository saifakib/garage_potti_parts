import { DatabaseService } from '.././database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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

  async findAll(where?: Prisma.PermissionsWhereInput) {
    try {
      const find = await this.database.permissions.findMany({
        where: where,
      });
      return find;
    } catch (err) {
      throw err;
    }
  }
}
