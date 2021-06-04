import { NextApiRequest, NextApiResponse } from "next"

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let { amount } = req.body

    const session = await stripe.checkout.sessions.create({ 
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Nickname',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    })

    res.json({ id: session.id });
  }
}
