import Link from 'next/link'
import Image from 'next/image'

export default function Home() {

  return (
    <header className="flex flex-row items-center justify-between w-full">
      <Image
        src='/logo.svg'
        alt="Picture of the author"
        width='77px'
        height='71px' />

      <div className="flex">
        <div className="text-lg mr-8 text-gray-500" >
          <Link href="/about">
            About
          </Link>
        </div>

        <div className="text-lg text-white" >
          <Link href="/">
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}