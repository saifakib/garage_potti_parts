import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/zod-validation/zod-validation.pipe';
import {
  SignUpDto,
  signUpSchema,
  loginSchema,
  LoginDto,
  RefreshTokenDto,
  refreshTokenSchema,
} from '../validationSchema/auth';
import { ApiTags } from '@nestjs/swagger';
import ResponseHelper from '@/utils/response.helper';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly res = new ResponseHelper();
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body(new ZodPipe(signUpSchema)) signupDto: SignUpDto) {
    try {
      const response = await this.authService.signup(signupDto);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Signup successful',
      });
    } catch (err: any) {
      throw err;
    }
  }

  @Post('login')
  async login(@Body(new ZodPipe(loginSchema)) loginDto: LoginDto) {
    try {
      const response = await this.authService.login(loginDto);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'Login successful',
      });
    } catch (err) {
      throw err;
    }
  }

  @Post('refreshToken')
  async refreshToken(@Body(new ZodPipe(refreshTokenSchema)) refreshToken: RefreshTokenDto) {
    try {
      const response = await this.authService.refreshToken(refreshToken);
      return this.res.successResponse({
        data: response,
        status: HttpStatus.CREATED,
        message: 'New access and refresh token generate',
      });
    } catch (err) {
      throw err;
    }
  }
}
