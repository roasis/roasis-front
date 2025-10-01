import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // locale이 undefined이거나 지원하지 않는 locale인 경우 기본값으로 'ko' 사용
  const supportedLocales = ['ko', 'en'];
  const currentLocale =
    locale && supportedLocales.includes(locale) ? locale : 'ko';

  try {
    const messages = (await import(`./messages/${currentLocale}.json`)).default;

    return {
      locale: currentLocale,
      messages,
    };
  } catch (error) {
    console.error(
      `Failed to load messages for locale: ${currentLocale}`,
      error
    );

    // 에러 발생 시 기본 locale(ko) 메시지 로드
    const fallbackMessages = (await import('./messages/ko.json')).default;

    return {
      locale: 'ko',
      messages: fallbackMessages,
    };
  }
});
