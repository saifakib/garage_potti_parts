import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import RequestContextUser from './RequestContext';
import { Config } from '@/config/env.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {} // Inject JwtService
  private reqUser: RequestContextUser;
  
  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) return true;

    return this.validateToken(context);
  }

  private async validateToken(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    this.reqUser = context.switchToRpc().getContext<RequestContextUser>()

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Unauthorized: Invalid or missing token');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the JWT token using your JwtService
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: Config.JWT_SECRET_KEY,
      });
      this.setUserContext(this.reqUser, decoded);
      //context.switchToHttp().getRequest().user = decoded;

      //const decoded = await this.jwtService.verify(token); // Use JwtService to verify
      return !!decoded; // Return true if token is valid, false otherwise
    } catch (err) {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
  }
  setUserContext(context: RequestContextUser, data: any) {
    context.user = data;
  }
  
}
