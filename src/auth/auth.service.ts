import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, LoginDto } from './dto';
import { RefreshTokenDto } from './dto/refreshToken-dto';
import { randomCode } from '@/utils/random-code.util';
import { Badge } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  _generateUserUniqueId(): string {
    return `${randomCode(10)}`;
  }

  async signup(data: SignUpDto) {
    const { email, mobile, password, userType, signUpMethod } = data;
    try {
      let createUser: any;
      if(signUpMethod == 'GUEST') {
        // go to guest method
        const password = randomCode(6);
        createUser = await this.userRepository.create({
          user_id: this._generateUserUniqueId(),
          password: hashSync(password, 10),
          user_type: userType,
          badge: Badge.FLYING,
          profile: { create: {} } 
        });
        createUser.password = password;
      } else {
        const searchCriteria = email ? { email } : { mobile };
        const isUserExits = await this.userRepository.searchUser(searchCriteria);
        if (isUserExits) {
          throw new HttpException('User allreay exits!!', HttpStatus.BAD_REQUEST);
        }
        if(signUpMethod == 'EMAIL') {
           createUser = await this.userRepository.create({
            email: email,
            password: hashSync(password, 10),
            user_type: userType,
            profile: { create: {} } 
          });
          delete createUser.password;
        } else {
          createUser = await this.userRepository.create({
            mobile: mobile,
            password: hashSync(password, 10),
            user_type: userType,
            profile: { create: {} } 
          });
          delete createUser.password;
        }
      }
      const { accessToken, refreshToken } = await this.getTokens(createUser);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Signup successful',
        data: createUser,
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  async login(data: LoginDto) {
    const { email, mobile, userId, password } = data;
    try {
      const searchCriteria = email ? { email } : mobile ? { mobile } : { user_id: userId };
      const user = await this.userRepository.searchUser(searchCriteria);
      if (!user) {
        throw new HttpException('Invalid Credentials!!', HttpStatus.BAD_REQUEST);
      }

      // is password match
      const isPasswordMatch = compareSync(password, user.password);
      if (!isPasswordMatch) {
        throw new HttpException('Invalid Credentials password!!', HttpStatus.BAD_REQUEST);
      }

      const { accessToken, refreshToken } = await this.getTokens(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Login successful',
        data: user,
        tokens: {
          accessToken,
          refreshToken,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  async refreshToken(data: RefreshTokenDto) {
    try {
      /// Verifying the refresh token
      const decodedRefreshToken = await this.jwtService.verifyAsync(data.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      // Extract user information from the decoded refresh token
      const { sub: uuid } = decodedRefreshToken;

      const user = await this.userRepository.searchUser({ uuid: uuid });

      if (!user) {
        throw new HttpException('Invalid RefreshToken', HttpStatus.FORBIDDEN);
      }
      // Generate a new access token for the user
      const { accessToken, refreshToken } = await this.getTokens(user);

      return {
        statusCode: HttpStatus.CREATED,
        message: "New access and refresh generate",
        tokens: {
          accessToken, refreshToken
        }
      };
    } catch (err) {
      throw err;
    }
  }

  async getTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: payload.uuid,
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
