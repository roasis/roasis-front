'use client';

import { useRequest } from '@walletconnect/modal-sign-react';
import { SessionTypes } from '@walletconnect/types';

interface PurchaseCardButtonProps {
  session: SessionTypes.Struct;
  hasSufficientBalance: boolean;
}

const network = 'xrpl:1'; // xrpl:0, xrpl:1

export default function PurchaseCardButton({
  session,
  hasSufficientBalance,
}: PurchaseCardButtonProps) {
  const { request: xrplSendTransaction } = useRequest({
    chainId: network,
    topic: session.topic, // session.topic
    request: {
      method: 'xrpl_signTransaction',
      params: {
        tx_json: {
          TransactionType: 'NFTokenAcceptOffer',
          Account: session.namespaces.xrpl.accounts[1],
          NFTokenSellOffer: 'nft_offer_index_값', // 판매 제안의 인덱스
        },
      },
    },
  });

  const onSendTransaction = async () => {
    const sendTransaction = xrplSendTransaction;

    try {
      const result = await sendTransaction();
      console.info('sendTransaction result', result);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      onClick={onSendTransaction}
      className={`w-full font-bold py-3 rounded-lg ${
        hasSufficientBalance
          ? 'bg-brend hover:bg-[#165dfc]'
          : 'bg-gray-600 cursor-not-allowed'
      }`}
      disabled={!hasSufficientBalance}
    >
      {hasSufficientBalance ? 'Own Now' : 'Purchase with XRPL'}
    </button>
  );
}
