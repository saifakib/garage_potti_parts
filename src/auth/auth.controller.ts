import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/zod-validation/zod-validation.pipe';
import { SignUpDto, signUpSchema, loginSchema, LoginDto, RefreshTokenDto, refreshTokenSchema } from './dto';
import {  } from './dto/refreshToken-dto';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@ApiTags('Auth')
@UsePipes(ZodValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  signup(@Body(new ZodPipe(signUpSchema)) signupDto: SignUpDto) {
    try {
      return this.authService.signup(signupDto);
    } catch (err: any) {
      throw err
    }
  }

  @Post('login')
  @HttpCode(200)
  login(@Body(new ZodPipe(loginSchema)) loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (err) {
      throw err
    }
  }

  @Post('refreshToken')
  @HttpCode(201)
  refreshToken(@Body(new ZodPipe(refreshTokenSchema)) refreshToken: RefreshTokenDto) {
    try {
      return this.authService.refreshToken(refreshToken);
    } catch (err) {
      throw err
    }
  }
}
