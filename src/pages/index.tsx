import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAnalytics } from 'use-analytics';

import Checkout from '../components/Checkout';
import Header from '../components/Header';
import Presentation from '../components/Presentation';
import RankingList from '../components/RankingList';
import { NicknameProvider } from '../contexts/NicknameContext';
import Nickname from '../interfaces/Nickname';
import prisma from '../lib/prisma';
import { NicknameTransformer } from '../transformer/NicknameTransformer';

const stripeTestPromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE);
interface HomeProps {
  nicknameList: Nickname[];
}

export default function Home({ nicknameList }: HomeProps) {
  const { track, page } = useAnalytics();

  useEffect(() => {
    page();
  }, []);

  const handleClick = async (name, amount) => {
    if (!amount || !name) return;

    track('open_checkout');

    const stripe = await stripeTestPromise;
    const response = await axios.post('/api/create-checkout-session', {
      nickname: name,
      amount,
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
      <div className="min-h-screen flex items-center flex-col bg-background scroll-snap-none relative">
        <Head>
          <title>Pay Your Name</title>
          <meta content="Pay Your Name App" name="description" />
          <link href="/favicon.ico" rel="icon" />
        </Head>

        <div className="max-w-screen-xl mt-8 px-5 mb-24 md:mb-0 md:px-12 z-10">
          <Header />

          <div className="flex flex-col items-start justify-between mb-8 sm:flex-row mt-6">
            <div className="rounded-lg w-full lg:w-3/5 lg:mr-16 flex flex-col">
              <Presentation />
            </div>
            <div className="w-full mt-8 lg:w-2/5 lg:mt-0 ">
              <Checkout handleClick={handleClick} />
            </div>
          </div>

          <RankingList />
        </div>

        <img className="absolute w-96 h-96 -left-36 bottom-14 lg:flex" src="/blob_1.gif" />
        <img className="absolute w-64 h-64 right-1 bottom-0 hidden lg:flex" src="/blob_2.gif" />
        <img className="absolute w-72 h-72 left-3/4 top-1 hidden lg:flex" src="/blob_3.gif" />
      </div>
    </NicknameProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nicknames = await prisma.nicknameEntity.findMany({
    include: {
      donations: true,
    },
  });
  const sortedNicknames = nicknames
    .map<Nickname>(NicknameTransformer.mapTo)
    .sort((nicknameA, nicknameB) => nicknameB.amount - nicknameA.amount);
  return {
    props: {
      nicknameList: sortedNicknames,
    },
  };
};
