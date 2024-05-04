import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/users/users.repository';
import { RolesRepository } from '@/roles/roles.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository, RolesRepository],
})
export class AuthModule {}
