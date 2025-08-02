'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Car, User, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
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
              href="/"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/routes"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Find Rides
            </Link>
            <Link
              href="/onboarding/driver"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              Offer Ride
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              About Us
            </Link>
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-slate-700 font-medium">
                    Welcome, {user?.firstName || 'User'}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
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
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
            >
              Home
            </Link>
            <Link
              href="/routes"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
            >
              Find Rides
            </Link>
            <Link
              href="/offer-ride"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
            >
              Offer Ride
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
            >
              About Us
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-emerald-600 hover:bg-emerald-50"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
