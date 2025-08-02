// src/components/HowItWorks.js
import React from 'react';
import { UserPlus, Map, Car, HandCoins } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: 'Create an Account',
      description:
        'Sign up in minutes with your phone number or email. Complete your profile for a trusted community.',
    },
    {
      icon: <Map className="h-8 w-8" />,
      title: 'Find or Offer a Ride',
      description:
        'Search for rides on your route or post your own trip. Set your preferences and pricing.',
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: 'Connect & Travel',
      description:
        'Chat with drivers/passengers, confirm details, and enjoy your journey together.',
    },
    {
      icon: <HandCoins className="h-8 w-8" />,
      title: 'Pay Seamlessly',
      description:
        'Use our secure in-app wallet or cash payment. Earn rewards for frequent trips.',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">
            How it works
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Ride Sharing Made Simple
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Whether you&apos;re traveling daily or occasionally, NaijaRides
            makes carpooling easy and rewarding.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-green-100"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-4 text-gray-600">{step.description}</p>
                <div className="mt-6 text-emerald-600 font-bold text-sm">
                  Step {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold">
              Ready to start your journey?
            </h3>
            <p className="mt-4 text-lg text-emerald-100">
              Join thousands of Nigerians saving money and reducing traffic
              every day.
            </p>
            <div className="mt-8">
              <button className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
