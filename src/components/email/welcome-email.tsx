import EmailConfig from '@/components/email/email-config';
import { Container, Text, Button, Hr, Section } from '@react-email/components';

const WelcomeEmail = ({ name, email }: { name: string; email: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <EmailConfig>
      <Container className='mx-auto max-w-2xl'>
        {/* Main Card */}
        <Section className='bg-card text-card-foreground flex flex-col items-stretch gap-4 rounded-xl border shadow-sm p-6'>
          {/* Header */}
          <Section className='text-center'>
            <Text className='leading-none font-semibold text-2xl text-foreground'>Welcome to usrtnr! 🎉</Text>
            <Text className='text-muted-foreground text-sm'>Transform long URLs into short, powerful links</Text>
          </Section>

          {/* Content */}
          <Section>
            <Text className='text-lg font-medium text-foreground'>Hello {name}! 👋</Text>
            <Text className='text-muted-foreground text-sm leading-relaxed'>
              Thank you for joining usrtnr, the modern URL shortener that transforms long web addresses into short, memorable, and shareable links with ease.
            </Text>

            {/* Features List */}
            <Section>
              <Text className='font-medium text-foreground text-lg'>What you can do with usrtnr:</Text>
              <Section>
                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>🔗</span> Shorten URLs instantly
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Transform long links into easy-to-share short URLs</Text>
                </Section>

                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>📊</span> Track analytics
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Monitor visits, browsers, countries, and trends</Text>
                </Section>

                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>🌍</span> Geographic insights
                  </Text>
                  <Text className='text-muted-foreground text-xs'>See where your links are being accessed worldwide</Text>
                </Section>

                <Section>
                  <Text className='font-medium text-foreground text-sm'>
                    <span className='text-lg'>🔒</span> Privacy controls
                  </Text>
                  <Text className='text-muted-foreground text-xs'>Toggle analytics on/off for complete control</Text>
                </Section>
              </Section>
            </Section>

            <Hr className='my-6 border-border' />

            {/* Call to Action */}
            <Section className='text-center mb-4'>
              <Text className='font-medium text-foreground mb-4'>Ready to create your first short link?</Text>

              <Button
                href={`${baseUrl}/dashboard`}
                className='inline-block text-center no-underline bg-primary text-primary-foreground rounded-md px-4 py-2 text-base font-medium leading-5 border-0 cursor-pointer'
              >
                Go to Dashboard
              </Button>
            </Section>

            <Section className='text-center'>
              <Button
                href={baseUrl}
                className='inline-block text-center no-underline bg-secondary text-secondary-foreground rounded-md px-4 py-2 text-base font-medium leading-5 border-0 cursor-pointer'
              >
                Try it Now
              </Button>
            </Section>
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

export default WelcomeEmail;
