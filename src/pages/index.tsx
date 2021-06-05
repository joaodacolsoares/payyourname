import Head from 'next/head'
import RankingList from '../components/RankingList'
import Nickname from '../interfaces/Nickname'
import { loadStripe } from '@stripe/stripe-js'
import ProductSession from '../components/ProductSession'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { PrismaClient } from '@prisma/client'
import { NicknameTransformer } from '../transformer/NicknameTransformer'

const prisma = new PrismaClient();

const stripeTestPromise = loadStripe('pk_test_51IyfoeG8cr2ZNrKwwE36Nd7s2ZsCw7iHPAS9Lc52SiCX0PwvdiLUnZzDj5R3dF7AENbia5dh51sUmUjyoPvHxrKY00X09AGlYm');
interface HomeProps {
  nicknameList: Nickname[]
}

export default function Home({ nicknameList }: HomeProps) {

  const handleClick = async () => {
    const stripe = await stripeTestPromise;
    const response = await axios.post("/api/create-checkout-session", {
      nickname: 'Proko',
      amount: 110
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
    <div className='min-h-screen flex items-center flex-col'>
      <Head>
        <title>Eternity</title>
        <meta name='description' content='Eternity App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header/>

      <div className='max-w-5xl w-full mt-8'>
        <div className='flex flex-col items-center justify-end mb-8 sm:flex-row'>
          <div className='w-full sm:w-1/3'>
            <ProductSession handleClick={handleClick}/>
          </div>
        </div>

        <RankingList persons={nicknameList}/>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const nicknames = await prisma.nicknameEntity.findMany({
    orderBy: [{
      amount: 'desc'
    }]
  })

  return {
    props: {
      nicknameList: nicknames.map<Nickname>(NicknameTransformer.mapTo)
    }
  }
}
