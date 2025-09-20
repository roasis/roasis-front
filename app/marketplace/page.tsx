"use client";
import Image from "next/image";
import { useState } from "react";
import CustomDropdown from "@/src/components/ui/CustomDropdown";

// Define a type for the artwork object
interface Artwork {
  id: number;
  title: string;
  artist: string;
  verifier: string;
  price: string;
  imageUrl: string;
}

// This is mock data. In a real application, you would fetch this from an API.
const artworks: Artwork[] = [
  {
    id: 1,
    title: "Hello",
    artist: "Artist name",
    verifier: "Verified by Soho Art Collective",
    price: "850 RLUSD",
    imageUrl: "/cat.jpg", // We'll need to add a placeholder image to /public
  },
  {
    id: 2,
    title: "Hello",
    artist: "Artist name",
    verifier: "Verified by Soho Art Collective",
    price: "850 RLUSD",
    imageUrl: "/cat.jpg",
  },
  {
    id: 3,
    title: "Hello",
    artist: "Artist name",
    verifier: "Verified by Soho Art Collective",
    price: "850 RLUSD",
    imageUrl: "/cat.jpg",
  },
  {
    id: 4,
    title: "Hello",
    artist: "Artist name",
    verifier: "Verified by Soho Art Collective",
    price: "850 RLUSD",
    imageUrl: "/cat.jpg",
  },
];

const mediumOptions = ["All", "Oil on Canvas", "Polish Stell", "Digital Print on Aluminum"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

const ArtworkCard = ({ artwork }: { artwork: Artwork }) => (
  <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
    <Image src={artwork.imageUrl} alt={artwork.title} width={300} height={300} className="w-full object-cover" />
    <div className="p-4 text-white">
      <h3 className="font-bold">{artwork.title}</h3>
      <p className="text-sm text-gray-400">{artwork.artist}</p>
      <p className="text-xs text-gray-500 mt-1">{artwork.verifier}</p>
      <p className="text-right font-bold mt-4">{artwork.price}</p>
    </div>
  </div>
);

export default function MarketplacePage() {
  const [selectedMedium, setSelectedMedium] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Newest");

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold">Marketplace</h1>
      <p className="text-gray-400 mt-2 mb-8">Discover gallery-verified artworks from around the world</p>

      <div className="bg-[#1A1A1A] p-4 rounded-lg mb-8">
        <div className="grid grid-cols-2 gap-4">
            <CustomDropdown 
              label="Medium"
              options={mediumOptions}
              selected={selectedMedium}
              onSelect={setSelectedMedium}
            />
            <CustomDropdown 
              label="Sort By"
              options={sortOptions}
              selected={selectedSort}
              onSelect={setSelectedSort}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}
