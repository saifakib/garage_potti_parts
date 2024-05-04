import { SetMetadata, applyDecorators } from '@nestjs/common';
export function Permission(...permission: string[]) {
  return applyDecorators(SetMetadata('permissions', permission));
}
