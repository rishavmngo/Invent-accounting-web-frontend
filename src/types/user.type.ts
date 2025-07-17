import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email("Invalid email format"),
  name: z.string(),
  fullName: z.string(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const RegisterUserSchema = UserSchema.pick({
  email: true,
  password: true,
  fullName: true,
}).extend({
  confirmPassword: z
    .string()
    .min(8, "Password must contain at least 8 characters"),
});

export type RegisterUser = Omit<
  z.infer<typeof RegisterUserSchema>,
  "confirmPassword"
>;

export const LoginUserSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type LoginUser = z.infer<typeof LoginUserSchema>;
