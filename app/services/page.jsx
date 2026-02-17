"use client"


import HeroSection from "@/components/ServicesSections/HeroSection";
import ServicesCards from "../../components/ServicesSections/ServiesCards";
import SimpleWorkflow from "../../components/ServicesSections/SimpleWorkFlow";
import ExpertCardsSection from "../../components/ServicesSections/ExpertCardsSection";
import Testimonials from "@/components/ServicesSections/Testimonials";
import OurWorks from "@/components/ServicesSections/OurWorks";
import FAQ from "@/components/ServicesSections/FAQ";
import CTA from "@/components/layout/cta";

export default function servicesPage() {
  return (
    <main className="min-h-screen">
    

       <HeroSection />
       <ServicesCards />
        <SimpleWorkflow /> 
        <ExpertCardsSection />
       <OurWorks />
        <Testimonials />
        <FAQ /> 
       <CTA />
      
    </main>
  )
}
