// src/app/page.js
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import BenefitsSection from '@/components/BenefitsSection';
import FeaturedRoute from '@/components/FeaturedRoute';
import Testimonials from '@/components/Testimonials';
import DownloadApp from '@/components/DownloadApp';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <BenefitsSection />
      <FeaturedRoute />
      <Testimonials />
      <DownloadApp />
      <Footer />
    </div>
  );
}
