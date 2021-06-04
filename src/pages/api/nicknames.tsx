import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const nicknames = await prisma.nicknameEntity.findMany({
    orderBy: [{
      amount: 'desc'
    }]
  })
  res.json(nicknames);
}
