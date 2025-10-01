'use client';
import { useConnect } from '@walletconnect/modal-sign-react';
import Button from '@/src/components/ui/Button';
import { useState } from 'react';
import { useLogin } from '@/src/hooks/useLogin';
import SelectUserTypeModalContent from '../auth/SelectUserTypeModalContent';
import { useModal } from '@/src/hooks/useModal';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/src/stores/authStore';
import { useTranslations } from 'next-intl';

export default function WalletConnectButton() {
  const t = useTranslations('Wallet-btn');

  const [_account, setAccount] = useState<string | null>(null);
  const { login } = useLogin();
  const setWalletAddress = useAuthStore((state) => state.setWalletAddress);
  const { openModal } = useModal();
  const { connect, loading: isConnecting } = useConnect({
    requiredNamespaces: {
      xrpl: {
        chains: ['xrpl:0', 'xrpl:1'],
        methods: ['xrpl_signTransaction'],
        events: ['chainChanged', 'accountsChanged'],
      },
      eip155: {
        chains: ['eip155:7668', 'eip155:7672'],
        methods: ['eth_sendTransaction', 'personal_sign'],
        events: ['chainChanged', 'accountsChanged'],
      },
    },
  });

  async function onConnect() {
    try {
      const session = await connect();
      const account = session.namespaces.xrpl.accounts[1].split(':')[2];
      setWalletAddress(account);
      setAccount(account);
      await login({ account });
      console.info('connect result', session);
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError && err.response?.status === 403) {
        console.log('Opening SelectUserTypeModal due to 403 error');
        openModal(<SelectUserTypeModalContent />);
      }
    }
  }

  return (
    <Button
      onClick={onConnect}
      disabled={isConnecting}
      className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {t('onConnect')}
    </Button>
  );
}
