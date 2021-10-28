import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import RankingList from '../components/RankingList'
import Nickname from '../interfaces/Nickname'
import { loadStripe } from '@stripe/stripe-js'
import Checkout from '../components/Checkout'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NicknameTransformer } from '../transformer/NicknameTransformer'
import { useState } from 'react'
import prisma from '../lib/prisma'
import { NicknameProvider } from '../contexts/NicknameContext'
import Presentation from '../components/Presentation'

const stripeTestPromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE);
interface HomeProps {
  nicknameList: Nickname[]
}

export default function Home({ nicknameList }: HomeProps) {
  const handleClick = async (name, amount) => {
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



  return (
    <NicknameProvider nicknames={nicknameList}>
      <div className='min-h-screen flex items-center flex-col bg-background scroll-snap-none relative'>
        <Head>
          <title>Eternity</title>
          <meta name='description' content='Eternity App' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <div className='w-full mt-8 px-12 z-10'>
          <Header/>

          <div className='flex flex-col items-start justify-between mb-8 sm:flex-row mt-6'>
            <div className='relative z-10 rounded-lg w-full lg:w-3/5 lg:mr-16 flex flex-col'>
              <Presentation />
            </div>
            <div className='w-full mt-8 lg:w-2/5 lg:mt-0 '>
              <Checkout handleClick={handleClick} />
            </div>
          </div>

          <RankingList />
        </div>

        <img className='absolute w-96 h-96 -left-36 bottom-14  lg:flex' src="/blob.gif" alt="" />
        <img className='absolute w-64 h-64 right-1 bottom-0 hidden lg:flex' src="/blob.gif" alt="" />
        <img className='absolute w-72 h-72 left-3/4 top-1 hidden lg:flex' src="/blob.gif" alt="" />
      </div>
    </NicknameProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const nicknames = await prisma.nicknameEntity.findMany({
    include: {
      donations: true
    },
  })
  const sortedNicknames = nicknames
    .map<Nickname>(NicknameTransformer.mapTo)
    .sort((nicknameA, nicknameB) => nicknameB.amount - nicknameA.amount);
  return {
    props: {
      nicknameList: sortedNicknames
    }
  }
}
