import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignUpSchema } from './dto/signup-dto';
import { ZodPipe } from 'src/zod-validation/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body(new ZodPipe(SignUpSchema)) createUserDto: SignUpDto) {
    try {
      return this.authService.signup(createUserDto);
    } catch (err) {
      throw err
    }
  }
}
