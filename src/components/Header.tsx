import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <header className="flex flex-row items-center justify-between w-full">
      <Image alt="Picture of the author" height="71px" src="/logo.svg" width="77px" />
    </header>
  );
}
