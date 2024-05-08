import { Controller, Get, UseGuards, HttpStatus, Param, Delete, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { PermissionGuard } from '@/guard/permission.guard';
import { RolesService } from './roles.service';
import { Permission } from '@/decorators/permission.decorator';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';
import { uuidSchema } from '@/validationSchema/common/uuid.schema';
import { UUID } from 'crypto';
import { CreateRoleDto, createRoleSchema } from '@/validationSchema/roles/createRole.schema';
import { SyncRoleToUserDto, syncRoleToUserSchema } from '@/validationSchema/roles/syncRoleToUser.schema';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiBearerAuth('JWT')
  @Permission('VIEW_ROLES')
  @UseGuards(AuthGuard, PermissionGuard)
  @Get()
  async findAll() {
    const response: any = await this.rolesService.findAll({});
    return {
      data: response,
      message: 'All Roles',
      statusCode: HttpStatus.OK,
    };
  }
  @ApiBearerAuth('JWT')
  @Permission('VIEW_ROLES')
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
    const response: any = await this.rolesService.findOne({ uuid });
    return {
      data: response,
      message: 'Role',
      statusCode: HttpStatus.FOUND,
    };
  }

  @ApiBearerAuth('JWT')
  @Permission('CREATE_ROLES')
  @UseGuards(AuthGuard, PermissionGuard)
  @Post()
  async create(@Body(new ZodPipe(createRoleSchema)) createRoleDto: CreateRoleDto) {
    try {
      const response: any = await this.rolesService.create(createRoleDto);
      return {
        data: response,
        message: 'Create new Role',
        statusCode: HttpStatus.OK,
      };
    } catch (error: any) {
      console.log('Error creating role', error);
      throw new Error(error.message);
    }
  }

  @ApiBearerAuth('JWT')
  @Permission('DELETE_ROLES')
  @UseGuards(AuthGuard, PermissionGuard)
  @Delete('/:uuid')
  @ApiParam({
    name: 'uuid',
    description: 'uuid format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    type: 'string',
  })
  async delete(
    @Param('uuid', new ZodPipe(uuidSchema))
    uuid: UUID,
  ) {
    const response: any = await this.rolesService.delete({ uuid });
    return {
      data: response,
      message: 'Role',
      statusCode: HttpStatus.OK,
    };
  }

  @ApiBearerAuth('JWT')
  @Permission('ATTACH_ROLE_TO_USER')
  @UseGuards(AuthGuard, PermissionGuard)
  @Post('/attach')
  async attachRole(@Body(new ZodPipe(syncRoleToUserSchema)) syncRoleToUserDto: SyncRoleToUserDto) {
    try {
      const response = await this.rolesService.attachRole(syncRoleToUserDto);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT')
  @Permission('DETACH_ROLE_TO_USER')
  @UseGuards(AuthGuard, PermissionGuard)
  @Post('/detach')
  async detachRole(@Body(new ZodPipe(syncRoleToUserSchema)) syncRoleToUserDto: SyncRoleToUserDto) {
    try {
      const response = await this.rolesService.detachRole(syncRoleToUserDto);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
