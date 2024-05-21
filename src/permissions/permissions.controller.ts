import { Controller, Get, UseGuards, HttpStatus, Param, Body, Patch, Query } from '@nestjs/common';
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
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  private readonly res = new ResponseHelper();
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiBearerAuth('JWT')
  @Permission('VIEW_PERMISSIONS')
  @UseGuards(AuthGuard, PermissionGuard)
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    const response: any = await this.permissionsService.findAll(payload);
    return this.res.successResponse({
      data: response.data,
      meta: response.meta,
      status: HttpStatus.OK,
      message: 'All Permissions',
    });
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
    return this.res.successResponse({
      data: response,
      message: 'Permission found',
      status: HttpStatus.OK,
    });
  }

  @ApiBearerAuth('JWT')
  @Permission('ATTACH_PERMISSION_TO_ROLE')
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch('/attach')
  async attachPermission(
    @Body(new ZodPipe(syncPermissionToRoleSchema)) syncPermissionToRoleDto: SyncPermissionToRoleDto,
  ) {
    try {
      const response = await this.permissionsService.attachPermission(syncPermissionToRoleDto);
      return this.res.successResponse({
        data: response,
        message: 'Attach permission to role successfully',
        status: HttpStatus.ACCEPTED,
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Permission('DETACH_PERMISSION_TO_ROLE')
  @UseGuards(AuthGuard, PermissionGuard)
  @Patch('/detach')
  async detachPermission(
    @Body(new ZodPipe(syncPermissionToRoleSchema)) syncPermissionToRoleDto: SyncPermissionToRoleDto,
  ) {
    try {
      const response = await this.permissionsService.detachPermission(syncPermissionToRoleDto);
      return this.res.successResponse({
        data: response,
        message: 'Detach permission to role successfully',
        status: HttpStatus.ACCEPTED,
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
