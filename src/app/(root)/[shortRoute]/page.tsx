import { PrismaClient } from '@/generated/prisma';
import { notFound, permanentRedirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function RedirectPage({ params }: { params: Promise<{ shortRoute: string }> }) {
  const { shortRoute } = await params;

  const record = await prisma.url.findUnique({
    where: { shortRoute },
  });

  if (!record) {
    notFound();
  }

  permanentRedirect(record.originalUrl);
}
