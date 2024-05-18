import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateVendorSchema = extendApi(
  z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    mobile: z.string().optional(),
    email: z.string().optional(),
    documents: z.string().optional(),
    description: z.string().optional(),
  }),
);

export class UpdateVendorDto extends createZodDto(updateVendorSchema) {}
