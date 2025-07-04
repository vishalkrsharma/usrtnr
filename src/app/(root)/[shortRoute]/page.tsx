import prisma from '@/lib/prisma';
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { headers } from 'next/headers';

const RedirectPage = async ({ params }: { params: Promise<{ shortRoute: string }> }) => {
  const { shortRoute } = await params;

  const record = await prisma.url.findUnique({
    where: { shortRoute },
  });

  if (!record) {
    notFound();
  }

  if (!record.doAnalyze) {
    redirect(record.originalUrl);
  }

  const headersList = await headers();

  // Print all headers as an object
  const headersObj = Object.fromEntries(headersList.entries());
  console.log(headersObj);

  // Create analytics record in background
  prisma.analytics
    .create({
      data: {
        shortRoute,
        ip: headersList.get('x-forwarded-for') || headersList.get('x-real-ip'),
        userAgent: headersList.get('user-agent'),
        referer: headersList.get('referer'),
        host: headersList.get('host'),
        acceptLanguage: headersList.get('accept-language'),
      },
    })
    .catch(console.error);

  permanentRedirect(record.originalUrl);
};

export default RedirectPage;
