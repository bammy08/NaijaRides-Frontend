'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Car, User, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { Button } from './ui/button';
import Image from 'next/image';
import { getDriverProfile } from '@/store/slices/driverSlice';
import { useAppDispatch } from '@/store/hooks';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Logged in user from auth slice
  const user = useSelector((state: RootState) => state.auth.user);

  // Driver profile from driverSlice
  const { driverProfile } = useSelector((state: RootState) => state.driver);

  // Pick photo from either driverProfile or user
  const profilePhoto =
    driverProfile?.profilePhoto || user?.profilePhoto || null;

  // First name from driverProfile or user
  const firstName = driverProfile?.firstName || user?.firstName || '';
  useEffect(() => {
    dispatch(getDriverProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    router.push('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 w-10 h-10 rounded-full flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                NaijaRides
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/routes"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Search Rides
            </Link>
            <Link
              href="/onboarding/driver"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Offer Ride
            </Link>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <div className="bg-emerald-100 w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                      {profilePhoto ? (
                        <Image
                          src={profilePhoto}
                          alt="Profile"
                          width={36}
                          height={36}
                          className="rounded-full object-cover border-2 border-gray-100 w-9 h-9"
                        />
                      ) : (
                        <User className="h-5 w-5 text-emerald-700" />
                      )}
                    </div>
                    {firstName && (
                      <span className="text-sm font-medium text-gray-800">
                        {firstName}
                      </span>
                    )}
                    <ChevronDown
                      className={`h-4 w-4 text-gray-600 transition-transform ${
                        isProfileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/my-rides"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b"
                      >
                        My Rides
                      </Link>
                      <Link
                        href="/dashboard/messages"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b"
                      >
                        Messages
                      </Link>
                      <Link
                        href="/dashboard/payment"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Payment Methods
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 mt-1 border-t"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-slate-700 hover:text-emerald-600 cursor-pointer"
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all min-w-[100px]"
                    onClick={() => router.push('/register')}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              href="/routes"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
            >
              Search Rides
            </Link>
            <Link
              href="/onboarding/driver"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
            >
              Offer Ride
            </Link>

            {user ? (
              <div className="pt-2">
                <div className="px-3 py-2 text-sm font-medium text-gray-500">
                  My Account
                </div>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/my-rides"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  My Rides
                </Link>
                <Link
                  href="/dashboard/messages"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  Messages
                </Link>
                <Link
                  href="/payment"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  Payment Methods
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-emerald-600 hover:bg-emerald-50"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
