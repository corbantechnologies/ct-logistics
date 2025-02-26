import CallToAction from "@/components/landing/CallToAction";
import FeaturesSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import HeroSectionTwoColumns from "@/components/landing/HeroTwoSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import React from "react";

function LandingPage() {
  return (
    <>
    <HeroSectionTwoColumns />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}

export default LandingPage;
