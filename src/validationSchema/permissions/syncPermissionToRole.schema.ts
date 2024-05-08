import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const syncPermissionToRoleSchema = z.object({
  roleUuid: z.string().uuid(),
  permissionUuids: z
    .string()
    .uuid()
    .array()
    .refine((value) => {
      return !value || value.length == 0;
    }, 'permissionUuids array must contain at least one permission uuid'),
});
export class SyncPermissionToRoleDto extends createZodDto(syncPermissionToRoleSchema) {}
