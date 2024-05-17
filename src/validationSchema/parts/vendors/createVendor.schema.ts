import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { nameSchema } from '../../common/name.schema';

export const createVendorSchema = nameSchema.extend({
  address: z.string(),
  mobile: z.string(),
  email: z.string().optional(),
  documents: z.string().optional(),
  description: z.string().optional(),
});

export class CreateVendorDto extends createZodDto(createVendorSchema) {}
