'use client';

import { Fragment } from '@/src/dto/artwork';
import { SessionTypes } from '@walletconnect/types';
import { Wallet } from 'lucide-react';

interface PurchaseCardProps {
  session: SessionTypes.Struct | null;
  selectedFragments: Fragment[];
  fragmentPrice: number;
}

export default function PurchaseCard({
  session,
  selectedFragments,
  fragmentPrice,
}: PurchaseCardProps) {
  if (!session) {
    return (
      <div className="bg-[#1A1A1A] rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2 flex flex-row items-center gap-3">
          <Wallet />
          Purchase Fragments
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Select fragments to invest in this artwork
        </p>
        <p className="text-center text-gray-500 py-4">
          Select fragments from the artwork above to start investing
          <br />
          Click on available (green) fragments to select them
        </p>
      </div>
    );
  }

  const subtotal = selectedFragments.length * fragmentPrice;
  const platformFee = subtotal * 0.03;
  const total = subtotal + platformFee;
  // Mock user balance
  const userBalance = 3000;
  const hasSufficientBalance = userBalance >= total;

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-6 text-white">
      <h2 className="text-xl font-bold mb-4 flex flex-row items-center gap-3">
        <Wallet />
        Purchase Fragments
      </h2>

      {selectedFragments.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Selected Fragments</span>
            <div className="flex items-center gap-2">
              {selectedFragments.map((f) => (
                <span
                  key={f.id}
                  className="border border-gray-600 rounded-md px-2 py-1 text-xs"
                >
                  #{f.position}
                </span>
              ))}
              <span className="bg-green-500 text-black rounded-full px-2.5 py-1 text-xs font-bold">
                {selectedFragments.length}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span>{subtotal.toLocaleString()} RLUSD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Platform Fee (3%)</span>
              <span>{platformFee.toLocaleString()} RLUSD</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{total.toLocaleString()} RLUSD</span>
            </div>
          </div>

          {!hasSufficientBalance && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 text-sm rounded-lg p-3">
              Insufficient balance. You need {total.toLocaleString()} RLUSD but
              have {userBalance.toLocaleString()} RLUSD.
            </div>
          )}

          <button
            className={`w-full font-bold py-3 rounded-lg ${
              hasSufficientBalance
                ? 'bg-brend hover:bg-[#165dfc]'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
            disabled={!hasSufficientBalance}
          >
            {hasSufficientBalance ? 'Own Now' : 'Purchase with XRPL'}
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">
          Select fragments from the artwork above to start investing
          <br />
          Click on available (green) fragments to select them
        </p>
      )}
    </div>
  );
}
