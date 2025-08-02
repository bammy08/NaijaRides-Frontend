// src/components/HeroSection.js
import React from 'react';
import Link from 'next/link';
import { Car, ArrowRight, MapPin, CalendarDays, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Share Rides, <br />
              Save Money Across Nigeria
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl text-emerald-100">
              NaijaRides connects drivers and passengers for convenient,
              affordable, and eco-friendly carpooling across Nigerian cities.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/routes"
                className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
              >
                Find a Ride <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-black/20 text-white font-bold rounded-lg hover:bg-black/30 transition border border-white/30 flex items-center justify-center"
              >
                Become a Driver
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Users className="h-6 w-6 mr-2" />
                <div>
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-emerald-100">Users</p>
                </div>
              </div>
              <div className="flex items-center">
                <Car className="h-6 w-6 mr-2" />
                <div>
                  <p className="text-2xl font-bold">5K+</p>
                  <p className="text-sm text-emerald-100">Rides Daily</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-2" />
                <div>
                  <p className="text-2xl font-bold">25+</p>
                  <p className="text-sm text-emerald-100">Cities</p>
                </div>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-6 w-6 mr-2" />
                <div>
                  <p className="text-2xl font-bold">99%</p>
                  <p className="text-sm text-emerald-100">On Time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 w-48">
              <div className="flex items-center">
                <div className="bg-emerald-100 rounded-full p-2 mr-3">
                  <Car className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Lagos to Abuja</p>
                  <p className="text-sm text-gray-500">Today, 2:30 PM</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-emerald-500 rounded-2xl shadow-xl p-4 w-48">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white">3 seats left</p>
                  <p className="text-sm text-emerald-100">₦7,500 per seat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
