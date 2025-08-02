/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDriverRides,
  cancelRide,
  completeRide,
  clearRideState,
} from '@/store/slices/rideSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import {
  Loader,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  XCircle,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const DriverRides = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { driverRides, loading, error, success } = useSelector(
    (state: RootState) => state.rides
  );
  const [activeTab, setActiveTab] = useState('all');
  const [expandedRide, setExpandedRide] = useState<string | null>(null);

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

  const toggleRideDetails = (rideId: string) => {
    setExpandedRide(expandedRide === rideId ? null : rideId);
  };

  const filteredRides = driverRides.filter((ride: any) => {
    if (activeTab === 'all') return true;
    return ride.status === activeTab;
  });

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Your Published Rides
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Manage your upcoming rides, view past trips, and track ride status
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['all', 'active', 'completed', 'cancelled'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            className={`rounded-full px-5 py-2 capitalize ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">
            {driverRides.length}
          </div>
          <div className="text-sm text-gray-600">Total Rides</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div className="text-2xl font-bold text-green-600">
            {driverRides.filter((r: any) => r.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Rides</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">
            {driverRides.filter((r: any) => r.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div className="text-2xl font-bold text-red-600">
            {driverRides.filter((r: any) => r.status === 'cancelled').length}
          </div>
          <div className="text-sm text-gray-600">Cancelled</div>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader className="animate-spin text-blue-600 w-12 h-12 mb-3" />
          <p className="text-gray-600">Loading your rides...</p>
        </div>
      )}

      {!loading && filteredRides.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-gray-400 w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No rides found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {activeTab === 'all'
              ? "You haven't published any rides yet."
              : `You don't have any ${activeTab} rides.`}
          </p>
          <Button className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-700">
            Publish Your First Ride
          </Button>
        </div>
      )}

      {!loading && filteredRides.length > 0 && (
        <div className="space-y-6">
          <AnimatePresence>
            {filteredRides.map((ride: any) => (
              <motion.div
                key={ride._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => toggleRideDetails(ride._id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <MapPin className="text-blue-600 w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold text-gray-900">
                            {ride.fromCity}{' '}
                            <ArrowRight className="inline w-4 h-4 mx-1" />{' '}
                            {ride.toCity}
                          </h2>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statusColors[ride.status] ||
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {ride.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          {new Date(ride.departureTime).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          {new Date(ride.departureTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="text-gray-500 w-4 h-4" />
                          <span className="font-medium">
                            {ride.availableSeats} seats
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="font-medium text-gray-900">
                          ₦{ride.pricePerSeat}{' '}
                          <span className="text-gray-500 text-sm">/ seat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedRide === ride._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" /> Pickup
                            Details
                          </h3>
                          <p className="text-gray-800">{ride.pickupPoint}</p>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" /> Dropoff
                            Details
                          </h3>
                          <p className="text-gray-800">{ride.dropoffPoint}</p>
                        </div>

                        <div className="md:col-span-2 pt-4">
                          <div className="flex flex-wrap gap-3">
                            {ride.status === 'active' && (
                              <>
                                <Button
                                  variant="destructive"
                                  className="gap-2"
                                  onClick={() => handleCancel(ride._id)}
                                >
                                  <XCircle className="w-4 h-4" /> Cancel Ride
                                </Button>
                                <Button
                                  variant="secondary"
                                  className="gap-2"
                                  onClick={() => handleComplete(ride._id)}
                                >
                                  <CheckCircle className="w-4 h-4" /> Mark as
                                  Completed
                                </Button>
                              </>
                            )}
                            <Button variant="outline">View Bookings</Button>
                            <Button variant="outline">Edit Details</Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default DriverRides;
