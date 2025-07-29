'use client';

import { sendEmailAction } from '@/actions/email.action';
import WelcomeEmail from '@/components/email/welcome-email';
import VerificationEmail from '@/components/email/verification-email';
import ForgotPasswordEmail from '@/components/email/forgot-password-email';
import { Button } from '@/components/ui/button';
import { render } from '@react-email/components';

const SendEmailsPage = () => {
  return (
    <main className='min-h-screen container mx-auto flex flex-wrap justify-center items-center gap-4'>
      <Button
        onClick={async () => {
          const welcomeEmailHtml = await render(
            WelcomeEmail({
              name: 'aaabbb',
              email: 'aaa',
            })
          );
          sendEmailAction({
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL as string,
            subject: 'Welcome email',
            text: 'Welcome email',
            html: welcomeEmailHtml,
          });
        }}
      >
        Welcome email
      </Button>
      <Button
        onClick={async () => {
          const emailVerificationHtml = await render(
            VerificationEmail({
              name: 'Test User',
              email: 'test@example.com',
              verificationToken: 'test-verification-token-123',
            })
          );
          sendEmailAction({
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL as string,
            subject: 'Verify your email address',
            text: 'Please verify your email address to complete your account setup.',
            html: emailVerificationHtml,
          });
        }}
      >
        Email verification
      </Button>

      <Button
        onClick={async () => {
          const forgotPasswordEmailHtml = await render(
            ForgotPasswordEmail({
              name: 'Test User',
              email: 'test@example.com',
              resetToken: 'test-reset-token-123',
            })
          );
          sendEmailAction({
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL as string,
            subject: 'Reset your password',
            text: 'Please reset your password to secure your account.',
            html: forgotPasswordEmailHtml,
          });
        }}
      >
        Forgot password
      </Button>
    </main>
  );
};

export default SendEmailsPage;
