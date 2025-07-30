import EmailConfig from '@/components/email/email-config';
import { Container, Text, Button, Hr, Section } from '@react-email/components';

const VerificationEmail = ({ name, email, verificationToken }: { name: string; email: string; verificationToken: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const verificationUrl = `${baseUrl}/auth/verify?token=${verificationToken}`;

  return (
    <EmailConfig>
      <Container className='mx-auto max-w-2xl'>
        <Section className='bg-card text-card-foreground flex flex-col items-stretch gap-4 rounded-xl border shadow-sm p-6 my-8'>
          {/* Header */}
          <Section className='text-center'>
            <Text className='leading-none font-semibold text-2xl text-foreground'>Verify Your Email 📧</Text>
            <Text className='text-muted-foreground text-sm'>Complete your usrtnr account setup</Text>
          </Section>

          {/* Content */}
          <Section>
            <Text className='text-lg font-medium text-foreground'>Hello {name}! 👋</Text>
            <Text className='text-muted-foreground text-sm leading-relaxed'>
              Thank you for signing up for usrtnr! To complete your account setup and start creating short links, please verify your email address by clicking
              the button below.
            </Text>

            {/* Verification Info */}
            <Section>
              <Text className='font-medium text-foreground text-lg'>Why verify your email?</Text>
              <Section>
                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>🔐</span> Secure your account
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Ensure only you can access your account</Text>
                </Section>

                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>📊</span> Access analytics
                  </Text>
                  <Text className='text-muted-foreground text-xs'>View detailed insights about your short links</Text>
                </Section>

                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>⚡</span> Full features
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Unlock all usrtnr features and capabilities</Text>
                </Section>

                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>📧</span> Stay updated
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Receive important notifications about your links</Text>
                </Section>
              </Section>
            </Section>

            <Hr className='my-6 border-border' />

            {/* Call to Action */}
            <Section className='text-center mb-4'>
              <Text className='font-medium text-foreground mb-4'>Ready to verify your email?</Text>

              <Button
                href={verificationUrl}
                className='inline-block text-center no-underline bg-primary text-primary-foreground rounded-md px-4 py-2 text-base font-medium leading-5 border-0 cursor-pointer'
              >
                Verify Email Address
              </Button>
            </Section>

            <Section className='text-center'>
              <Text className='text-muted-foreground text-xs mb-2'>If the button doesn&#39;t work, copy and paste this link into your browser:</Text>
              <Text className='text-muted-foreground text-xs break-all'>{verificationUrl}</Text>
            </Section>
          </Section>

          {/* Security Notice */}
          <Section className='bg-muted/50 rounded-lg p-4'>
            <Text className='font-medium text-foreground text-sm mb-2'>🔒 Security Notice</Text>
            <Text className='text-muted-foreground text-xs leading-relaxed'>
              This verification link will expire in 24 hours for your security. If you didn&#39;t create an account on usrtnr, you can safely ignore this email.
            </Text>
          </Section>

          {/* Footer */}
          <Section className='border-t pt-6'>
            <Section className='text-center'>
              <Text className='text-muted-foreground text-sm mb-2'>Need help? We&#39;re here for you!</Text>
              <Text className='text-muted-foreground text-xs'>
                This email was sent to {email}. You&#39;re receiving this because you created an account on usrtnr.
              </Text>
            </Section>
          </Section>
        </Section>
      </Container>
    </EmailConfig>
  );
};

export default VerificationEmail;
