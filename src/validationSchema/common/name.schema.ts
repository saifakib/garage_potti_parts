import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const nameSchema = extendApi(
  z.object({
    name: z.string(),
  }),
);

export class NameDto extends createZodDto(nameSchema) {}
