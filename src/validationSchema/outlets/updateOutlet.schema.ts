import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const updateOutletSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export class UpdateOutletDto extends createZodDto(updateOutletSchema) {}
