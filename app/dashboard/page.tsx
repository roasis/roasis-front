'use client';
import GalleryDashboard from '@/src/components/dashboard/GalleryDashboard';
import { useRole } from '@/src/hooks/useRole';

export default function DashboardPage() {
  const role = useRole();

  if (role === 'GALLERY') {
    return <GalleryDashboard />;
  }
  return null;
}
