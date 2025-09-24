import { getTranslations } from 'next-intl/server';

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ArtistPage' });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl">{t('preparingUpdates')}</h1>
        <p className="text-sm text-gray-500 mt-2">Current locale: {locale}</p>
      </div>
    </div>
  );
}
