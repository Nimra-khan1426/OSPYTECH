"use client";

import { useEffect, useState } from "react";
import "./TeamHero.css";

export default function TeamHero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="team-hero-section">
      <div className="team-hero-container">
        {/* BACKGROUND PATTERN */}
        {isClient && (
          <div className="team-circle-pattern-large">
            {/* Main green circle */}
            <div className="team-main-circle-large" />
            
            {/* Concentric circles */}
            <div className="team-concentric-circle-large team-circle-1-large" />
            <div className="team-concentric-circle-large team-circle-2-large" />
            
            {/* Radial lines */}
            {[...Array(24)].map((_, i) => (
              <div
                key={`team-line-large-${i}`}
                className="team-radial-line-large"
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
                  key={`team-dot-large-${i}`}
                  className="team-dot-large"
                  style={{ 
                    transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px)`
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Background Elements */}
        <div className="team-bg-element team-bg-element-1" />
        <div className="team-bg-element team-bg-element-2" />

        {/* CENTERED CONTENT - TEAM PAGE VERSION */}
        <div className="team-left-content">
          {/* Subheading */}
          <p className="team-subheading">
            Meet Our Team
          </p>

          {/* Main Heading - Center Aligned */}
          <h1 className="team-main-heading">
            <div className="team-heading-line">
              Meet Our Team of 
            </div>
            <div className="team-heading-line">
             Industry  <span className="team-green-text">Experts</span>
            </div>
           
             
          </h1>

          {/* Description - Center Aligned */}
          <p className="team-description">
            Get to know the brilliant minds behind OspyTech. Our diverse team of 
            professionals brings together decades of experience, creativity, 
            and technical expertise to deliver exceptional solutions for your business.
          </p>
        </div>
      </div>
    </section>
  );
}