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
    username: z
      .string()
      .min(1, {
        message: 'Username is required',
      })
      .max(25, {
        message: 'Username must be less than 25 characters',
      })
      .optional(),
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

export const signinFormSchema = baseAuthSchema.pick({ password: true }).extend({
  identifier: z
    .string()
    .trim()
    .min(1, {
      message: 'Username or email is required',
    })
    .max(255, {
      message: 'Username or email must be less than 255 characters',
    })
    .refine(
      (value) => {
        // Check if it looks like an email (contains @ and .)
        const isEmail = value.includes('@') && value.includes('.');

        if (isEmail) {
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        } else {
          // Username validation (alphanumeric, underscores, hyphens, 3-25 characters)
          const usernameRegex = /^[a-zA-Z0-9_-]{3,25}$/;
          return usernameRegex.test(value);
        }
      },
      (value) => {
        const isEmail = value.includes('@') && value.includes('.');
        if (isEmail) {
          return { message: 'Invalid email address' };
        } else {
          return { message: 'Username must be 3-25 characters and contain only letters, numbers, underscores, and hyphens' };
        }
      }
    ),
});

export const forgotPasswordFormSchema = baseAuthSchema.pick({
  email: true,
});

export const resetPasswordFormSchema = baseAuthSchema
  .pick({
    password: true,
  })
  .extend({
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
