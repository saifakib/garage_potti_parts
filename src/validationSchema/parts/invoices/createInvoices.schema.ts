import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const createInvoicesSchema = z.object({
  userName: z.string(),
  userMobile: z.string(),
  userEmail: z.string().email().optional(),
  address: z.string().optional(),
  parts: z.array(
    z.object({
      partsUuid: z.string().uuid(),
      quantity: z.number(),
      indPrice: z.number(),
      amount: z.number(),
    }),
  ),
  totalAmount: z.number(),
  remarks: z.string().optional(),
});

export class CreateInvoicesDto extends createZodDto(createInvoicesSchema) {}
