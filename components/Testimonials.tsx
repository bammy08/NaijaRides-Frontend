'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Chinedu Okonkwo',
      role: 'Daily Commuter, Lagos',
      content:
        'NaijaRides has transformed my daily commute from Lekki to Victoria Island. I save over ₦20,000 monthly and have met amazing people who are now friends. The app is so easy to use!',
      rating: 5,
    },
    {
      name: 'Amina Yusuf',
      role: 'Student, Abuja',
      content:
        'As a student, affordability is key. NaijaRides helped me find reliable rides to campus without breaking the bank. The drivers are verified and professional. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Emeka Nwosu',
      role: 'Driver, Enugu',
      content:
        "I started using NaijaRides to offset my fuel costs, but it's become a great side income. The platform is secure, payments are prompt, and I've built a network of regular passengers.",
      rating: 5,
    },
    {
      name: 'Funke Adebayo',
      role: 'Frequent Traveler, Ibadan',
      content:
        "The Lagos-Ibadan expressway trips have become so much more enjoyable with NaijaRides. I've stopped using buses entirely. Comfort, savings, and great conversations - what more could you ask for?",
      rating: 4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="py-16 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">
            What people say
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Stories from Our Community
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative">
              <Quote className="absolute top-8 left-8 text-emerald-100 h-16 w-16" />

              <div className="relative z-10">
                <div className="flex items-center text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < testimonials[currentIndex].rating
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

                <blockquote className="text-xl md:text-2xl font-medium text-gray-800">
                  <p>&quot;{testimonials[currentIndex].content}&quot;</p>
                </blockquote>

                <div className="mt-8 flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <p className="text-lg font-bold text-gray-900">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-emerald-600">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white text-emerald-600 shadow-md hover:bg-emerald-50 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white text-emerald-600 shadow-md hover:bg-emerald-50 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentIndex ? 'bg-emerald-600' : 'bg-emerald-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
