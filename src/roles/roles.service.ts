import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from '@/validationSchema/roles/createRole.schema';
import { SyncRoleToUserDto } from '@/validationSchema/roles/syncRoleToUser.schema';

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

  async create(payload: CreateRoleDto) {
    try {
      const createData = {
        name: payload.name,
        slug: payload.name.split(' ').join('_'),
        description: payload.description,
      };
      return await this.rolesRepository.create(createData);
    } catch (err) {
      throw err;
    }
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

  async attachRole(payload: SyncRoleToUserDto) {
    try {
      return await this.rolesRepository.syncRoleToUser({
        where: {
          uuid: payload.userUuid,
        },
        data: {
          role: {
            connect: payload.roleUuid,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async detachRole(payload: SyncRoleToUserDto) {
    try {
      return await this.rolesRepository.syncRoleToUser({
        where: {
          uuid: payload.userUuid,
        },
        data: {
          role: {
            disconnect: payload.roleUuid,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
