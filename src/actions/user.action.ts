'use server';

import { auth } from '@/lib/auth';
import { SigninFormSchemaType, SignupFormSchemaType } from '@/types/form';
import { TResponse } from '@/types/global';
import { User } from 'better-auth';
import { headers } from 'next/headers';

export const signupAction = async (
  values: SignupFormSchemaType
): Promise<
  TResponse<{
    token: string | null;
    user: User;
  }>
> => {
  try {
    const data = await auth.api.signUpEmail({
      body: {
        ...values,
        callbackURL: 'http://localhost:3000/dashboard',
      },
      headers: await headers(),
    });

    return {
      success: true,
      data,
      message: 'Account created successfully',
    };
  } catch (error: unknown) {
    console.log('Error in signupAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('An An unknown error occurred'),
      message: error instanceof Error ? error.message : 'An An unknown error occurred',
    };
  }
};

export const signinAction = async (values: SigninFormSchemaType) => {
  try {
    const res = await auth.api.signInEmail({
      body: {
        ...values,
        callbackURL: 'http://localhost:3000/dashboard',
      },
      headers: await headers(),
    });

    console.log(res);

    if (res.user) {
      return {
        success: true,
        data: res,
        message: 'Login successful',
      };
    } else {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }
  } catch (error) {
    console.log('Error in signinAction:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    };
  }
};

export const signoutAction = async (): Promise<TResponse<{}>> => {
  try {
    const data = await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      data,
      message: 'Logout successful',
    };
  } catch (error) {
    console.log('Error in signoutAction:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Logout failed',
      error: error instanceof Error ? error : new Error('An An unknown error occurred'),
    };
  }
};
