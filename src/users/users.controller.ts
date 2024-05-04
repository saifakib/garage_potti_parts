import { Controller, Get, Body, Patch, UsePipes, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from '../validationSchema/users';
import { AuthGuard } from '@/guard/auth.guard';
import ExtendedRequest from '@/guard/ExtendedRequest';
import { Permission } from '@/decorators/permission.decorator';

@ApiTags('Users')
@UsePipes(ZodValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT')
  @Permission('VIEW USERS')
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const response: any = await this.usersService.findAll();
    return {
      data: response,
      message: 'Users',
      statusCode: HttpStatus.OK,
    };
  }

  @ApiBearerAuth('JWT')
  @Permission('VIEW_PROFILE')
  @UseGuards(AuthGuard)
  @Get('profile')
  async findOne(@Req() req: ExtendedRequest) {
    const response: any = await this.usersService.findOne(req.user);
    return {
      data: response,
      message: 'User Profile found',
      statusCode: HttpStatus.OK,
    };
  }

  @ApiBearerAuth('JWT')
  @Permission('UPDATE_PROFILE')
  @UseGuards(AuthGuard)
  @Patch('profile')
  update(@Req() req: ExtendedRequest, @Body() userProfile: UserProfileDto) {
    return this.usersService.update(req.user.uuid, userProfile);
  }
}
