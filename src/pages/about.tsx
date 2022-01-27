import Head from 'next/head';

import Header from '../components/Header';

export default function About() {
  return (
    <div className="min-h-screen flex items-center flex-col">
      <Head>
        <title>Eternity - About</title>
        <meta content="Eternity App" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />
    </div>
  );
}
