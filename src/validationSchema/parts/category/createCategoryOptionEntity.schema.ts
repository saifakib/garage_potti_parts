import { createZodDto } from '@anatine/zod-nestjs';
import { nameSchema } from '@/validationSchema/common/name.schema';
import { z } from 'zod';

export const createCategoryOptionEntitySchema = nameSchema.extend({
  categoryOptionUuid: z.string().optional(),
});

export class CreateCategoryOptionEntityDto extends createZodDto(createCategoryOptionEntitySchema) {}
