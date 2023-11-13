import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const urls = await prisma.url.findMany();
    res.status(200).json(urls);
  } else if (req.method === 'POST') {
    const { name, url } = req.body;

    const newUrl = await prisma.url.create({
      data: {
        name,
        url,
      },
    });

    res.status(201).json(newUrl);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
