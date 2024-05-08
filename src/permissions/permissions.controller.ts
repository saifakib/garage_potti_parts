import { Controller, Get, UseGuards, HttpStatus, Param, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { PermissionGuard } from '@/guard/permission.guard';
import { Permission } from '@/decorators/permission.decorator';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import { PermissionsService } from './permissions.service';
import {
  SyncPermissionToRoleDto,
  syncPermissionToRoleSchema,
} from '@/validationSchema/permissions/syncPermissionToRole.schema';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiBearerAuth('JWT')
  @Permission('VIEW_PERMISSIONS')
  @UseGuards(AuthGuard, PermissionGuard)
  @Get()
  async findAll() {
    const response: any = await this.permissionsService.findAll({});
    return {
      data: response,
      message: 'All Permissions',
      statusCode: HttpStatus.OK,
    };
  }
  @ApiBearerAuth('JWT')
  @Permission('VIEW_PERMISSIONS')
  @UseGuards(AuthGuard, PermissionGuard)
  @Get('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async findOne(
    @Param('uuid', new ZodPipe(uuidSchema))
    uuid: UUID,
  ) {
    const response: any = await this.permissionsService.findOne({ uuid });
    return {
      data: response,
      message: 'Permission',
      statusCode: HttpStatus.FOUND,
    };
  }

  @ApiBearerAuth('JWT')
  @Permission('ATTACH_PERMISSION_TO_ROLE')
  @UseGuards(AuthGuard, PermissionGuard)
  @Post('/attach')
  async attachPermission(
    @Body(new ZodPipe(syncPermissionToRoleSchema)) syncPermissionToRoleDto: SyncPermissionToRoleDto,
  ) {
    try {
      const response = await this.permissionsService.attachPermission(syncPermissionToRoleDto);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT')
  @Permission('DETACH_PERMISSION_TO_ROLE')
  @UseGuards(AuthGuard, PermissionGuard)
  @Post('/detach')
  async detachPermission(
    @Body(new ZodPipe(syncPermissionToRoleSchema)) syncPermissionToRoleDto: SyncPermissionToRoleDto,
  ) {
    try {
      const response = await this.permissionsService.detachPermission(syncPermissionToRoleDto);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
