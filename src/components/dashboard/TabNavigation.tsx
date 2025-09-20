'use client';

import {
  GalleryDashboardTabs,
  GeneralDashboardTabs,
} from '@/src/types/dashboard';

interface TabNavigationProps<
  T extends GalleryDashboardTabs | GeneralDashboardTabs
> {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

export default function TabNavigation<
  T extends GalleryDashboardTabs | GeneralDashboardTabs
>({ tabs, activeTab, onTabChange }: TabNavigationProps<T>) {
  return (
    <div className="flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`text-lg font-medium transition-colors ${
            activeTab === tab
              ? 'text-white border-b-2 border-primary pb-2'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
