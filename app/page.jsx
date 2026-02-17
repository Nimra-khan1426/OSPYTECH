import HeroSection from "@/components/layout/HeroSection";
import ServiceSection1 from "@/components/layout/ServicesSection1";
import CTA from "@/components/layout/cta";
import AboutUs from "@/components/layout/Aboutus";
import ServicesSectionTwo from "@/components/layout/ServicesSection2";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import OurWorks from "@/components/ServicesSections/OurWorks";

import { client } from "@/sanity/lib/client";
import { aboutQuery, heroQuery,servicesQuery } from "@/sanity/lib/queries";

export default async function Home() {

  const heroData = await client.fetch(heroQuery);
   const aboutData = await client.fetch(aboutQuery);
   const  service1Data  = await client.fetch(servicesQuery);
 
  return (
    <main className="min-h-screen">
      <HeroSection data={heroData} />
      <AboutUs  data={aboutData}/>
<ServiceSection1 data={service1Data}    />
      <ServicesSectionTwo />
      <OurWorks />
      <TestimonialsSection />
      <CTA />
    </main>
  );
}