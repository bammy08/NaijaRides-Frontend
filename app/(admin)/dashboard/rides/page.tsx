/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchAllRides,
  cancelRide,
  clearRideState,
} from '@/store/slices/rideSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Loader,
  XCircle,
  Search,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

const AdminRidesList = () => {
  const dispatch = useAppDispatch();
  const { allRides, loading, error, success } = useAppSelector(
    (state) => state.rides
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchAllRides());

    return () => {
      dispatch(clearRideState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);

    if (success) {
      toast.success('Ride cancelled successfully');
      dispatch(fetchAllRides());
      dispatch(clearRideState());
    }
  }, [error, success, dispatch]);

  const handleCancelRide = (rideId: string) => {
    if (window.confirm('Are you sure you want to cancel this ride?')) {
      dispatch(cancelRide(rideId));
    }
  };

  const filteredRides = allRides.filter((ride: any) => {
    const searchLower = searchTerm.toLowerCase();

    const matchSearch =
      ride.driver?.firstName?.toLowerCase().includes(searchLower) ||
      ride.driver?.lastName?.toLowerCase().includes(searchLower) ||
      ride.driver?.email?.toLowerCase().includes(searchLower) ||
      ride.fromCity?.toLowerCase().includes(searchLower) ||
      ride.toCity?.toLowerCase().includes(searchLower);

    const matchStatus =
      statusFilter === 'all' ? true : ride.status === statusFilter;

    return matchSearch && matchStatus;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-blue-600 w-12 h-12 mb-3" />
        <p className="text-gray-600">Loading rides data...</p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Rides Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage all rides and monitor their status
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search rides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-5 text-base"
            />
          </div>

          <Select
            onValueChange={(value) => setStatusFilter(value)}
            value={statusFilter}
          >
            <SelectTrigger className="py-5 text-base">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <div className="bg-gray-50 rounded-lg flex items-center justify-center p-4">
            <p className="text-gray-700">
              <span className="font-bold">{filteredRides.length}</span> rides
              found
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">
            {allRides.length}
          </div>
          <div className="text-sm text-gray-600">Total Rides</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div className="text-2xl font-bold text-green-600">
            {allRides.filter((r: any) => r.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">
            {allRides.filter((r: any) => r.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
          <div className="text-2xl font-bold text-red-600">
            {allRides.filter((r: any) => r.status === 'cancelled').length}
          </div>
          <div className="text-sm text-gray-600">Cancelled</div>
        </div>
      </div>

      {/* Rides List */}
      {filteredRides.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-gray-400 w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No rides found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {filteredRides.map((ride: any) => (
              <motion.div
                key={ride._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Route Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <MapPin className="text-blue-600 w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            {ride.fromCity}{' '}
                            <ArrowRight className="mx-2 w-4 h-4" />{' '}
                            {ride.toCity}
                          </h2>
                          <p className="text-gray-600 mt-1 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(ride.departureTime).toLocaleDateString()}
                            <span className="mx-2">•</span>
                            {new Date(ride.departureTime).toLocaleTimeString(
                              [],
                              { hour: '2-digit', minute: '2-digit' }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Users className="text-gray-500 w-4 h-4" />
                            <span>{ride.availableSeats} seats</span>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                          <div className="font-medium">
                            ₦{ride.pricePerSeat}{' '}
                            <span className="text-gray-500 text-sm">
                              / seat
                            </span>
                          </div>
                        </div>
                        <div
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            statusColors[ride.status] ||
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {ride.status}
                        </div>
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div className="border-l border-gray-200 pl-6">
                      <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" /> Driver
                      </h3>
                      <div>
                        <p className="font-medium">
                          {ride.driver?.firstName || 'Unknown'}{' '}
                          {ride.driver?.lastName || ''}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {ride.driver?.email || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {ride.status === 'active' && (
                        <Button
                          variant="destructive"
                          className="gap-2"
                          onClick={() => handleCancelRide(ride._id)}
                        >
                          <XCircle className="w-4 h-4" /> Cancel Ride
                        </Button>
                      )}
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AdminRidesList;
