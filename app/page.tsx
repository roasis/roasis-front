export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-center py-20">
      <div
        className="w-full max-w-4xl mx-auto border border-gray-800 rounded-2xl p-16"
        style={{
          backgroundImage: 'url(/Rectangle-home.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-6xl font-bold text-white mb-4">
          Invest in Authenticity
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover and acquire authenticated artworks, <br />
          exclusively verified by the world's leading galleries.
        </p>
        <button className="bg-[linear-gradient(to_right,#FF8DE6,#67C2FF,#A9FFC1,#E53E3E)] text-black font-bold py-3 px-8 rounded-full text-lg">
          Explore the Marketplace
        </button>
      </div>
    </main>
  );
}
