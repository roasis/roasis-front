'use client';
import { useDisconnect } from '@walletconnect/modal-sign-react';
import { getSdkError } from '@walletconnect/utils';
import { SessionTypes } from '@walletconnect/types';
import Button from '@/src/components/ui/Button';
import { useTranslations } from 'next-intl';

export default function WalletDisconnectButton({
  session,
}: {
  session: SessionTypes.Struct;
}) {
  const { disconnect, loading: isDisconnecting } = useDisconnect({
    topic: session?.topic,
    reason: getSdkError('USER_DISCONNECTED'),
  });

  const t = useTranslations('Wallet-btn');

  const onDisconnect = async () => {
    try {
      await disconnect();
      console.info('disconnected');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onClick={onDisconnect}
      disabled={isDisconnecting}
      className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {t('onDisconnect')}
    </Button>
  );
}
