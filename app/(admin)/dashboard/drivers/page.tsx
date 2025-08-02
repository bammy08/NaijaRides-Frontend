'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  fetchAllDrivers,
  approveDriver,
  rejectDriver,
  clearAdminDriverState,
} from '@/store/slices/adminDriverSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  Download,
  User,
  Car,
  Mail,
  Phone,
  FileBadge,
  UserCheck,
  UserX,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';

const AdminDriverList = () => {
  const dispatch = useAppDispatch();
  const { drivers, loading, error, successMessage } = useSelector(
    (state: RootState) => state.adminDrivers
  );
  const [expandedDriverId, setExpandedDriverId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminDriverState());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearAdminDriverState());
    }
  }, [error, successMessage, dispatch]);

  const handleApprove = (id: string) => {
    dispatch(approveDriver(id));
  };

  const handleReject = (id: string) => {
    dispatch(rejectDriver(id));
  };

  const toggleExpand = (id: string) => {
    setExpandedDriverId(expandedDriverId === id ? null : id);
  };

  const downloadImage = (url: string, filename: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
      })
      .catch(() => toast.error('Failed to download image'));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Driver Applications
          </h1>
          <p className="text-gray-500 mt-2">
            Review and manage driver applications
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => dispatch(fetchAllDrivers())}
          disabled={loading}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh List
        </Button>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-5 bg-white animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-200 rounded-full w-16 h-16" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="bg-gray-200 rounded w-20 h-8"></div>
              </div>
            </div>
          ))}
        </div>
      ) : drivers.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Car className="text-gray-400" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">
            No applications yet
          </h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            There are no driver applications to review at this time.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {drivers.map((driver) => (
            <div
              key={driver._id}
              className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => toggleExpand(driver._id)}
              >
                <div className="flex items-center gap-4">
                  {driver?.driverProfile?.profilePhoto ? (
                    <Image
                      src={driver.driverProfile.profilePhoto}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-full object-cover border-2 border-gray-100"
                    />
                  ) : (
                    <div className="bg-gray-100 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center">
                      <User className="text-gray-400" size={24} />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-lg truncate">
                        {driver.firstName} {driver.lastName}
                      </h2>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          driver.driverProfile?.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : driver.driverProfile?.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {driver.driverProfile?.status || 'pending'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span className="truncate max-w-[200px]">
                          {driver.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{driver.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="gap-1"
                        disabled={driver.driverProfile?.status === 'approved'}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(driver._id);
                        }}
                      >
                        <UserCheck size={16} />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-1"
                        disabled={driver.driverProfile?.status === 'rejected'}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(driver._id);
                        }}
                      >
                        <UserX size={16} />
                        Reject
                      </Button>
                    </div>
                    <div className="text-gray-400">
                      {expandedDriverId === driver._id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {expandedDriverId === driver._id && (
                <div className="border-t px-5 py-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Car className="text-gray-500" size={18} /> Vehicle
                        Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Car Model</p>
                          <p className="font-medium">
                            {driver.driverProfile?.carModel || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Car Year</p>
                          <p className="font-medium">
                            {driver.driverProfile?.carYear || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">License Plate</p>
                          <p className="font-medium">
                            {driver.driverProfile?.licensePlate || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            Available Seats
                          </p>
                          <p className="font-medium">
                            {driver.driverProfile?.availableSeats || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Car Make</p>
                          <p className="font-medium">
                            {driver.driverProfile?.carMake || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            Preferred Routes
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {driver.driverProfile?.preferredRoutes?.length ? (
                              driver.driverProfile.preferredRoutes.map(
                                // Fixed: Added types for route and index
                                (route: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                                  >
                                    {route}
                                  </span>
                                )
                              )
                            ) : (
                              <p className="font-medium">-</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <FileBadge className="text-gray-500" size={18} />{' '}
                        License Verification
                      </h3>
                      {driver.driverProfile?.driverLicenseImage ? (
                        <div className="space-y-4">
                          <div className="border rounded-lg overflow-hidden bg-white p-2 inline-block">
                            <Image
                              src={driver.driverProfile.driverLicenseImage}
                              alt="Driver License"
                              width={300}
                              height={180}
                              className="rounded-md object-contain"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                downloadImage(
                                  driver.driverProfile!.driverLicenseImage,
                                  `${driver.firstName}_${driver.lastName}_license.jpg`
                                )
                              }
                              className="gap-1"
                            >
                              <Download size={16} />
                              Download License
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 border-2 border-dashed rounded-lg bg-gray-50">
                          <FileBadge
                            className="mx-auto text-gray-400 mb-2"
                            size={24}
                          />
                          <p className="text-gray-500">
                            No license image uploaded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDriverList;
