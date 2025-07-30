import { Body, Html, Tailwind } from '@react-email/components';
import { ReactNode } from 'react';

const EmailConfig = ({ children }: { children: ReactNode }) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              // Light theme colors converted from OKLCH to hex
              background: '#f4f4f5', // oklch(0.9551 0 0)
              foreground: '#18181b', // oklch(0.3211 0 0)
              card: '#ffffff', // oklch(0.9702 0 0)
              'card-foreground': '#18181b', // oklch(0.3211 0 0)
              primary: '#3f3f46', // oklch(0.4891 0 0)
              'primary-foreground': '#ffffff', // oklch(1 0 0)
              secondary: '#e4e4e7', // oklch(0.9067 0 0)
              'secondary-foreground': '#18181b', // oklch(0.3211 0 0)
              muted: '#d4d4d8', // oklch(0.8853 0 0)
              'muted-foreground': '#71717a', // oklch(0.5103 0 0)
              border: '#d1d5db', // oklch(0.8576 0 0)
              accent: '#e4e4e7', // oklch(0.8078 0 0)
              'accent-foreground': '#18181b', // oklch(0.3211 0 0)
            },
            fontFamily: {
              sans: ['Inter', 'Arial', 'sans-serif'],
              mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
            },
            borderRadius: {
              DEFAULT: '6px',
              sm: '4px',
              md: '6px',
              lg: '8px',
              xl: '12px',
            },
            boxShadow: {
              xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            },
            spacing: {
              '0': '0px',
              '1': '4px',
              '2': '8px',
              '3': '12px',
              '4': '16px',
              '5': '20px',
              '6': '24px',
              '8': '32px',
              '10': '40px',
              '12': '48px',
              '16': '64px',
              '20': '80px',
              '24': '96px',
            },
          },
        },
      }}
    >
      <Html>
        <Body className='bg-background font-mono m-0 p-0'>{children}</Body>
      </Html>
    </Tailwind>
  );
};

export default EmailConfig;
