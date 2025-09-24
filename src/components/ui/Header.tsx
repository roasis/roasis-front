'use client';
import { useSession } from '@walletconnect/modal-sign-react';
import WalletConnectButton from '../wallet/WalletConnectButton';
import WalletDisconnectButton from '../wallet/WalletDisconnectButton';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations, useLocale } from 'next-intl';

export default function Header() {
  const session = useSession();
  const t = useTranslations('Header');
  const locale = useLocale();

  return (
    <header className="flex items-center justify-around p-6 text-white">
      <div className="flex items-center space-x-8">
        <Link href={`/${locale}`}>
          <Image src="/roasis.png" alt="logo" width={100} height={28} />
        </Link>
        <nav className="flex items-center space-x-6 text-sm">
          <Link href={`/${locale}/marketplace`} className="hover:text-gray-300">
            {t('marketplace')}
          </Link>
          <Link href={`/${locale}/artists`} className="hover:text-gray-300">
            {t('artists')}
          </Link>
          <Link href={`/${locale}/galleries`} className="hover:text-gray-300">
            {t('galleries')}
          </Link>
          <Link href={`/${locale}/dashboard`} className="hover:text-gray-300">
            {t('dashboard')}
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
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
