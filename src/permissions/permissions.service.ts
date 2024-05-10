import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionsRepository } from './permissions.repository';
import { SyncPermissionToRoleDto } from '@/validationSchema/permissions/syncPermissionToRole.schema';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async findOne(payload: any) {
    const response = await this.permissionsRepository.findOne({
      uuid: payload.uuid,
    });
    if (!response) {
      throw new NotFoundException('Permission not found!!');
    }
    return response;
  }

  async findAll(payload: any) {
    return await this.permissionsRepository.findAll(payload);
  }

  async attachPermission(payload: SyncPermissionToRoleDto) {
    try {
      return await this.permissionsRepository.syncPermissionToRole({
        where: {
          uuid: payload.roleUuid,
        },
        data: {
          permissions: {
            connect: payload.permissionUuids.map((permissionUuid: string) => ({
              uuid: permissionUuid,
            })),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async detachPermission(payload: SyncPermissionToRoleDto) {
    try {
      return await this.permissionsRepository.syncPermissionToRole({
        where: {
          uuid: payload.roleUuid,
        },
        data: {
          permissions: {
            disconnect: payload.permissionUuids.map((permissionUuid: string) => ({
              uuid: permissionUuid,
            })),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
