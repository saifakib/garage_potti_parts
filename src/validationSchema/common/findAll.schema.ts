import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const stringOrNumber = z.string().or(z.number());
export const findAllSchema = extendApi(
  z.object({
    page: stringOrNumber.optional(),
    limit: stringOrNumber.optional(),
    sort: z.enum(['desc', 'asc']).optional(),
  }),
);
export class FindAllDto extends createZodDto(findAllSchema) {}
