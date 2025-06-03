import { prisma } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shortRoute } = req.query;

  if (typeof shortRoute !== 'string') {
    return res.status(400).json({ error: 'Invalid shortCode' });
  }

  const record = await prisma.url.findUnique({
    where: { shortRoute },
  });

  if (!record) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(200).json({ originalUrl: record.originalUrl });
}
