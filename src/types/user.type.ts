import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email("Invalid email format"),
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

export type RegisterUser = Omit<z.infer<typeof RegisterUserSchema>, "password">;

export const LoginUserSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type LoginUser = z.infer<typeof LoginUserSchema>;
