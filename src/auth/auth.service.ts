import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, LoginDto, RefreshTokenDto } from '../validationSchema/auth';
import { randomCode } from '@/utils/random-code.util';
import { Badge, Roles, SIGNUP_METHOD, UserType } from '@prisma/client';
import { Config } from '@/config/env.config';
import { RolesRepository } from '@/roles/roles.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  _generateUserUniqueId(): string {
    return `${randomCode(10)}`;
  }

  async signup(data: SignUpDto) {
    const { email, mobile, password, userType, signUpMethod } = data;
    try {
      const role = await this.isRoleExist(userType);

      let createUser: any;
      if (signUpMethod == 'GUEST') {
        createUser = await this.userRepository.create({
          user_id: this._generateUserUniqueId(),
          password: hashSync(randomCode(6), 10),
          user_type: userType,
          badge: Badge.FLYING,
          profile: { create: {} },
          role: {
            connect: {
              uuid: role.uuid,
            },
          },
        });
      } else {
        // Check for existing user based on signup method
        const searchCriteria = signUpMethod === 'EMAIL' ? { email } : { mobile };
        const isUserExits = await this.userRepository.findOne(searchCriteria);
        if (isUserExits) {
          throw new HttpException('User already exits!!', HttpStatus.BAD_REQUEST);
        }

        // Create user with appropriate properties
        createUser = await this.userRepository.create({
          user_id: this._generateUserUniqueId(),
          ...(email && { email }),
          ...(mobile && { mobile }),
          password: hashSync(password, 10),
          user_type: userType,
          badge: Badge.REGISTERED,
          signup_method: signUpMethod === 'EMAIL' ? SIGNUP_METHOD.EMAIL : SIGNUP_METHOD.MOBILE,
          profile: { create: {} },
          role: {
            connect: {
              uuid: role.uuid,
            },
          },
        });
      }
      const { accessToken, refreshToken } = await this.getTokens(createUser);

      delete createUser.password;
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
      const user = await this.userRepository.findOne(searchCriteria);
      if (!user) {
        throw new HttpException('Invalid Credentials!!', HttpStatus.BAD_REQUEST);
      }

      // is password match
      const isPasswordMatch = compareSync(password, user.password);
      if (!isPasswordMatch) {
        throw new HttpException('Invalid Credentials password!!', HttpStatus.BAD_REQUEST);
      }
      delete user.password;
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
        secret: Config.JWT_REFRESH_SECRET,
      });
      // Extract user information from the decoded refresh token
      const { sub: uuid } = decodedRefreshToken;

      const user = await this.userRepository.findOne({ uuid: uuid });

      if (!user) {
        throw new HttpException('Invalid RefreshToken', HttpStatus.FORBIDDEN);
      }
      // Generate a new access token for the user
      const { accessToken, refreshToken } = await this.getTokens(user);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'New access and refresh generate',
        tokens: {
          accessToken,
          refreshToken,
        },
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
          secret: Config.JWT_SECRET_KEY,
          expiresIn: Config.JWT_TOKEN_EXPIRE_AT,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: payload.uuid,
        },
        {
          secret: Config.JWT_REFRESH_SECRET,
          expiresIn: Config.JWT_REFRESH_TOKEN_EXPIRE_AT,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async isRoleExist(userType: UserType) {
    const typesToRole = {
      END_USER: 'CONSUMER',
      SERVICE_PROVIDER: 'PROVIDER',
    };
    try {
      const roleArgs: Record<string, any> = {};
      Object.assign(roleArgs, { name: typesToRole[userType] });
      const role: Roles = await this.rolesRepository.find(roleArgs);
      if (!role) throw new NotFoundException('Invalid role');
      return role;
    } catch (error) {
      throw error;
    }
  }
}
