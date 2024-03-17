import { z } from 'zod'
export const SignUpSchema = z.object({
    user_name: z.string(),
    email: z.string({
      required_error: "email is required",
    }).email().optional(),
    password: z.string()
  })

export type SignUpDto = z.infer<typeof SignUpSchema>;
