import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from "next"
import { DonationEntity, NicknameEntity, PrismaClient } from '@prisma/client'
import prisma from '../../lib/prisma';

const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

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

      await createNicknameIfNotExists(nickname);
      await createDonation(nickname, amount);

      res.status(200);
    }
  }
}

const createNicknameIfNotExists = async (nickname: string) => {
  const nicknameEntity = await prisma.nicknameEntity.findFirst({ where: { name: nickname } });
  if (!nicknameEntity) {
    await prisma.nicknameEntity.create({
      data: {
        name: nickname
      }
    })
  }
}

const createDonation = async (nickname: string, amountToBeAdded: string) => {
  await prisma.donationEntity.create({
    data: {
      amount: Number.parseFloat(amountToBeAdded),
      nickname: nickname
    }
  });
}
