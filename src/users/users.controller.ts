import { Controller, Get, Body, Patch, Param, UsePipes, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from '../validationSchema/users';
import { AuthGuard } from '@/guard/auth.guard';
import ExtendedRequest from '@/guard/ExtendedRequest';

@ApiTags('Users')
@UsePipes(ZodValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT')
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
  @UseGuards(AuthGuard)
  @Patch('profile')
  update(@Req() req: ExtendedRequest, @Body() userProfile: UserProfileDto) {
    return this.usersService.update(req.user.uuid, userProfile);
  }
}
