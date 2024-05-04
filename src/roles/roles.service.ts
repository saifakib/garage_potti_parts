import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async findOne(payload: any) {
    return await this.rolesRepository.findOne(payload);
  }
}
