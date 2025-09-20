'use client';
import GalleryDashboard from '@/src/components/dashboard/GalleryDashboard';
import GeneralDashboard from '@/src/components/dashboard/GeneralDashboard';

import { useRole } from '@/src/hooks/useRole';
import { UserRole } from '@/src/dto/auth';

export default function DashboardPage() {
  const role = useRole();

  if (role === UserRole.GALLERY) {
    return <GalleryDashboard />;
  } else if (role === UserRole.USER) {
    return <GeneralDashboard />;
  }
  return null;
}
