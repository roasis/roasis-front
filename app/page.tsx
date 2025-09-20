import { BorderBeam } from '@/components/ui/border-beam';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-20">
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
          Invest in Authenticity
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover and acquire authenticated artworks, <br />
          exclusively verified by the world's leading galleries.
        </p>
        <Link href="marketplace">
          <button
            className="text-white font-bold py-3 px-21 rounded-full text-lg  hover:shadow-xl/40 shadow-red-500/50 "
            style={{
              backgroundImage: 'url(/pain.png)',
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
