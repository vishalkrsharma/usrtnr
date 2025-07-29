'use server';

import { auth } from '@/lib/auth';
import { ForgotPasswordFormSchemaType, ResetPasswordFormSchemaType, SigninFormSchemaType, SignupFormSchemaType } from '@/types/form';
import { TResponse } from '@/types/global';
import { User } from 'better-auth';
import { headers } from 'next/headers';

export const socialSigninAction = async ({
  provider,
  callbackUrl,
}: {
  provider: string;
  callbackUrl?: string;
}): Promise<
  TResponse<{
    url: string;
    redirect: boolean;
  }>
> => {
  try {
    const data = await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: callbackUrl || 'http://localhost:3000/dashboard',
      },
    });

    return {
      success: true,
      data: {
        url: data.url || '',
        redirect: data.redirect || false,
      },
      message: 'Social signin successful',
    };
  } catch (error) {
    console.log('Error in socialSigninAction:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An An unknown error occurred',
      error: error instanceof Error ? error : new Error('An An unknown error occurred'),
    };
  }
};

export const signupAction = async (
  values: SignupFormSchemaType,
  callbackUrl?: string
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
        callbackURL: callbackUrl || 'http://localhost:3000/dashboard',
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

export const signinAction = async (values: SigninFormSchemaType, callbackUrl?: string) => {
  try {
    const res = await auth.api.signInEmail({
      body: {
        ...values,
        callbackURL: callbackUrl || 'http://localhost:3000/dashboard',
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

export const signoutAction = async (): Promise<TResponse<null>> => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
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

export const forgotPasswordAction = async (values: ForgotPasswordFormSchemaType): Promise<TResponse<null>> => {
  try {
    const data = await auth.api.forgetPassword({
      body: {
        ...values,
        redirectTo: 'http://localhost:3000/auth/reset-password',
      },
      headers: await headers(),
    });

    console.log(data);

    return {
      success: true,
      message: 'Password reset email sent',
    };
  } catch (error) {
    console.log('Error in forgotPasswordAction:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An An unknown error occurred',
      error: error instanceof Error ? error : new Error('An An unknown error occurred'),
    };
  }
};

export const resetPasswordAction = async ({ values, token }: { values: ResetPasswordFormSchemaType; token: string }): Promise<TResponse<null>> => {
  try {
    await auth.api.resetPassword({
      body: {
        newPassword: values.password,
      },
      query: {
        token,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: 'Password reset successful',
    };
  } catch (error) {
    console.log('Error in resetPasswordAction:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An An unknown error occurred',
      error: error instanceof Error ? error : new Error('An An unknown error occurred'),
    };
  }
};
