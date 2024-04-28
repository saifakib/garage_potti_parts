import { ConfigService } from '@nestjs/config';
import dotenv from 'dotenv';
dotenv.config();
export class Config {
  static readonly configService = new ConfigService();
  static readonly env = this.configService.get('ENVIRONMENT');

  static get PORT(): string {
    return this.configService.get('PORT');
  }

  static get JWT_SECRET_KEY() {
    return this.configService.get('JWT_SECRET_KEY');
  }
  static get JWT_REFRESH_SECRET() {
    return this.configService.get('JWT_REFRESH_SECRET');
  }

  static get JWT_TOKEN_EXPIRE_AT() {
    return this.configService.get('JWT_TOKEN_EXPIRE_AT');
  }
  static get JWT_REFRESH_TOKEN_EXPIRE_AT() {
    return this.configService.get('JWT_REFRESH_TOKEN_EXPIRE_AT');
  }

}