"use client";
import CallToAction from "@/components/landing/CallToAction";
import FeaturesSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import HeroSectionTwoColumns from "@/components/landing/HeroTwoSection";
import HowItWorks from "@/components/landing/HowItWorks";
import React from "react";

function LandingPage() {
  return (
    <>
      <HeroSectionTwoColumns />
      <FeaturesSection />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </>
  );
}

export default LandingPage;
