import { createZodDto } from '@anatine/zod-nestjs';
import { nameSchema } from '@/validationSchema/common/name.schema';
import { z } from 'zod';

export const createCategoryOptionSchema = nameSchema.extend({
  categoryUuid: z.string().optional(),
});

export class CreateCategoryOptionDto extends createZodDto(createCategoryOptionSchema) {}
