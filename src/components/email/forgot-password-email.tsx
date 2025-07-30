import EmailConfig from '@/components/email/email-config';
import { Container, Text, Button, Hr, Section } from '@react-email/components';

const ForgotPasswordEmail = ({ name, email, resetToken }: { name: string; email: string; resetToken: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;

  return (
    <EmailConfig>
      <Container className='mx-auto max-w-2xl'>
        <Section className='bg-card text-card-foreground flex flex-col items-stretch gap-4 rounded-xl border shadow-sm p-6 my-8'>
          {/* Header */}
          <Section className='text-center'>
            <Text className='leading-none font-semibold text-2xl text-foreground'>Reset Your Password 🔐</Text>
            <Text className='text-muted-foreground text-sm'>Secure your usrtnr account</Text>
          </Section>

          {/* Content */}
          <Section>
            <Text className='text-lg font-medium text-foreground'>Hello {name}! 👋</Text>
            <Text className='text-muted-foreground text-sm leading-relaxed'>
              We received a request to reset your password for your usrtnr account. If you made this request, click the button below to create a new password.
            </Text>

            {/* Security Info */}
            <Section>
              <Text className='font-medium text-foreground text-lg'>Why reset your password?</Text>
              <Section>
                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>🔒</span> Account security
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Keep your account safe and secure</Text>
                </Section>

                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>🔄</span> Fresh start
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Create a new, strong password</Text>
                </Section>

                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>⚡</span> Quick access
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Get back to creating short links</Text>
                </Section>
              </Section>
            </Section>

            <Hr className='my-6 border-border' />

            {/* Call to Action */}
            <Section className='text-center mb-4'>
              <Text className='font-medium text-foreground mb-4'>Ready to reset your password?</Text>

              <Button
                href={resetUrl}
                className='inline-block text-center no-underline bg-primary text-primary-foreground rounded-md px-4 py-2 text-base font-medium leading-5 border-0 cursor-pointer'
              >
                Reset Password
              </Button>
            </Section>

            <Section className='text-center'>
              <Text className='text-muted-foreground text-xs mb-2'>If the button doesn&#39;t work, copy and paste this link into your browser:</Text>
              <Text className='text-muted-foreground text-xs break-all'>{resetUrl}</Text>
            </Section>
          </Section>

          {/* Security Notice */}
          <Section className='bg-muted/50 rounded-lg p-4 mb-4'>
            <Text className='font-medium text-foreground text-sm mb-2'>🔒 Security Notice</Text>
            <Text className='text-muted-foreground text-xs leading-relaxed'>
              This password reset link will expire in 1 hour for your security. If you didn&#39;t request a password reset, you can safely ignore this email.
              Your password will remain unchanged.
            </Text>
          </Section>

          {/* Additional Security Tips */}
          <Section className='bg-muted/30 rounded-lg p-4'>
            <Text className='font-medium text-foreground text-sm mb-2'>💡 Security Tips</Text>
            <Section>
              <Text className='text-muted-foreground text-xs'>• Use a strong, unique password with at least 8 characters</Text>
              <Text className='text-muted-foreground text-xs'>• Include a mix of letters, numbers, and symbols</Text>
              <Text className='text-muted-foreground text-xs'>• Never share your password with anyone</Text>
              <Text className='text-muted-foreground text-xs'>• Consider using a password manager</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section className='border-t pt-6'>
            <Section className='text-center'>
              <Text className='text-muted-foreground text-sm mb-2'>Need help? We&#39;re here for you!</Text>
              <Text className='text-muted-foreground text-xs'>
                This email was sent to {email}. You&#39;re receiving this because you requested a password reset on usrtnr.
              </Text>
            </Section>
          </Section>
        </Section>
      </Container>
    </EmailConfig>
  );
};

export default ForgotPasswordEmail;
