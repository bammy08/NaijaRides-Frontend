/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
  getDriverProfile,
  updateDriverProfile,
  clearMessages,
} from '@/store/slices/driverSlice';
import Image from 'next/image';

const DriverProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const { driverProfile, user, loading, error, successMessage } = useSelector(
    (state: RootState) => state.driver
  );

  const [formData, setFormData] = useState<any>({});
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getDriverProfile());
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  useEffect(() => {
    if (driverProfile) {
      setFormData({
        carMake: driverProfile.carMake || '',
        carModel: driverProfile.carModel || '',
        carYear: driverProfile.carYear || '',
        licensePlate: driverProfile.licensePlate || '',
        availableSeats: driverProfile.availableSeats || '',
        bio: driverProfile.bio || '',
        experience: driverProfile.experience || '',
        preferredRoutes: driverProfile.preferredRoutes?.join(', ') || '',
      });
    }
  }, [driverProfile]);

  useEffect(() => {
    if (successMessage) {
      setLocalSuccess(successMessage);
      const timer = setTimeout(() => {
        setLocalSuccess(null);
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'profilePhoto' | 'driverLicenseImage'
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'profilePhoto') {
        setProfilePhotoFile(e.target.files[0]);
      } else {
        setLicenseFile(e.target.files[0]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'preferredRoutes') {
        data.append(
          key,
          formData[key].split(',').map((r: string) => r.trim())
        );
      } else {
        data.append(key, formData[key]);
      }
    });

    if (profilePhotoFile) data.append('profilePhoto', profilePhotoFile);
    if (licenseFile) data.append('driverLicenseImage', licenseFile);

    dispatch(updateDriverProfile(data)).then(() => {
      setIsEditing(false);
      setProfilePhotoFile(null);
      setLicenseFile(null);
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      dispatch(clearMessages());
      setLocalSuccess(null);
    }
  };

  if (loading) return <p className="text-center py-8">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
  if (!driverProfile || !user)
    return <p className="text-center py-8">No profile found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      {/* Success Message Banner */}
      {localSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 transition-all duration-300">
          {localSuccess}
        </div>
      )}

      {/* Edit Button at Top */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleEdit}
          className={`px-4 py-2 rounded-full font-medium transition-all ${
            isEditing
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      {!isEditing ? (
        /* Profile View */
        <div>
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-200">
            <div className="relative">
              <Image
                src={driverProfile.profilePhoto}
                alt="Profile photo"
                width={128}
                height={128}
                className="rounded-full border-4 border-emerald-500 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-emerald-500 rounded-full p-1.5">
                <div className="bg-white rounded-full p-1">
                  <span className="text-xs font-bold text-emerald-600">
                    {driverProfile.rating} ★
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>

              <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {driverProfile.status}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {driverProfile.numberOfTrips} trips
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Car Model</p>
              <p className="font-bold">{driverProfile.carModel || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Car Year</p>
              <p className="font-bold">{driverProfile.carYear || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Seats Available</p>
              <p className="font-bold">{driverProfile.availableSeats || '0'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-bold">{driverProfile.experience || 'N/A'}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Car Details */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Vehicle Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Make & Model</p>
                  <p className="font-medium">
                    {driverProfile.carMake} {driverProfile.carModel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">License Plate</p>
                  <p className="font-medium">
                    {driverProfile.licensePlate || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Preferred Routes</p>
                  <p className="font-medium">
                    {driverProfile.preferredRoutes?.join(', ') ||
                      'No preferred routes'}
                  </p>
                </div>
              </div>
            </div>

            {/* License Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Driver License
              </h2>
              <div className="bg-gray-50 p-4 rounded-xl">
                <Image
                  src={driverProfile.driverLicenseImage}
                  alt="Driver License"
                  width={400}
                  height={250}
                  className="rounded-lg object-contain border border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          {driverProfile.bio && (
            <div className="mt-8 bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-3">About Me</h2>
              <p className="text-gray-700 leading-relaxed">
                {driverProfile.bio}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Edit Form */
        <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Update Profile
          </h2>
          {error && (
            <p className="text-red-600 mb-4 p-3 bg-red-50 rounded-lg">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Make
                </label>
                <input
                  type="text"
                  name="carMake"
                  value={formData.carMake || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Model
                </label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Year
                </label>
                <input
                  type="text"
                  name="carYear"
                  value={formData.carYear || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  License Plate
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Seats
                </label>
                <input
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Routes (comma separated)
              </label>
              <input
                type="text"
                name="preferredRoutes"
                value={formData.preferredRoutes || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'profilePhoto')}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver License
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'driverLicenseImage')}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={toggleEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-emerald-600 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DriverProfilePage;
