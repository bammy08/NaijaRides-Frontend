'use client';

import { useForm } from 'react-hook-form';
import { Mail, Key, ArrowRight, Car } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestPasswordReset } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

type FormData = {
  email: string;
};

export default function RequestPasswordResetPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const result = await dispatch(requestPasswordReset(data.email));
    if (requestPasswordReset.fulfilled.match(result)) {
      router.push('/reset-password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto bg-gradient-to-r from-green-600 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Key className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                Reset Password
              </span>
            </h1>
            <p className="text-gray-500 mt-3 font-light">
              Enter your email to reset your NaijaRides password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                    errors.email ? 'border-red-300' : 'border-gray-200'
                  } focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition`}
                  placeholder="chinedu@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 border border-red-100">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-medium transition-all duration-300 ${
                loading
                  ? 'opacity-80 cursor-not-allowed'
                  : 'shadow-md hover:shadow-lg'
              } flex items-center justify-center`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Sending Reset Code...
                </span>
              ) : (
                <span className="flex items-center">
                  Send Reset Code <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Remembered your password?{' '}
              <Link
                href="/login"
                className="font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 bg-emerald-50 rounded-lg p-4 flex items-center">
            <Car className="h-5 w-5 text-emerald-600 flex-shrink-0 mr-3" />
            <p className="text-sm text-emerald-700">
              We&apos;ll send a verification code to your email to reset your
              NaijaRides password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
