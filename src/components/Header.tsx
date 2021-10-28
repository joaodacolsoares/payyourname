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
    </header>
  );
}