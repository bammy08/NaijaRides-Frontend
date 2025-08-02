/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchAllRides,
  cancelRide,
  clearRideState,
} from '@/store/slices/rideSlice';
import { Button } from '@/components/ui/button';
import { Loader, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const AdminRidesList = () => {
  const dispatch = useAppDispatch();
  const { allRides, loading, error, success } = useAppSelector(
    (state) => state.rides
  );

  useEffect(() => {
    dispatch(fetchAllRides());

    return () => {
      dispatch(clearRideState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success('Ride cancelled successfully');
      dispatch(fetchAllRides()); // Refresh list
      dispatch(clearRideState());
    }
  }, [error, success, dispatch]);

  const handleCancelRide = (rideId: string) => {
    if (window.confirm('Are you sure you want to cancel this ride?')) {
      dispatch(cancelRide(rideId));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Rides (Admin)</h2>

      {allRides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">From</th>
                <th className="p-2">To</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Seats</th>
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allRides.map((ride: any) => (
                <tr key={ride._id} className="border-t">
                  <td className="p-2">{ride.fromCity}</td>
                  <td className="p-2">{ride.toCity}</td>
                  <td className="p-2">
                    {ride.driver?.firstName || 'N/A'},
                    {ride.driver?.lastName || 'N/A'}
                  </td>
                  <td className="p-2">{ride.driver?.email}</td>
                  <td className="p-2">{ride.availableSeats}</td>
                  <td className="p-2">₦{ride.pricePerSeat}</td>
                  <td className="p-2 capitalize">{ride.status}</td>
                  <td className="p-2">
                    {ride.status === 'active' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelRide(ride._id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRidesList;
