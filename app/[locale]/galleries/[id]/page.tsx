'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getGalleryById, getArtistsByGalleryId } from '@/src/api/galleries';
import type { Gallery, GalleryArtist } from '@/src/dto/gallery';
import { useTranslations } from 'next-intl';

const ArtistCard = ({ artist }: { artist: GalleryArtist }) => (
  <div className="bg-[#1A1A1A] rounded-lg p-4 flex items-center space-x-4 group">
    <div className="relative w-16 h-16 rounded-full overflow-hidden">
      <Image
        src={artist.profile_image_url || '/cat.jpg'} // Fallback image
        alt={artist.name}
        layout="fill"
        objectFit="cover"
        className="group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div>
      <h4 className="font-bold text-white">{artist.name}</h4>
      <p className="text-sm text-gray-400">{artist.email}</p>
    </div>
  </div>
);

export default function GalleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [artists, setArtists] = useState<GalleryArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('Galleries');

  useEffect(() => {
    if (!id) return;

    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const [galleryData, artistsData] = await Promise.all([
          getGalleryById(id),
          getArtistsByGalleryId(id),
        ]);
        setGallery(galleryData);
        setArtists(artistsData);
      } catch (err) {
        setError('Failed to fetch gallery details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [id]);

  if (loading)
    return <p className="p-8 text-center text-white">{t('loading')}</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;
  if (!gallery)
    return <p className="p-8 text-center text-white">{t('not-found')}</p>;

  return (
    <div className="p-8 text-white">
      {/* Section 1: Gallery Details */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={gallery.profile_image_url || '/cat.jpg'}
            alt={gallery.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">{gallery.name}</h1>
          <p className="text-gray-400 mt-2 text-lg">{gallery.description}</p>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-6">
            <span className="text-gray-500">{gallery.email}</span>
            {gallery.website && (
              <Link
                href={gallery.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brend hover:underline"
              >
                {t('link')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Artists in this Gallery */}
      <div>
        <h2 className="text-3xl font-bold mb-6">{t('id-header')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artists.length > 0 ? (
            artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">{t('no-artists')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
