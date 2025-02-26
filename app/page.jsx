import CallToAction from "@/components/landing/CallToAction";
import FeaturesSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import React from "react";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}

export default LandingPage;
