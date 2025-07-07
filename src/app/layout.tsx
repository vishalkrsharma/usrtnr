import type { Metadata } from 'next';
import '@/app/globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { firaCode } from '@/lib/fonts';
import DialogProvider from '@/providers/dialog-provider';
import { Toaster } from '@/components/ui/sonner';
import AlertDialogProvider from '@/providers/alert-dialog-provider';

export const metadata: Metadata = {
  title: 'usrtnr',
  description: 'A modern URL shortener that transforms long web addresses into short, memorable, and shareable links with ease.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
          <AlertDialogProvider />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
