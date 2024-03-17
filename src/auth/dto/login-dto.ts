import { z } from 'zod'
export const LoginSchema = z.object({
    email: z.string({
      required_error: "email is required",
    }).email(),
    password: z.string()
  })

export type LoginDto = z.infer<typeof LoginSchema>;
