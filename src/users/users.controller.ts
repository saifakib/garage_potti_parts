import { Controller, Get, Body, Patch, UsePipes, UseGuards, Req, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from '../validationSchema/users';
import { AuthGuard } from '@/guard/auth.guard';
import ExtendedRequest from '@/guard/ExtendedRequest';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionGuard } from '@/guard/permission.guard';
import ResponseHelper from '@/utils/response.helper';
import errorHandler from '@/utils/error.helper';
import { FindAllDto, findAllSchema } from '@/validationSchema/common/findAll.schema';
import { ZodPipe } from '@/zod-validation/zod-validation.pipe';

@ApiTags('Users')
@UsePipes(ZodValidationPipe)
@Controller('users')
export class UsersController {
  private readonly res = new ResponseHelper();
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT')
  @Permission('VIEW USERS')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query(new ZodPipe(findAllSchema)) payload: FindAllDto) {
    try {
      const response: any = await this.usersService.findAll(payload);
      return this.res.successResponse({
        data: response.data,
        meta: response.meta,
        status: HttpStatus.OK,
        message: 'Users',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Permission('VIEW_PROFILE')
  @UseGuards(AuthGuard, PermissionGuard)
  @Get('profile')
  async findOne(@Req() req: ExtendedRequest) {
    try {
      const response: any = await this.usersService.findOne(req.user);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.FOUND,
        message: 'User Profile found',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }

  @ApiBearerAuth('JWT')
  @Permission('UPDATE_PROFILE')
  @UseGuards(AuthGuard)
  @Patch('profile')
  async update(@Req() req: ExtendedRequest, @Body() userProfile: UserProfileDto) {
    try {
      const response: any = await this.usersService.update(req.user.uuid, userProfile);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.OK,
        message: 'Update Profile',
      });
    } catch (error: any) {
      throw errorHandler(error);
    }
  }
}
