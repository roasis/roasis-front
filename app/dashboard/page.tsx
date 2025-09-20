'use client';
import GalleryDashboard from '@/src/components/dashboard/GalleryDashboard';
import GeneralDashboard from '@/src/components/dashboard/GeneralDashboard';

import { useRole } from '@/src/hooks/useRole';

export default function DashboardPage() {
  const role = useRole();

  if (role === 'GALLERY') {
    return <GalleryDashboard />;
  } else if (role === 'USER') {
    return <GeneralDashboard />;
  }
  return null;
}
