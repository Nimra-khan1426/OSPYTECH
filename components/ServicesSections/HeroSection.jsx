"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./HeroSection.css";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetStarted = () => {
    router.push("/contact");
  };

  const handleLearnMore = () => {
    router.push("/about");
    // Or scroll to section if exists on same page
    // const featuresSection = document.getElementById('features');
    // if (featuresSection) {
    //   featuresSection.scrollIntoView({ behavior: 'smooth' });
    // }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* BACKGROUND PATTERN */}
        {isClient && (
          <div className="circle-pattern-large">
            {/* Main green circle */}
            <div className="main-circle-large" />
            
            {/* Concentric circles */}
            <div className="concentric-circle-large circle-1-large" />
            <div className="concentric-circle-large circle-2-large" />
            
            {/* Radial lines */}
            {[...Array(24)].map((_, i) => (
              <div
                key={`line-large-${i}`}
                className="radial-line-large"
                style={{ transform: `translate(-50%, -50%) rotate(${i * 15}deg)` }}
              />
            ))}
            
            {/* Dots pattern */}
            {[...Array(36)].map((_, i) => {
              const angle = i * 10;
              const radius = 200;
              const x = radius * Math.cos(angle * Math.PI / 180);
              const y = radius * Math.sin(angle * Math.PI / 180);
              
              return (
                <div
                  key={`dot-large-${i}`}
                  className="dot-large"
                  style={{ 
                    transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px)`
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Background Elements */}
        <div className="bg-element bg-element-1" />
        <div className="bg-element bg-element-2" />

        {/* CENTERED CONTENT - NO ANIMATION */}
        <div className="left-content">
          {/* Subheading */}
          <p className="subheading">
            OspyTech Services
          </p>

          {/* Main Heading - Center Aligned */}
          <h1 className="main-heading">
            <div className="heading-line">
              Comprehensive,
            </div>
            <div className="heading-line">
              Technology Solutions,
            </div>
            <div className="heading-line">
              <span className="green-text"> For Your Business</span>
            </div>
          </h1>

          {/* Description - Center Aligned */}
          <p className="description">
            We provide end-to-end technology services that transform your business 
            operations through innovative solutions, cutting-edge tools, and 
            strategic implementation.
          </p>

          {/* CTA Buttons - Center Aligned */}
          <div className="buttons-container">
            <button 
              className="button-primary-sm"
              onClick={handleGetStarted}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(1, 103, 18, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(1, 103, 18, 0.2)";
              }}
            >
              Get Started
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="button-secondary-sm"
              onClick={handleLearnMore}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0fdf4";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}