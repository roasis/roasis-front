'use client';

import { useState } from 'react';
import KPICard from '@/src/components/dashboard/KPICard';
import ArtworkCard from '@/src/components/dashboard/ArtworkCard';
import TabNavigation from '@/src/components/dashboard/TabNavigation';
import { GeneralDashboardTabs } from '@/src/types/dashboard';
import Button from '../ui/Button';
import { PlusIcon } from '../icons';
import { GENERAL_DASHBOARD_TABS } from '@/src/constants/dashboard';
import { useRouter } from 'next/navigation';

export default function GeneralDashboard() {
  const [activeTab, setActiveTab] =
    useState<GeneralDashboardTabs>('Collection');
  const router = useRouter();

  // 샘플 데이터 - 실제로는 API에서 가져올 데이터
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '1,343,432 RLUSD',
      subtitle: 'From Fragment Sales',
    },
    {
      title: 'Artworks',
      value: '2',
      subtitle: 'Published',
    },
    {
      title: 'Fragment Sold',
      value: '5',
      subtitle: 'Across All Artworks',
    },
  ];

  const artworkData = [
    {
      title: 'Hello',
      artistName: 'Artist name',
      verifiedBy: 'Verified by Soho Art Collective',
      soldCount: 6,
      totalCount: 9,
      fragmentPrice: '850 RLUSD',
      imageUrl: '/cat.jpg',
    },
    {
      title: 'Hello',
      artistName: 'Artist name',
      verifiedBy: 'Verified by Soho Art Collective',
      soldCount: 6,
      totalCount: 9,
      fragmentPrice: '850 RLUSD',
      imageUrl: '/cat.jpg',
    },
    {
      title: 'Hello',
      artistName: 'Artist name',
      verifiedBy: 'Verified by Soho Art Collective',
      soldCount: 6,
      totalCount: 9,
      fragmentPrice: '850 RLUSD',
      imageUrl: '/cat.jpg',
    },
    {
      title: 'Hello',
      artistName: 'Artist name',
      verifiedBy: 'Verified by Soho Art Collective',
      soldCount: 6,
      totalCount: 9,
      fragmentPrice: '850 RLUSD',
      imageUrl: '/cat.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Manage your artworks and track your investing performance
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              subtitle={kpi.subtitle}
            />
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-8">
          <TabNavigation
            tabs={GENERAL_DASHBOARD_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <Button
            className="bg-brend/80 hover:bg-brend text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            onClick={() => {
              router.push('/artworks/register');
            }}
          >
            <PlusIcon />
            <span>Add New Artwork</span>
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'Collection' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              My Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artworkData.map((artwork, index) => (
                <ArtworkCard
                  key={index}
                  title={artwork.title}
                  artistName={artwork.artistName}
                  verifiedBy={artwork.verifiedBy}
                  soldCount={artwork.soldCount}
                  totalCount={artwork.totalCount}
                  fragmentPrice={artwork.fragmentPrice}
                  imageUrl={artwork.imageUrl}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'My Artworks' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">My Artworks</h2>
            <p className="text-gray-400">
              My artworks content will be displayed here.
            </p>
          </div>
        )}

        {activeTab === 'Profile' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
            <p className="text-gray-400">
              Profile content will be displayed here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
