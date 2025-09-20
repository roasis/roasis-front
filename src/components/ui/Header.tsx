'use client';
import { useSession } from '@walletconnect/modal-sign-react';
import WalletConnectButton from '../wallet/WalletConnectButton';
import WalletDisconnectButton from '../wallet/WalletDisconnectButton';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const session = useSession();

  return (
    <header className="flex items-center justify-around p-6 text-white">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <Image src="/roasis.png" alt="logo" width={100} height={28} />
        </Link>
        <nav className="flex items-center space-x-6 text-sm">
          <Link href="/marketplace" className="hover:text-gray-300">
            Marketplace
          </Link>
          <Link href="/collection" className="hover:text-gray-300">
            My Collection
          </Link>
          <Link href="/artists" className="hover:text-gray-300">
            Artists
          </Link>
          <Link href="/galleries" className="hover:text-gray-300">
            Galleries
          </Link>

          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search art, artists, galleries"
          className="w-64 bg-transparent border border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {session ? (
          <WalletDisconnectButton session={session} />
        ) : (
          <WalletConnectButton />
        )}
      </div>
    </header>
  );
}
