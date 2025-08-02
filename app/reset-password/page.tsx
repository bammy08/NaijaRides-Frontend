'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetPassword } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Key, ArrowRight, Car } from 'lucide-react';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

type FormData = {
  email: string;
  newPassword: string;
};

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (error) setOtpError(error);
  }, [error]);

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (newOtp.every((digit) => digit !== '')) {
      handleSubmit(onSubmit)();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const pasteArray = pasteData.split('');
      setOtp(pasteArray);
      otpRefs.current[5]?.focus();
      // Auto-submit after paste
      setTimeout(() => handleSubmit(onSubmit)(), 100);
    }
  };

  const onSubmit = async (data: FormData) => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setOtpError('Please enter a 6-digit code');
      return;
    }

    const result = await dispatch(
      resetPassword({
        email: data.email,
        otp: otpString,
        newPassword: data.newPassword,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      router.push('/login');
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
              Enter your email and verification code for NaijaRides
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Verification Code
              </label>
              <div className="flex justify-center space-x-2.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className={`w-12 h-14 text-2xl text-center rounded-lg border ${
                      otpError ? 'border-red-300' : 'border-gray-200'
                    } focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition
                    shadow-sm hover:shadow-md`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {otpError && (
                <p className="mt-3 text-center text-sm text-red-500">
                  {otpError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-lg border ${
                    errors.newPassword ? 'border-red-300' : 'border-gray-200'
                  } focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition`}
                  placeholder="••••••••"
                  {...register('newPassword', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-emerald-600 transition" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-emerald-600 transition" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

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
                  Resetting Password...
                </span>
              ) : (
                <span className="flex items-center">
                  Reset Password <ArrowRight className="h-4 w-4 ml-2" />
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

          <div className="mt-6 bg-emerald-50 rounded-lg p-4 flex items-start">
            <Car className="h-5 w-5 text-emerald-600 flex-shrink-0 mr-3 mt-0.5" />
            <p className="text-sm text-emerald-700">
              Your new password must be at least 6 characters long. For
              security, avoid using easily guessable information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
