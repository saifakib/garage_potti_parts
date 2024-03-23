import { Controller, Get, Body, Patch, Param, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
//import { CreateUserDto } from './dto/create-user.dto';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserProileDto } from './dto/userProfile-dto';
import { UUID } from 'crypto';

@ApiTags('Users')
@UsePipes(ZodValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth("JWT")
  //@UseGuards(AuthGuard("jwt"))
  @Patch(':uuid')
  update(@Param('uuid') uuid: UUID, @Body() userProfile: UserProileDto) {
    return this.usersService.update(uuid, userProfile);
  }
}
