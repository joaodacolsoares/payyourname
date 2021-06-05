import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'

const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { nickname, amount } = session.metadata

      const actualAmount = (await prisma.nicknameEntity.findFirst({ where: { name: nickname }}))?.amount || 0
      await prisma.nicknameEntity.upsert({
        where: {
          name: nickname,
        },
        update: {
          amount: actualAmount + Number.parseFloat(amount),
        },
        create: {
          name: nickname,
          amount: Number.parseFloat(amount),
        },
      })
    }

    res.status(200);
  }
}
