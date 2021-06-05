import Head from "next/head";
import Header from '../components/Header';

export default function About() {
  return (
    <div className='min-h-screen flex items-center flex-col'>
      <Head>
        <title>Eternity</title>
        <meta name='description' content='Eternity App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header/>
    </div>
  )
}