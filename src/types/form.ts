import { signinFormSchema, signupFormSchema } from '@/schema/auth.schema';
import { z } from 'zod';

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;
export type SigninFormSchemaType = z.infer<typeof signinFormSchema>;
