import Link from 'next/link'

export default function Home() {

  return (
    <header className="flex justify-center w-full sticky bg-gray-600 p-2">
      <div className="flex flex-row items-end max-w-5xl w-full">
        <h1 className="text-6xl mr-8">
          Eternity
        </h1>
      
        <div className="text-3xl mr-8" >
        <Link href="/">
          Lista
        </Link>
        </div>
      
        <div className="text-3xl mr-8" >
        <Link href="/about">
          Sobre
        </Link>
        </div>
      </div>
    </header>
  );
}