import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const userProfileSchema = extendApi(
  z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    address: z.string().optional(),
    gender: z.enum(['MEN', 'WOMEN', 'OTHER']).optional(),
    dob: z.date().optional(),
  }),
);

export class UserProileDto extends createZodDto(userProfileSchema) {}
