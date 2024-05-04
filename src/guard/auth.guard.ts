import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { Config } from '@/config/env.config';
import ExtendedRequest from './ExtendedRequest';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  private permissions: string[];
  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);
    if (isPublic) return true;

    this.permissions = this.reflector.get<string[]>('permissions', context.getHandler());

    return this.validateToken(context);
  }

  private async validateToken(context: ExecutionContext): Promise<boolean> {
    const request: ExtendedRequest = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Try to retrieve the JWT from request's headers
    //--------------------------------------------------------------------------
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Unauthorized: Invalid or missing token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: Config.JWT_SECRET_KEY,
      });
      request.user = decoded;
      return !!decoded;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
  }
}
