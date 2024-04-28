import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { Config } from './config/env.config';


@Module({
  imports: [JwtModule.register({
    global: true,
    secret: Config.JWT_SECRET_KEY,
    signOptions: { expiresIn: Config.JWT_TOKEN_EXPIRE_AT },
  }), DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
