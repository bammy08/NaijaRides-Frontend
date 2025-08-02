// src/components/FeaturedRoutes.js
import React from 'react';
import { MapPin, CalendarDays, Users, ArrowRight } from 'lucide-react';

const FeaturedRoute = () => {
  const routes = [
    {
      from: 'Lagos',
      to: 'Ibadan',
      price: '₦3,500',
      date: 'Today, 3:00 PM',
      seats: 3,
      driver: {
        name: 'Tunde Adebayo',
        rating: 4.9,
      },
    },
    {
      from: 'Abuja',
      to: 'Kaduna',
      price: '₦4,200',
      date: 'Tomorrow, 7:00 AM',
      seats: 2,
      driver: {
        name: 'Amina Suleiman',
        rating: 4.8,
      },
    },
    {
      from: 'Port Harcourt',
      to: 'Aba',
      price: '₦2,800',
      date: 'Today, 5:30 PM',
      seats: 4,
      driver: {
        name: 'Chike Obi',
        rating: 5.0,
      },
    },
    {
      from: 'Enugu',
      to: 'Onitsha',
      price: '₦2,500',
      date: 'Tomorrow, 9:00 AM',
      seats: 1,
      driver: {
        name: 'Emeka Nwankwo',
        rating: 4.7,
      },
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">
              Popular Routes
            </h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Trending Journeys Today
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              Find your perfect ride from our most popular routes across Nigeria
            </p>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 text-emerald-600 font-medium rounded-lg border border-emerald-600 hover:bg-emerald-50 transition flex items-center">
            View All Routes <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {routes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {route.from} to {route.to}
                    </h3>
                    <div className="mt-4 flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-emerald-500" />
                      <span>
                        {route.from} → {route.to}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-gray-600">
                      <CalendarDays className="h-5 w-5 mr-2 text-emerald-500" />
                      <span>{route.date}</span>
                    </div>
                    <div className="mt-2 flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2 text-emerald-500" />
                      <span>
                        {route.seats} seat{route.seats > 1 ? 's' : ''} available
                      </span>
                    </div>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">
                    {route.price}
                  </div>
                </div>

                <div className="mt-6 flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">
                      {route.driver.name}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(route.driver.rating)
                                ? 'text-amber-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-500">
                        {route.driver.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition">
                  Book This Ride
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRoute;
