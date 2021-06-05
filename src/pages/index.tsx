import Head from 'next/head'
import Header from '../components/Header'
import RankingList from '../components/RankingList'
import Nickname from '../interfaces/Nickname'
import { loadStripe } from '@stripe/stripe-js'
import ProductSession from '../components/ProductSession'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { PrismaClient } from '@prisma/client'
import { NicknameTransformer } from '../transformer/NicknameTransformer'
import { useState } from 'react'

const prisma = new PrismaClient();

const stripeTestPromise = loadStripe('pk_test_51IyfoeG8cr2ZNrKwwE36Nd7s2ZsCw7iHPAS9Lc52SiCX0PwvdiLUnZzDj5R3dF7AENbia5dh51sUmUjyoPvHxrKY00X09AGlYm');
interface HomeProps {
  nicknameList: Nickname[]
}

export default function Home({ nicknameList }: HomeProps) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState()

  const handleClick = async () => {
    const stripe = await stripeTestPromise;
    const response = await axios.post("/api/create-checkout-session", {
      nickname: name,
      amount: (amount || 0) * 100
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

  const onNameChange = (event) => {
    const { value } = event.target
    setName(value)
  }

  const onAmountChange = (event) => {
    const { value } = event.target
    setAmount(value)
  }

  return (
    <div className='min-h-screen flex items-center flex-col'>
      <Head>
        <title>Eternity</title>
        <meta name='description' content='Eternity App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header/>

      <div className='max-w-5xl w-full mt-8'>
        <div className='flex flex-col items-stretch justify-between mb-8 sm:flex-row'>
          <div className='p-5 bg-gray-100 rounded-lg w-full sm:w-2/4 mr-2 flex flex-col'>
            <input className='mb-4 p-4 rounded' placeholder='Name' onChange={onNameChange} value={name}/>
            <input className='p-4 rounded' placeholder='US$ 0,00 ' onChange={onAmountChange} value={amount} />
          </div>
          <div className='w-full sm:w-2/4'>
            <ProductSession handleClick={handleClick} price={amount}/>
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
