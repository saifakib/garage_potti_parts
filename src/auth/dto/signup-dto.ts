import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
const bdPhoneRegex = new RegExp(/^[\+]?8801[3-9][0-9]{8}$/);

export const signUpSchema = extendApi(
  z
    .object({
      email: z.string().email({ message: 'Email should be a valid email' }).optional(),
      mobile: z.string().regex(bdPhoneRegex, 'Invalid phone number!').optional(),
      userType: z.enum(['END_USER', 'SERVICE_PROVIDER']),
      password: z.string(),
      signUpMethod: z.enum(['EMAIL', 'MOBILE', 'GUEST']),
    })
    .superRefine((data, ctx) => {
      const { userType, email, mobile } = data;
      if (email && mobile) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'You have to provide email or mobile any one of them',
          fatal: true,
        });
        return z.NEVER;
      }
      if (userType === 'SERVICE_PROVIDER') {
        if (!email && !mobile) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Service providers must provide either email or mobile number',
            fatal: true,
          });
          return z.NEVER;
        }
      }
      if (data.signUpMethod == 'EMAIL' && email == undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email should be provided',
          fatal: true,
        });
        return z.NEVER;
      }
      if (data.signUpMethod == 'MOBILE' && mobile == undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Mobile number should be provided',
          fatal: true,
        });
        return z.NEVER;
      }
      if (data.signUpMethod == 'GUEST' && email == undefined && data.mobile == undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'For guest no need to provide email or mobile number',
          fatal: true,
        });
        return z.NEVER;
      }

      return true;
    }),
);

export class SignUpDto extends createZodDto(signUpSchema) {}
