import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guard/auth.guard';
import { RolesRepository } from './roles.repository';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesRepository) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  async findOne() {
    const response: any = await this.rolesService.findOne();
    return {
      data: response,
      message: 'Role',
      statusCode: HttpStatus.OK,
    };
  }
}
