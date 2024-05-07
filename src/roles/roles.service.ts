import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async findOne(payload: any) {
    return await this.rolesRepository.findOne({
      uuid: payload.uuid,
    });
  }

  async findAll(payload: any) {
    return await this.rolesRepository.findAll(payload);
  }
}
