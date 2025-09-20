'use client';

import { TrendUpIcon } from '@/src/components/icons';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
}

export default function KPICard({ title, value, subtitle }: KPICardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-white text-2xl font-bold mb-1">{value}</p>
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
        {/* 자세히 보기 버튼 (MVP 떄는 구현 X) */}
        <button type="button" className="cursor-not-allowed">
          <TrendUpIcon />
        </button>
      </div>
    </div>
  );
}
