import { createZodDto } from '@anatine/zod-nestjs';
import { nameSchema } from '@/validationSchema/common/name.schema';
import { z } from 'zod';

export const createCategorySchema = nameSchema.extend({
  image: z.string().optional(),
});

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
