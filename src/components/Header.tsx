import Link from 'next/link'

export default function Home() {

  return (
    <header className="flex justify-center w-full sticky bg-gray-600 p-2">
      <div className="flex flex-row items-center justify-between max-w-5xl w-full">
        <h1 className="text-6xl mr-8 text-white">
          Eternity
        </h1>

        <div className="flex">
          <div className="text-lg mr-8 text-white" >
            <Link href="/">
              Lista
        </Link>
          </div>

          <div className="text-lg mr-8 text-white" >
            <Link href="/about">
              Sobre
        </Link>
          </div>
        </div>
      </div>
    </header>
  );
}