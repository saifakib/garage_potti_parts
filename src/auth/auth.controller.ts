import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/zod-validation/zod-validation.pipe';
import { SignUpDto, SignUpSchema, LoginSchema, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body(new ZodPipe(SignUpSchema)) signupDto: SignUpDto) {
    try {
      return this.authService.signup(signupDto);
    } catch (err) {
      throw err
    }
  }

  @Post('login')
  login(@Body(new ZodPipe(LoginSchema)) loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (err) {
      throw err
    }
  }
}
