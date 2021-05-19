import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Eternity</title>
        <meta name="description" content="Eternity App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen flex items-center justify-center">
        <h1 className="text-5xl">
          Welcome to <strong>Eternity!</strong>
        </h1>
      </main>
    </div>
  )
}
