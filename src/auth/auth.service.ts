import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { SignUpDto } from './dto/signup-dto';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
        private readonly userRepository: UserRepository
    ) {}
    async signup(data: SignUpDto) {
        try {
            const isUserExits = await this.userRepository.searchUser({ email: data.email });
            if(isUserExits) {
                throw new HttpException("User allreay exits!!",HttpStatus.BAD_REQUEST)
            }

            // create new user
            const createUser = await this.userRepository.create({ email: data.email, password: hashSync(data.password, process.env.PASSWORD_SALT )});
            const { accessToken, refreshToken } = await this.getTokens(createUser);
            return {
                message: "User signup",
                data: createUser,
                tokens: {
                  accessToken,
                  refreshToken,
                }
            }
        } catch (err) {
          throw err;
        }
    }
    

    async getTokens(payload: any) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: payload.uuid,
              id: payload.id,
              ...payload,
            },
            {
              secret: process.env.JWT_SECRET_KEY,
              expiresIn: process.env.JWT_TOKEN_EXPIRE_AT,
            },
          ),
          this.jwtService.signAsync(
            {
              sub: payload.uuid,
              id: payload.id,
            },
            {
              secret: process.env.JWT_REFRESH_SECRET,
              expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_AT,
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
      }
}
