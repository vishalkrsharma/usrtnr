import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
import { sendEmailAction } from '@/actions/email.action';
import { nextCookies } from 'better-auth/next-js';
import { render } from '@react-email/components';
import WelcomeEmail from '@/components/email/welcome-email';
import VerificationEmail from '@/components/email/verification-email';
import ForgotPasswordEmail from '@/components/email/forgot-password-email';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  baseURL: process.env.BETTER_AUTH_URL as string,
  secret: process.env.BETTER_AUTH_SECRET as string,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      // Extract reset token from URL
      const urlObj = new URL(url);
      const resetToken = urlObj.searchParams.get('token') || '';

      const forgotPasswordEmailHtml = await render(
        ForgotPasswordEmail({
          name: user.name.split(' ')[0],
          email: user.email,
          resetToken: resetToken,
        })
      );

      await sendEmailAction({
        to: user.email,
        subject: 'Reset your password - usrtnr',
        html: forgotPasswordEmailHtml,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const verificationEmailHtml = await render(
        VerificationEmail({
          name: user.name.split(' ')[0],
          email: user.email,
          url,
        })
      );

      await sendEmailAction({
        to: user.email,
        subject: 'Verify your email address - usrtnr',
        html: verificationEmailHtml,
      });
    },
    autoSignInAfterVerification: true,
    callbackURL: '/dashboard',
    afterEmailVerification: async (user) => {
      const welcomeEmailHtml = await render(
        WelcomeEmail({
          name: user.name.split(' ')[0],
          email: user.email,
        })
      );

      sendEmailAction({
        to: user.email,
        subject: 'Welcome to usrtnr! 🎉',
        html: welcomeEmailHtml,
      });
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 24 * 60 * 60,
    },
  },
  plugins: [nextCookies()],
});
