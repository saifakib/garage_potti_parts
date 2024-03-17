import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, LoginDto } from './dto';

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
            const createUser = await this.userRepository.create({ email: data.email, password: hashSync(data.password, 10 )});
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

    async login(data: LoginDto) {
      try {
          const user = await this.userRepository.searchUser({ email: data.email });
          if(!user) {
              throw new HttpException("User Not Found!!",HttpStatus.NOT_FOUND)
          }

          // is password match
          const isPasswordMatch = compareSync(data.password, user.password);
          if(!isPasswordMatch) {
            throw new HttpException("User Not Found!!",HttpStatus.NOT_FOUND)
          }

          const { accessToken, refreshToken } = await this.getTokens(user);
          return {
              message: "User Login",
              data: user,
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
