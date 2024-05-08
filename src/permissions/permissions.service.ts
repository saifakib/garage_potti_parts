import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './permissions.repository';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async findOne(payload: any) {
    return await this.permissionsRepository.findOne({
      uuid: payload.uuid,
    });
  }

  async findAll(payload: any) {
    return await this.permissionsRepository.findAll(payload);
  }
}
