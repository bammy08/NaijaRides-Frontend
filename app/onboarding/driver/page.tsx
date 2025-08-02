'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { becomeDriver } from '@/store/slices/driverSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DriverFormInputs = {
  carMake: string;
  carModel: string;
  carYear: string;
  licensePlate: string;
  availableSeats: number;
  bio: string;
  experience: string;
  preferredRoutes: string;
  profilePhoto: FileList;
  driverLicenseImage: FileList;
};

export default function DriverOnboardingPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DriverFormInputs>({
    mode: 'onChange',
  });

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error('You must be signed in to access this page');
        router.push('/login');
      } else if (user.role === 'driver' && user.driverProfile) {
        toast.info('You already completed onboarding');
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  const onSubmit = async (data: DriverFormInputs) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'preferredRoutes' && typeof value === 'string') {
          const routesArray = value
            .split(',')
            .map((route: string) => route.trim())
            .filter(Boolean);

          routesArray.forEach((route: string | Blob) =>
            formData.append('preferredRoutes[]', route)
          );
        } else if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value.toString());
        }
      });

      await dispatch(becomeDriver(formData)).unwrap();

      toast.success('Driver profile submitted successfully!', {
        description: 'Your account is now being reviewed',
      });
      router.push('/dashboard');
    } catch (error) {
      toast.error('Submission failed', {
        description: 'Could not submit your driver profile. Please try again.',
      });
    }
  };

  // Nigerian car makes for dropdown
  const nigerianCarMakes = [
    'Toyota',
    'Honda',
    'Ford',
    'Nissan',
    'Hyundai',
    'Kia',
    'Mercedes-Benz',
    'BMW',
    'Lexus',
    'Mitsubishi',
    'Volkswagen',
    'Peugeot',
    'Renault',
    'Chevrolet',
    'Volvo',
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 bg-gradient-to-br from-green-50 to-amber-50">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
        <div className="bg-green-600 p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
              <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
              <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
            Drive with NaijaRide
          </h1>
          <p className="mt-2 text-green-100">
            Join Nigeria&apos;s premier carpooling network - Earn while you
            commute!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >
          {/* Vehicle Information Section */}
          <div className="border-b border-green-100 pb-6">
            <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              Vehicle Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label className="text-green-700">Car Make *</Label>
                <Controller
                  name="carMake"
                  control={control}
                  rules={{ required: 'Car make is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select car make" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianCarMakes.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.carMake && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.carMake.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-green-700">Car Model *</Label>
                <Input
                  {...register('carModel', {
                    required: 'Car model is required',
                    minLength: {
                      value: 2,
                      message: 'Model must be at least 2 characters',
                    },
                  })}
                  placeholder="e.g. Corolla, Camry"
                />
                {errors.carModel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.carModel.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label className="text-green-700">Car Year *</Label>
                <Input
                  {...register('carYear', {
                    required: 'Car year is required',
                    pattern: {
                      value: /^(19|20)\d{2}$/,
                      message: 'Enter a valid year (e.g. 2015)',
                    },
                    min: {
                      value: 2000,
                      message: 'Car must be year 2000 or newer',
                    },
                    max: {
                      value: new Date().getFullYear() + 1,
                      message: `Year cannot be newer than ${
                        new Date().getFullYear() + 1
                      }`,
                    },
                  })}
                  placeholder="e.g. 2020"
                />
                {errors.carYear && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.carYear.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-green-700">License Plate *</Label>
                <Input
                  {...register('licensePlate', {
                    required: 'License plate is required',
                    pattern: {
                      value: /^[A-Z]{3} [0-9]{3}[A-Z]{0,2}$/,
                      message: 'Use Nigerian format (e.g. ABC 123XY)',
                    },
                  })}
                  placeholder="e.g. ABC 123XY"
                />
                {errors.licensePlate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.licensePlate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-green-700">Available Seats *</Label>
              <Input
                type="number"
                {...register('availableSeats', {
                  required: 'Seat count is required',
                  min: {
                    value: 1,
                    message: 'At least 1 seat required',
                  },
                  max: {
                    value: 10,
                    message: 'Maximum 10 seats allowed',
                  },
                })}
                className="mt-1 w-32"
              />
              {errors.availableSeats && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.availableSeats.message}
                </p>
              )}
            </div>
          </div>

          {/* Driver Information Section */}
          <div className="border-b border-green-100 pb-6">
            <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
              Driver Information
            </h2>

            <div className="mt-4">
              <Label className="text-green-700">Bio *</Label>
              <Textarea
                {...register('bio', {
                  required: 'Bio is required',
                  minLength: {
                    value: 50,
                    message: 'Bio must be at least 50 characters',
                  },
                  maxLength: {
                    value: 300,
                    message: 'Bio cannot exceed 300 characters',
                  },
                })}
                placeholder="Tell riders about yourself and your vehicle..."
                className="mt-1 min-h-[100px]"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <Label className="text-green-700">Driving Experience *</Label>
              <Textarea
                {...register('experience', {
                  required: 'Experience is required',
                  minLength: {
                    value: 30,
                    message: 'Please provide more details (min 30 characters)',
                  },
                  maxLength: {
                    value: 500,
                    message: 'Experience cannot exceed 500 characters',
                  },
                })}
                placeholder="How long have you been driving? What routes are you familiar with?"
                className="mt-1 min-h-[100px]"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <Label className="text-green-700">Preferred Routes *</Label>
              <Input
                {...register('preferredRoutes', {
                  required: 'At least one route is required',
                  pattern: {
                    value: /^[a-zA-Z\s\-]+(,\s*[a-zA-Z\s\-]+)*$/,
                    message:
                      'Separate routes with commas (e.g. Lagos-Ibadan, Abuja-Kaduna)',
                  },
                })}
                placeholder="e.g. Lagos-Ibadan, Abuja-Kaduna, PHC-Enugu"
              />
              {errors.preferredRoutes && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preferredRoutes.message}
                </p>
              )}
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
                  clipRule="evenodd"
                />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
              Required Documents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <Label className="text-green-700">Profile Photo *</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-50 file:text-green-700 file:text-sm"
                  {...register('profilePhoto', {
                    required: 'Profile photo is required',
                    validate: {
                      fileType: (files) =>
                        files[0]?.type.includes('image/') ||
                        'Only image files are allowed',
                      fileSize: (files) =>
                        files[0]?.size <= 5 * 1024 * 1024 ||
                        'File size must be less than 5MB',
                    },
                  })}
                />
                {errors.profilePhoto && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profilePhoto.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-green-700">
                  Driver&apos;s License *
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-50 file:text-green-700 file:text-sm"
                  {...register('driverLicenseImage', {
                    required: "Driver's license is required",
                    validate: {
                      fileType: (files) =>
                        files[0]?.type.includes('image/') ||
                        'Only image files are allowed',
                      fileSize: (files) =>
                        files[0]?.size <= 5 * 1024 * 1024 ||
                        'File size must be less than 5MB',
                    },
                  })}
                />
                {errors.driverLicenseImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.driverLicenseImage.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-8 py-6 text-lg w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          By submitting this form, you agree to NaijaRide&apos;s{' '}
          <a href="#" className="text-green-600 hover:underline">
            Terms of Service
          </a>{' '}
          and acknowledge our{' '}
          <a href="#" className="text-green-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
