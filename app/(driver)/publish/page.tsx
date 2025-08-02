'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { publishRide, clearRideState } from '@/store/slices/rideSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

type FormData = {
  fromCity: string;
  toCity: string;
  pickupPoint: string;
  dropoffPoint: string;
  departureDate: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
};

// Define a type for our field configurations
type FieldConfig = {
  id: keyof FormData;
  label: string;
  type?: string;
  placeholder?: string;
  min?: number | string;
  step?: number | string;
  required: boolean;
};

export default function PublishRidePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, success, error } = useAppSelector((state) => state.rides);
  const [activeField, setActiveField] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const formValues = watch();

  // Properly typed field configurations
  const fields: FieldConfig[] = [
    {
      id: 'fromCity',
      label: 'From City',
      placeholder: 'e.g. Lagos',
      required: true,
    },
    {
      id: 'toCity',
      label: 'To City',
      placeholder: 'e.g. Ibadan',
      required: true,
    },
    {
      id: 'pickupPoint',
      label: 'Pickup Point',
      placeholder: 'E.g. Ojota Bus Park',
      required: true,
    },
    {
      id: 'dropoffPoint',
      label: 'Dropoff Point',
      placeholder: 'E.g. Dugbe Roundabout',
      required: true,
    },
    {
      id: 'departureDate',
      label: 'Departure Date',
      type: 'date',
      required: true,
      min: today,
    },
    {
      id: 'departureTime',
      label: 'Departure Time',
      type: 'time',
      required: true,
    },
    {
      id: 'availableSeats',
      label: 'Available Seats',
      type: 'number',
      min: 1,
      required: true,
    },
    {
      id: 'pricePerSeat',
      label: 'Price Per Seat (₦)',
      type: 'number',
      min: 0,
      required: true,
    },
  ];

  const onSubmit = (data: FormData) => {
    // Combine date and time into a single datetime string
    const rideData = {
      ...data,
      departureTime: `${data.departureDate}T${data.departureTime}`,
    };
    dispatch(publishRide(rideData));
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
  }, [success, error, dispatch, reset, router]);

  useEffect(() => {
    // Check if current field is filled to advance
    const currentField = fields[activeField];
    if (
      currentField &&
      formValues[currentField.id] &&
      !errors[currentField.id]
    ) {
      if (activeField < fields.length - 1) {
        setTimeout(() => setActiveField(activeField + 1), 300);
      }
    }
  }, [formValues, errors, activeField]);

  const handleFieldClick = (index: number) => {
    setActiveField(index);
    // Scroll to the field
    setTimeout(() => {
      if (formRef.current) {
        const fieldElement = formRef.current.querySelector(
          `#${fields[index].id}`
        );
        if (fieldElement) {
          fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
          >
            Publish Your Ride
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 mt-2"
          >
            Fill in your ride details to help travelers find their perfect
            journey
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          <div ref={formRef} className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Progress indicators */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {fields.map((field, index) => (
                  <button
                    key={field.id}
                    type="button"
                    onClick={() => handleFieldClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeField
                        ? 'bg-blue-600 scale-125'
                        : formValues[field.id]
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                    aria-label={`Go to ${field.label} field`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index <= activeField ? 1 : 0.3,
                      y: index <= activeField ? 0 : 20,
                      scale: index === activeField ? 1.02 : 1,
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-5 rounded-xl transition-all duration-300 ${
                      index === activeField
                        ? 'bg-blue-50 border-2 border-blue-200 shadow-sm'
                        : index < activeField
                        ? 'bg-gray-50 border border-gray-100'
                        : 'opacity-30'
                    }`}
                  >
                    <Label
                      htmlFor={field.id}
                      className={`flex items-center mb-2 font-medium ${
                        index === activeField
                          ? 'text-blue-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {field.id === 'departureDate' ? (
                        <Calendar className="w-4 h-4 mr-2" />
                      ) : field.id === 'departureTime' ? (
                        <Clock className="w-4 h-4 mr-2" />
                      ) : null}
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </Label>

                    <div className="relative">
                      <Input
                        id={field.id}
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        min={field.min}
                        step={field.step}
                        className={`text-lg py-4 px-4 rounded-lg transition-all w-full ${
                          index === activeField ? 'ring-2 ring-blue-300' : ''
                        } ${errors[field.id] ? 'border-red-300' : ''}
                        ${field.type === 'time' ? 'pl-10' : ''}`}
                        {...register(
                          field.id,
                          field.required
                            ? { required: 'This field is required' }
                            : {}
                        )}
                        onFocus={() => setActiveField(index)}
                      />
                      {field.type === 'time' && (
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      )}
                    </div>

                    {errors[field.id] && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors[field.id]?.message}
                      </p>
                    )}

                    {index === activeField && index < fields.length - 1 && (
                      <div className="text-sm text-gray-500 mt-3">
                        {formValues[field.id]
                          ? '✓ Field completed'
                          : 'Fill this field to continue'}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg font-medium shadow-lg transition-all transform hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
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
                      Publishing...
                    </span>
                  ) : (
                    'Publish Ride'
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          <p>
            Your ride details will be visible to travelers looking for routes
            you provide.
          </p>
          <p className="mt-1">
            You can edit or cancel your ride anytime from your dashboard.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
