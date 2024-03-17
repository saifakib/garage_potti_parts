import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/zod-validation/zod-validation.pipe';
import { SignUpDto, SignUpSchema, LoginSchema, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  signup(@Body(new ZodPipe(SignUpSchema)) signupDto: SignUpDto) {
    try {
      return this.authService.signup(signupDto);
    } catch (err) {
      throw err
    }
  }

  @Post('login')
  @HttpCode(200)
  login(@Body(new ZodPipe(LoginSchema)) loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (err) {
      throw err
    }
  }
}
