import Head from 'next/head'
import RankingList from '../components/RankingList'
import Person from '../interfaces/Person'
import { loadStripe } from '@stripe/stripe-js'
import ProductSession from '../components/ProductSession'
import axios from 'axios'


const PUBLIC_KEY = 'pk_test_51IyfoeG8cr2ZNrKwwE36Nd7s2ZsCw7iHPAS9Lc52SiCX0PwvdiLUnZzDj5R3dF7AENbia5dh51sUmUjyoPvHxrKY00X09AGlYm'
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Home() {
  const persons : Person[] = [
    { name: 'Pipo'},
    { name: 'Aca'},
    { name: 'Proko'}
  ]

  const handleClick = async () => {
    const stripe = await stripeTestPromise;
    const response = await axios.post("/api/create-checkout-session", {
      amount: 100
    });
    const session = response.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div className='min-h-screen p-6 flex items-center flex-col'>
      <Head>
        <title>Eternity</title>
        <meta name='description' content='Eternity App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-7xl w-full'>
        <h1 className='text-5xl mb-8'>
          Eternity
        </h1>

        <div className='flex items-center justify-between mb-8'>
          <div className='w-1/3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dignissim bibendum turpis ac aliquet. Nullam non blandit felis. Donec fermentum risus nec</div>
          <div className='w-1/3'>
            <ProductSession handleClick={handleClick}/>
          </div>
        </div>

        <RankingList persons={persons}/>
      </div>
      
      
    </div>
  )
}
