import { DatabaseService } from '.././database/database.service';
import { Injectable } from '@nestjs/common';
import {} from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly database: DatabaseService) {}

  async searchUser(data: any) {
    try {
      const find = await this.database.users.findFirst({
        where: { ...data }
      });
      return find;
    } catch (err) {
      throw err;
    }
  }

  async create(data: any) {
    try {
      const create = await this.database.users.create({ data });
      return create;
    } catch (err) {
      throw err;
    }
  }
}