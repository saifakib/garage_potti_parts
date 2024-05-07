import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const uuidSchema = z
  .string({
    invalid_type_error: 'Uuid is not a valid',
    required_error: 'uuid is required',
  })
  .uuid();

export const uuidObjectSchema = z.object({
  uuid: z
    .string({
      invalid_type_error: 'Uuid is not a valid',
      required_error: 'uuid is required',
    })
    .uuid(),
});

export type UuidDto = z.infer<typeof uuidSchema>;
export class UuidObjectDto extends createZodDto(uuidObjectSchema) {}
