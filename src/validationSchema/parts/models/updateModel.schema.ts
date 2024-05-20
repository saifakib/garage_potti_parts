import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateModelSchema = extendApi(
  z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
);

export class UpdateModelDto extends createZodDto(updateModelSchema) {}
