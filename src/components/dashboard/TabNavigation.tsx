'use client';

import Button from '@/src/components/ui/Button';
import { PlusIcon } from '@/src/components/icons';
import { DashboardTabs } from '@/src/types/dashboard';
import { DASHBOARD_TABS } from '@/src/constants/dashboard';

interface TabNavigationProps {
  activeTab: DashboardTabs;
  onTabChange: (tab: DashboardTabs) => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const tabs = DASHBOARD_TABS;

  return (
    <div className="flex items-center justify-between mb-8">
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

      <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors">
        <PlusIcon />
        <span>Invite New Artist</span>
      </Button>
    </div>
  );
}
