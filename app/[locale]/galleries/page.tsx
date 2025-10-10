'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getGalleries } from '@/src/api/galleries';
import type { Gallery } from '@/src/dto/gallery';
import { Particles } from '@/components/ui/particles';
import { useTranslations } from 'next-intl';

const GalleryCard = ({ gallery }: { gallery: Gallery }) => (
  <div className="bg-[#1A1A1A] rounded-lg overflow-hidden group relative z-10">
    <div className="relative w-full h-48">
      <Image
        src={gallery.profile_image_url || '/cat.jpg'} // Fallback image
        alt={gallery.name}
        layout="fill"
        objectFit="cover"
        className="group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4 text-white">
      <h3 className="font-bold text-lg">{gallery.name}</h3>
      <p className="text-sm text-gray-400 mt-1 truncate">
        {gallery.description}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">{gallery.email}</span>
        {gallery.website && (
          <Link
            href={gallery.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-brend/80 hover:bg-brend text-white px-3 py-1 rounded-full transition-colors"
          >
            Website
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('Galleries');

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await getGalleries();
        setGalleries(data);
      } catch (err) {
        setError('Failed to fetch galleries.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <div className="p-8 text-white">
      <Particles className="absolute inset-0 z-0" />

      <h1 className="text-4xl font-bold">{t('header')}</h1>
      <p className="text-gray-400 mt-2 mb-8">{t('title')}</p>

      {loading && <p className="text-center">{t('loading')}</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleries.map((gallery) => (
            <Link href={`/galleries/${gallery.id}`} key={gallery.id}>
              <GalleryCard gallery={gallery} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
