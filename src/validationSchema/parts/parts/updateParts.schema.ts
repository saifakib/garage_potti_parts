import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updatePartsSchema = extendApi(
  z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    alertQty: z.number().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
    description: z.string().optional(),
    categoryUuid: z.string().uuid().optional(),
    partsCategoryOptionsEntities: z.array(z.string().uuid()).optional(),
    brandUuid: z.string().uuid().optional(),
    modelUuids: z.array(z.string().uuid()).optional(),
    engineUuids: z.array(z.string().uuid()).optional(),
    yearUuids: z.array(z.string().uuid()).optional(),
    vehicleTypeUuids: z.array(z.string().uuid()).optional(),
  }),
);

export class UpdatePartsDto extends createZodDto(updatePartsSchema) {}
