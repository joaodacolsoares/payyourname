import Head from 'next/head'

export default function Home() {

  return (
    <div className='bg-gray-800 text-white min-h-screen p-6 flex items-center flex-col'>
      <Head>
        <title>Eternity</title>
        <meta name="description" content="Eternity App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='max-w-7xl w-full'>
        <h1 className='text-5xl'>
          Eternity
        </h1>
      </div>
      
      
    </div>
  )
}
