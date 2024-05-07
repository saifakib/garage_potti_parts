import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import ExtendedRequest from './ExtendedRequest';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private permissions: string[] = [];
  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const request: ExtendedRequest = context.switchToHttp().getRequest();

    if (['ROOT_ADMIN', 'SUPER_ADMIN'].includes(request.user.role.slug)) {
      return true;
    }
    const userPermissions: string[] = request.user.role.permissions.map((per: any) => {
      return per.slug;
    });

    this.permissions = this.reflector.get<string[]>('permissions', context.getHandler());

    const hasPermission: boolean =
      this.permissions.filter((permission: string) => {
        return userPermissions.includes(permission);
      }).length > 0;

    if (!hasPermission) {
      throw new UnauthorizedException('Unauthorized: Permission denied');
    }

    return true;
  }
}
