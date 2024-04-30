import { Controller, Get, Body, Patch, Param, UsePipes, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
//import { CreateUserDto } from './dto/create-user.dto';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserProileDto } from './dto/userProfile-dto';
import { UUID } from 'crypto';
import { AuthGuard } from '@/guard/auth.guard';
import ExtendedRequest from '@/guard/ExtendedRequest';

@ApiTags('Users')
@UsePipes(ZodValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth('JWT')
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Req() req: ExtendedRequest) {
    console.log(req.user);
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch(':uuid')
  update(@Param('uuid') uuid: UUID, @Body() userProfile: UserProileDto) {
    return this.usersService.update(uuid, userProfile);
  }
}
