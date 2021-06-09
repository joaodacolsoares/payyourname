import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import RankingList from '../components/RankingList'
import Nickname from '../interfaces/Nickname'
import { loadStripe } from '@stripe/stripe-js'
import ProductSession from '../components/ProductSession'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NicknameTransformer } from '../transformer/NicknameTransformer'
import { useState } from 'react'
import prisma from '../lib/prisma'

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
    <div className='min-h-screen flex items-center flex-col bg-background scroll-snap-none relative'>
      <Head>
        <title>Eternity</title>
        <meta name='description' content='Eternity App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-full mt-8 px-4 max-w-screen-2xl z-10'>
        <Header/>

        <div className='flex flex-col items-center justify-between mb-8 sm:flex-row mt-6'>
          <div className='rounded-lg w-full lg:w-3/5 lg:mr-12 flex flex-col'>
            <h1 className='leading-snug text-4xl font-bold text-white lg:leading-snug lg:text-6xl'>Leave Your Mark <br/>like <span className='text-main'>Pipo</span></h1>
            <p className='text-1x1 lg:text-2xl text-white mt-3'>
              We want to make 1 US$ in the internet to prove to our parents. loren ipsun sdafjasjd gfjsda gjsadg asdgj 
            </p>
          </div>
          <div className='w-full mt-8 lg:w-2/5 lg:mt-0 '>
            <ProductSession handleClick={handleClick} price={amount}/>
          </div>
        </div>

        <RankingList persons={nicknameList}/>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const nicknames = await prisma.nicknameEntity.findMany({
    include: {
      donations: true
    },
  })

  return {
    props: {
      nicknameList: nicknames.map<Nickname>(NicknameTransformer.mapTo)
    }
  }
}
