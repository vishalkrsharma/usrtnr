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
    permanentRedirect(record.originalUrl);
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
        protocol: headersList.get('x-forwarded-proto'),
        port: headersList.get('x-forwarded-port') ? parseInt(headersList.get('x-forwarded-port')!) : undefined,
        fetchMode: headersList.get('sec-fetch-mode'),
        fetchSite: headersList.get('sec-fetch-site'),
        fetchDest: headersList.get('sec-fetch-dest'),
        doNotTrack: headersList.get('dnt') === '1',
        globalPrivacy: headersList.get('sec-gpc') === '1',
        acceptLanguage: headersList.get('accept-language'),
      },
    })
    .catch(console.error);

  redirect(record.originalUrl);
};

export default RedirectPage;
