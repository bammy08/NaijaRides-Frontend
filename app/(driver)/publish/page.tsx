'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { publishRide, clearRideState } from '@/store/slices/rideSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type FormData = {
  fromCity: string;
  toCity: string;
  pickupPoint: string;
  dropoffPoint: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  distance?: number;
};

export default function PublishRidePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, success, error } = useAppSelector((state) => state.rides);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    dispatch(publishRide(data));
  };

  useEffect(() => {
    if (success) {
      toast.success('Ride published successfully');
      reset();
      dispatch(clearRideState());
      router.push('/dashboard/my-rides');
    }
    if (error) {
      toast.error(error);
      dispatch(clearRideState());
    }
  }, [success, error]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Publish Ride</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* From City */}
        <div>
          <Label htmlFor="fromCity">From City</Label>
          <Input
            id="fromCity"
            placeholder="e.g. Lagos"
            {...register('fromCity', { required: 'Required' })}
          />
          {errors.fromCity && (
            <p className="text-red-500 text-sm">{errors.fromCity.message}</p>
          )}
        </div>

        {/* To City */}
        <div>
          <Label htmlFor="toCity">To City</Label>
          <Input
            id="toCity"
            placeholder="e.g. Ibadan"
            {...register('toCity', { required: 'Required' })}
          />
          {errors.toCity && (
            <p className="text-red-500 text-sm">{errors.toCity.message}</p>
          )}
        </div>

        {/* Pickup Point */}
        <div>
          <Label htmlFor="pickupPoint">Pickup Point</Label>
          <Input
            id="pickupPoint"
            placeholder="E.g. Ojota Bus Park"
            {...register('pickupPoint', {
              required: 'Pickup point is required',
            })}
          />
          {errors.pickupPoint && (
            <p className="text-sm text-red-500">{errors.pickupPoint.message}</p>
          )}
        </div>

        {/* Dropoff Point */}
        <div>
          <Label htmlFor="dropoffPoint">Dropoff Point</Label>
          <Input
            id="dropoffPoint"
            placeholder="E.g. Dugbe Roundabout"
            {...register('dropoffPoint', {
              required: 'Dropoff point is required',
            })}
          />
          {errors.dropoffPoint && (
            <p className="text-sm text-red-500">
              {errors.dropoffPoint.message}
            </p>
          )}
        </div>

        {/* Departure Time */}
        <div>
          <Label htmlFor="departureTime">Departure Time</Label>
          <Input
            id="departureTime"
            type="datetime-local"
            {...register('departureTime', { required: 'Required' })}
          />
          {errors.departureTime && (
            <p className="text-red-500 text-sm">
              {errors.departureTime.message}
            </p>
          )}
        </div>

        {/* Available Seats */}
        <div>
          <Label htmlFor="availableSeats">Available Seats</Label>
          <Input
            id="availableSeats"
            type="number"
            min={1}
            {...register('availableSeats', { required: 'Required' })}
          />
          {errors.availableSeats && (
            <p className="text-red-500 text-sm">
              {errors.availableSeats.message}
            </p>
          )}
        </div>

        {/* Price Per Seat */}
        <div>
          <Label htmlFor="pricePerSeat">Price Per Seat (₦)</Label>
          <Input
            id="pricePerSeat"
            type="number"
            min={0}
            {...register('pricePerSeat', { required: 'Required' })}
          />
          {errors.pricePerSeat && (
            <p className="text-red-500 text-sm">
              {errors.pricePerSeat.message}
            </p>
          )}
        </div>

        {/* Distance */}
        <div>
          <Label htmlFor="distance">Distance (km)</Label>
          <Input
            id="distance"
            type="number"
            min={0}
            step="0.1"
            placeholder="e.g. 130.5"
            {...register('distance')}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Ride'}
        </Button>
      </form>
    </div>
  );
}
