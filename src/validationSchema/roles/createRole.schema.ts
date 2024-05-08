import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const createRoleSchema = extendApi(
  z.object({
    name: z.string().regex(/^[A-Z\s\d]+$/, {
      message: 'Name should be in letter word',
    }),
    description: z.string().optional(),
  }),
);

export class CreateRoleDto extends createZodDto(createRoleSchema) {}
