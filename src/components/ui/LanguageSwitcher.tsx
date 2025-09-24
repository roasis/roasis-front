'use client';

import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // 현재 URL 가져오기
    const url = new URL(window.location.href);
    const currentPath = url.pathname;

    let newPath;

    // URL 패턴에 따라 경로 변경 - 예외 처리
    if (
      currentPath === '/' ||
      currentPath === `/${locale}` ||
      currentPath === `/${locale}/`
    ) {
      newPath = `/${newLocale}`;
    } else if (currentPath.startsWith(`/${locale}/`)) {
      newPath = currentPath.replace(`/${locale}/`, `/${newLocale}/`);
    } else if (currentPath.startsWith(`/${locale}`)) {
      newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${currentPath}`;
    }

    // 직접 location 변경
    window.location.href = newPath + url.search + url.hash;
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="bg-transparent border border-gray-300 rounded-md p-1"
    >
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}
