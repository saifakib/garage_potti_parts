import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateCategorySchema = extendApi(
  z.object({
    name: z.string().optional(),
    image: z.string().optional(),
  }),
);

export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {}
