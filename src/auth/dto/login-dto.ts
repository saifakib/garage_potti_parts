import { z } from 'zod'
const bdPhoneRegex = new RegExp(/^[\+]?8801[3-9][0-9]{8}$/);

export const LoginSchema = z.object({
    userId: z.string().optional(),
    email: z.string().email({ message: 'Email should be a valid email'}).optional(),
    mobile: z.string().regex(bdPhoneRegex, 'Invalid phone number!').optional(),
    password: z.string()
  }).refine((data) => {
    if((data.email && data.mobile) || (data.email && data.userId) || (data.mobile && data.userId)) {
      return !((data.email && data.mobile) || (data.email && data.userId) || (data.mobile && data.userId))
      //throw new Error('');
    }
    return true;
  });

export type LoginDto = z.infer<typeof LoginSchema>;
