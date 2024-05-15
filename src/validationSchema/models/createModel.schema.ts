import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { nameSchema } from '../common/name.schema';

export const createModelSchema = nameSchema.extend({
  image: z.string().optional(),
  description: z.string().optional(),
});

export class CreateModelDto extends createZodDto(createModelSchema) {}
