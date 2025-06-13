import type { Metadata } from 'next';

import '@/app/globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { firaCode } from '@/lib/fonts';
import DialogProvider from '@/providers/dialog-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'usrtnr',
  description:
    'A modern and efficient URL shortener service that helps you create short, memorable links from long URLs. Transform lengthy web addresses into concise, shareable links with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={`${firaCode.variable} font-mono antialiased min-h-screen relative`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            richColors
            position='top-center'
          />
          <DialogProvider />
          <ModeToggle className='absolute right-4 bottom-4' />
        </ThemeProvider>
      </body>
    </html>
  );
}
