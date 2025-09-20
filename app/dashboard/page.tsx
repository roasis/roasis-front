'use client';
import GalleryDashboard from '@/src/components/dashboard/GalleryDashboard';
import GeneralDashboard from '@/src/components/dashboard/GeneralDashboard';

import { useRole } from '@/src/hooks/useRole';
import { UserRole } from '@/src/dto/auth';

export default function DashboardPage() {
  const { role, isLoading, error } = useRole();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    throw error;
  }

  if (role === UserRole.GALLERY) {
    return <GalleryDashboard />;
  } else if (role === UserRole.USER) {
    return <GeneralDashboard />;
  }

  return null;
}
