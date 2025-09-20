import { BorderBeam } from '@/components/ui/border-beam';
import { Highlighter } from '@/components/ui/highlighter';
import { Meteors } from '@/components/ui/meteors';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-20">
      <Meteors />
      <div
        className="relative overflow-hidden w-full max-w-6xl mx-auto border border-gray-800 rounded-2xl p-24"
        style={{
          backgroundImage: 'url(/Rectangle-home.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <BorderBeam duration={12} size={120} />

        <h1 className="text-6xl font-bold text-white mb-4">
          <Highlighter action="underline" color="#87CEFA">
            Invest in Authenticity
          </Highlighter>{' '}
        </h1>
        <p className="text-base text-gray-300 mb-8">
          Discover and acquire authenticated artworks, <br />
          exclusively verified by the world's leading galleries.
        </p>
        <Link href="marketplace">
          <button
            className="text-white font-bold py-3 px-21 rounded-full text-lg hover:shadow-xl/40 shadow-blue-500/50"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(/pain.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            Explore the Marketplace
          </button>
        </Link>
      </div>
    </main>
  );
}
