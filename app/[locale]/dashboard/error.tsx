'use client';

import { Particles } from '@/components/ui/particles';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations('Dashboard');

  return (
    <div className="flex items-center justify-center min-h-screen z-10">
      <Particles className="absolute inset-0 z-0" />

      <div className="text-center">
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t('error')}
        </button>
      </div>
    </div>
  );
}
