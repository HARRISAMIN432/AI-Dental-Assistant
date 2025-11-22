import React from "react";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import WhatToAsk from "../components/landing/WhatToAsk";
import PricingSection from "../components/landing/PricingSection";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
