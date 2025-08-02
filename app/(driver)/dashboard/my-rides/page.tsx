/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDriverRides,
  cancelRide,
  completeRide,
  clearRideState,
} from '@/store/slices/rideSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

const DriverRides = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { driverRides, loading, error, success } = useSelector(
    (state: RootState) => state.rides
  );

  useEffect(() => {
    dispatch(fetchDriverRides());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Action completed successfully');
      dispatch(fetchDriverRides()); // refresh list
      dispatch(clearRideState());
    }
    if (error) {
      toast.error(error);
      dispatch(clearRideState());
    }
  }, [success, error, dispatch]);

  const handleCancel = (rideId: string) => {
    if (confirm('Are you sure you want to cancel this ride?')) {
      dispatch(cancelRide(rideId));
    }
  };

  const handleComplete = (rideId: string) => {
    if (confirm('Mark this ride as completed?')) {
      dispatch(completeRide(rideId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Published Rides</h1>

      {loading && (
        <div className="flex items-center justify-center py-10">
          <Loader className="animate-spin mr-2" />
          Loading...
        </div>
      )}

      {!loading && driverRides.length === 0 && (
        <p className="text-gray-500">
          You haven&apos;t published any rides yet.
        </p>
      )}

      {!loading && driverRides.length > 0 && (
        <div className="space-y-6">
          {driverRides.map((ride: any) => (
            <div
              key={ride._id}
              className="border rounded-md p-4 shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                  {ride.fromCity} → {ride.toCity}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(ride.departureTime).toLocaleString()}
                </span>
              </div>
              <p className="text-sm mb-1">
                Pickup: <strong>{ride.pickupPoint}</strong>
              </p>
              <p className="text-sm mb-1">
                Dropoff: <strong>{ride.dropoffPoint}</strong>
              </p>
              <p className="text-sm mb-1">
                Seats: {ride.availableSeats} | ₦{ride.pricePerSeat} / seat
              </p>
              <p className="text-sm mb-2">
                Status:{' '}
                <span
                  className={`font-medium ${
                    ride.status === 'active'
                      ? 'text-green-600'
                      : ride.status === 'cancelled'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {ride.status}
                </span>
              </p>
              <div className="flex gap-2">
                {ride.status === 'active' && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => handleCancel(ride._id)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleComplete(ride._id)}
                    >
                      Mark as Completed
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverRides;
