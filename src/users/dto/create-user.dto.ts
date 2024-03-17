import { z } from 'zod'
export const CreateUserSchema = z.object({
    email: z.string({
      required_error: "email is required",
    }).email({
      message: "email shuld be a valid email"
    }),
    name: z.string()
  });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
