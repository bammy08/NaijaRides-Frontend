'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If not loading and no user or not admin, redirect
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/unauthorized');
    }
  }, [user, loading, router]);

  // Optional: Prevent flicker while checking user
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-muted">{children}</main>
    </div>
  );
}
