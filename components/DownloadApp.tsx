// src/components/DownloadApp.js
import React from 'react';
import { Car, Download } from 'lucide-react';

const DownloadApp = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Get the NaijaRides App
            </h2>
            <p className="mt-4 text-xl text-emerald-100 max-w-2xl">
              Download our mobile app for the best carpooling experience. Find
              rides, manage trips, and make payments on the go.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-4 bg-black rounded-lg flex items-center">
                <div className="mr-3">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-bold text-lg">App Store</div>
                </div>
              </button>

              <button className="px-6 py-4 bg-black rounded-lg flex items-center">
                <div className="mr-3">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="font-bold text-lg">Google Play</div>
                </div>
              </button>
            </div>

            <div className="mt-12 flex items-center text-emerald-100">
              <div className="flex items-center mr-8">
                <Download className="h-5 w-5 mr-2" />
                <span>100K+ Downloads</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.8/5 Rating</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative z-10">
              <div className="bg-gray-200 border-2 border-dashed rounded-3xl w-72 h-96" />
            </div>
            <div className="absolute top-12 -right-12 bg-emerald-800 rounded-2xl p-6 w-64 z-0">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-700 rounded-full p-2 mr-3">
                  <Car className="h-5 w-5 text-emerald-200" />
                </div>
                <div>
                  <p className="font-bold text-white">Ride Found!</p>
                  <p className="text-sm text-emerald-200">
                    Lekki to Victoria Island
                  </p>
                </div>
              </div>
              <div className="bg-emerald-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-emerald-200">Driver:</span>
                  <span className="font-medium text-white">Tunde Adebayo</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-emerald-200">Departure:</span>
                  <span className="font-medium text-white">Today, 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-200">Price:</span>
                  <span className="font-bold text-white">₦1,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
