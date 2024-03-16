import { z } from 'zod'
export const SignUpSchema = z.object({
    email: z.string({
      required_error: "email is required",
    }).email(),
    password: z.string(),
    name: z.string().optional()
  });

export type SignUpDto = z.infer<typeof SignUpSchema>;
