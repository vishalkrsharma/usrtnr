import { forgotPasswordFormSchema, resetPasswordFormSchema, signinFormSchema, signupFormSchema } from '@/schema/auth.schema';
import { z } from 'zod';

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;
export type SigninFormSchemaType = z.infer<typeof signinFormSchema>;
export type ForgotPasswordFormSchemaType = z.infer<typeof forgotPasswordFormSchema>;
export type ResetPasswordFormSchemaType = z.infer<typeof resetPasswordFormSchema>;
