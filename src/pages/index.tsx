import Head from 'next/head'
import RankingList from '../components/RankingList'
import Person from '../interfaces/Person'

export default function Home() {
  const persons : Person[] = [
    { name: 'Pipo'},
    { name: 'Aca'},
    { name: 'Proko'}
  ]

  return (
    <div className='bg-gray-800 text-white min-h-screen p-6 flex items-center flex-col'>
      <Head>
        <title>Eternity</title>
        <meta name="description" content="Eternity App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='max-w-7xl w-full'>
        <h1 className='text-5xl mb-6'>
          Eternity
        </h1>

        <RankingList persons={persons}/>
      </div>
      
      
    </div>
  )
}
