import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { nameSchema } from '../common/name.schema';

export const createOutletSchema = nameSchema.extend({
  image: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
});

export class CreateOutletDto extends createZodDto(createOutletSchema) {}
