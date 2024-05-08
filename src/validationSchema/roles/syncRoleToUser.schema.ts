import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const syncRoleToUserSchema = z.object({
  roleUuid: z.string().uuid(),
  userUuid: z.string().uuid(),
});
export class SyncRoleToUserDto extends createZodDto(syncRoleToUserSchema) {}
