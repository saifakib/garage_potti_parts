import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateEngineSchema = extendApi(
  z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
);

export class UpdateEngineDto extends createZodDto(updateEngineSchema) {}
