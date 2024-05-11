import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const createCategorySchema = extendApi(
  z.object({
    name: z.string(),
    image: z.string().optional(),
  }),
);

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
