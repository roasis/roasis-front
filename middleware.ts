import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',
  localeDetection: false, // 자동 locale 감지 비활성화
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
