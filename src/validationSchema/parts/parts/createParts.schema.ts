import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { nameSchema } from '../../common/name.schema';

export const createPartsSchema = nameSchema.extend({
  price: z.number(),
  alert_qty: z.number(),
  description: z.string().optional(),
  categoryUuid: z.string().uuid(),
  partsCategoryOptionsEntities: z.array(z.string().uuid()).optional(),
  brandUuid: z.string().uuid().optional(),
  modelUuids: z.array(z.string().uuid()).optional(),
  engineUuids: z.array(z.string().uuid()).optional(),
  yearUuids: z.array(z.string().uuid()).optional(),
  vehicleTypeUuids: z.array(z.string().uuid()).optional(),
});

export class CreatePartsDto extends createZodDto(createPartsSchema) {}
