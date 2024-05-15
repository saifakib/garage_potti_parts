import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const yearSchema = extendApi(
  z.object({
    year: z.string().min(4, 'Please enter a valid year').max(4, 'Please enter a valid year'),
  }),
);

export class YearDto extends createZodDto(yearSchema) {}
