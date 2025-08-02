// src/components/BenefitsSection.js
import React from 'react';
import { Coins, Leaf, ShieldCheck, Clock, Smile } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Coins className="h-8 w-8" />,
      title: 'Save Money',
      description:
        'Share fuel and toll costs, making travel more affordable than ever.',
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Eco-Friendly',
      description:
        'Reduce carbon emissions by sharing rides and decreasing vehicles on the road.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'Safe & Verified',
      description:
        'All users are verified, with ratings and reviews for a trusted community.',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Time Efficient',
      description:
        'Avoid traffic with carpool lanes and make your commute more predictable.',
    },
    {
      icon: <Smile className="h-8 w-8" />,
      title: 'Social Connections',
      description:
        'Meet new people and build connections during your daily commute.',
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">
            Why choose us
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Benefits of Carpooling with NaijaRides
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Experience the advantages of smart travel while contributing to a
            greener Nigeria.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Safety First Approach
            </h3>
            <p className="mt-4 text-gray-600">
              Your safety is our top priority. That&apos;s why we&apos;ve
              implemented multiple safety features:
            </p>

            <div className="mt-6 space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Verified Profiles
                  </h4>
                  <p className="mt-2 text-gray-600">
                    All users go through a verification process to ensure
                    community safety.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 text-emerald-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    In-App Emergency
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Quick access to emergency services and trip sharing with
                    trusted contacts.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 text-emerald-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Community Ratings
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Rate your experience after each ride to maintain a trusted
                    community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
