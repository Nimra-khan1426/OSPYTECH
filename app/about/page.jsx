"use client";

import AboutHero from "@/components/AboutSection/AboutHero";
import CTA from "@/components/layout/cta";
import OurMission from "../../components/AboutSection/OurMission";
import HowWeAre from "../../components/AboutSection/HowWeAre";
import TechServices from "../../components/AboutSection/TechServices";
import TeamSection from "../../components/AboutSection/TeamSection";
import FeaturesSection from "../../components/AboutSection/FeaturesSection";
import LogoCarousel from "../../components/AboutSection/LogoCarousel";
import OurVision from "../../components/AboutSection/OurVision";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <HowWeAre />
      <OurMission />
      <OurVision />
      <TechServices />
      <FeaturesSection />
      <LogoCarousel />
      <TeamSection />
      <CTA />
    </main>
  );
}
