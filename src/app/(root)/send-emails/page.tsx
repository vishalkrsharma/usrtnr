'use client';

import { sendEmailAction } from '@/actions/email.action';
import WelcomeEmail from '@/components/email/welcome-email';
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
    </main>
  );
};

export default SendEmailsPage;
