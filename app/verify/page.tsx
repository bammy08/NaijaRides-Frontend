'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { verifyOtp, resendOtp } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Loader2, Car, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useAppDispatch();
  const {
    user,
    loading,
    error: authError,
  } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all fields are filled
    if (newOtp.every((digit) => digit !== '') && index === 5) {
      // Fix: Use newOtp instead of state otp which might not be updated yet
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const pasteArray = pasteData.split('');
      setOtp(pasteArray);
      // Auto-submit after paste
      setTimeout(() => handleSubmit(pasteData), 100);
    }
  };

  const handleSubmit = async (otpValue?: string) => {
    const otpString = otpValue || otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    const res = await dispatch(
      verifyOtp({ email: user?.email, otp: otpString })
    );
    if (verifyOtp.fulfilled.match(res)) {
      router.push('/');
    }
  };

  const handleResend = () => {
    if (user?.email) {
      dispatch(resendOtp(user.email));
      setResendTimer(30);
      setOtp(['', '', '', '', '', '']);
      setError('');
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="p-8">
          <Link
            href="/register"
            className="flex items-center text-emerald-600 hover:text-emerald-800 mb-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Back to registration</span>
          </Link>

          <div className="text-center mb-8">
            <div className="mx-auto bg-gradient-to-r from-green-600 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              Verify Your Email
            </h1>
            <p className="text-gray-500 mt-3 font-light">
              We sent a verification code to your email for NaijaRides
            </p>
            <p className="text-emerald-600 font-medium mt-1 flex items-center justify-center">
              <Mail className="h-4 w-4 mr-1.5" />
              {user?.email}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter 6-digit verification code
              </label>
              <div className="flex justify-center space-x-2.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-14 text-2xl text-center rounded-lg border ${
                      error ? 'border-red-300' : 'border-gray-200'
                    } focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition
                    shadow-sm hover:shadow-md`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {error && (
                <p className="mt-3 text-center text-sm text-red-500">{error}</p>
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
                  Verifying...
                </span>
              ) : (
                'Verify Account'
              )}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0 || loading}
                className={`text-sm font-medium ${
                  resendTimer > 0 || loading
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-emerald-600 hover:text-emerald-800'
                } flex items-center justify-center mx-auto`}
              >
                {resendTimer > 0 ? (
                  <span>Resend code in {resendTimer}s</span>
                ) : (
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1.5" />
                    Didn&apos;t receive code? Resend
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Still having trouble?{' '}
              <Link
                href="/support"
                className="font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
