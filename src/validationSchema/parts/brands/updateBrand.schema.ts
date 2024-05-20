import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateBrandSchema = extendApi(
  z.object({
    name: z.string().optional(),
    image: z.string().optional(),
  }),
);

export class UpdateBrandDto extends createZodDto(updateBrandSchema) {}
