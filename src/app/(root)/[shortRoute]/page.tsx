import { prisma } from '@/lib/db';
import { notFound, permanentRedirect } from 'next/navigation';

const RedirectPage = async ({ params }: { params: Promise<{ shortRoute: string }> }) => {
  const { shortRoute } = await params;

  const record = await prisma.url.findUnique({
    where: { shortRoute },
  });

  if (!record) {
    notFound();
  }

  permanentRedirect(record.originalUrl);
};

export default RedirectPage;
