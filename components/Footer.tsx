// src/components/Footer.js
import React from 'react';
import Link from 'next/link';
import {
  Car,
  Mail,
  Smartphone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 w-12 h-12 rounded-full flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold">NaijaRides</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-md">
              Nigeria&apos;s leading carpooling platform connecting drivers and
              passengers for affordable, convenient, and eco-friendly travel
              across cities.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-emerald-600 transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-emerald-600 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-emerald-600 transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-emerald-600 transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/routes"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  Find Rides
                </Link>
              </li>
              <li>
                <Link
                  href="/offer-ride"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  Offer a Ride
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  Safety
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-emerald-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 mr-3" />
                <span className="text-gray-400">
                  123 Lagos Street, Victoria Island, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-400">support@naijarides.com</span>
              </li>
              <li className="flex items-center">
                <Smartphone className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-400">+234 812 345 6789</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NaijaRides. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
