import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
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

  async delete(payload: any) {
    try {
      const role = await this.rolesRepository.findOne({
        uuid: payload.uuid,
      });
      if (!role) throw new NotFoundException('Role not found!!');
      if (role.system_role === true) throw new NotAcceptableException('Can not delete this role!!');
      // also check role has permissions, if yes dont delete the role
      await this.rolesRepository.delete(payload.uuid);
    } catch (err) {
      throw err;
    }
    return await this.rolesRepository.findAll({});
  }
}
