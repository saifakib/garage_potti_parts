import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const partsEntriesSchema = z.object({
  vendorUuid: z.string().uuid(),
  cashMemoNo: z.string(),
  parts: z.array(
    z.object({
      partsUuid: z.string().uuid(),
      quantity: z.number(),
      indPrice: z.number(),
      amount: z.number(),
    }),
  ),
  totalAmount: z.number(),
  documents: z.string().optional(),
  description: z.string().optional(),
});

export class PartsEntriesDto extends createZodDto(partsEntriesSchema) {}
