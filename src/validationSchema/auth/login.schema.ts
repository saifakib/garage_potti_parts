import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
const bdPhoneRegex = new RegExp(/^[\+]?8801[3-9][0-9]{8}$/);

export const loginSchema = extendApi(
  z
    .object({
      userId: z.string().optional(),
      email: z.string().email({ message: 'Email should be a valid email' }).optional(),
      mobile: z.string().regex(bdPhoneRegex, 'Invalid phone number!').optional(),
      password: z.string(),
    })
    .superRefine((data, ctx) => {
      if (!data.email && !data.mobile && !data.userId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Provide one of identification value from email | mobile | userId',
          fatal: true,
        });
        return z.NEVER;
      }
      if ((data.email && data.mobile) || (data.email && data.userId) || (data.mobile && data.userId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Provide one identification value',
          fatal: true,
        });
        return z.NEVER;
      }
      return true;
    }),
);

export class LoginDto extends createZodDto(loginSchema) {}
