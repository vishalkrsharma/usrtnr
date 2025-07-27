import { z } from 'zod';

const baseAuthSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'Email is required',
    })
    .max(255, {
      message: 'Email must be less than 255 characters',
    })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(255, {
      message: 'Password must be less than 255 characters',
    }),
});

export const signupFormSchema = baseAuthSchema
  .extend({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    repeatPassword: z
      .string({
        required_error: 'Repeat Password is required',
      })
      .trim()
      .min(6, {
        message: 'Password must be at least 6 characters',
      })
      .max(255, {
        message: 'Repeat Password must be less than 255 characters',
      }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

export const signinFormSchema = baseAuthSchema;
