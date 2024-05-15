import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { nameSchema } from '../../common/name.schema';

export const createEngineSchema = nameSchema.extend({
  image: z.string().optional(),
  description: z.string().optional(),
});

export class CreateEngineDto extends createZodDto(createEngineSchema) {}
