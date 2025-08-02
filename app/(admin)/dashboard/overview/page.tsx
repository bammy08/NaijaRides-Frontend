// app/(admin)/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAllDrivers } from '@/store/slices/adminDriverSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { drivers, loading, error } = useAppSelector(
    (state) => state.adminDrivers
  );

  useEffect(() => {
    dispatch(fetchAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>{users.length}</CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Total Drivers</CardTitle>
        </CardHeader>
        <CardContent>{drivers.length}</CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Total Rides</CardTitle>
        </CardHeader>
        <CardContent>{stats.totalRides || 0}</CardContent>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          ₦{stats.totalRevenue?.toLocaleString() || '0'}
        </CardContent>
      </Card> */}
    </div>
  );
}
