"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import "./HeroSection.css";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function HeroSection({ data }) {
  const laptopScreenRef = useRef(null);
  const laptopBaseRef = useRef(null);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const timeline = useRef(null);
  const router = useRouter();

  // State for client-side rendering and animation trigger
  const [isClient, setIsClient] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Initialize refs array
    cardsRef.current = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            startAnimations();
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "100px"
      }
    );

    const startAnimations = () => {
      // Kill existing timeline
      if (timeline.current) {
        timeline.current.kill();
      }

      // Create new timeline
      timeline.current = gsap.timeline({
        defaults: { 
          ease: "power3.out",
          duration: 0.6 // Shorter default duration
        }
      });

      // Reset only laptop and cards elements (NOT text)
      const laptopAndCardsElements = [
        laptopScreenRef.current, 
        laptopBaseRef.current,
        ...cardsRef.current
      ].filter(Boolean);

      gsap.set(laptopAndCardsElements, { clearProps: "all" });

      // Set initial states for LAPTOP ONLY - FASTER START
      if (laptopScreenRef.current) {
        gsap.set(laptopScreenRef.current, {
          rotationX: -75, // Less dramatic for faster animation
          opacity: 0,
          y: 25,
          transformOrigin: "bottom center"
        });
      }
      
      if (laptopBaseRef.current) {
        gsap.set(laptopBaseRef.current, {
          opacity: 0,
          scaleY: 0.5,
          y: 10
        });
      }
      
      // Cards initial state - Simple fade in start
      cardsRef.current.forEach(card => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            scale: 0.9,
            y: 10
          });
        }
      });

      // ANIMATION SEQUENCE - ONLY LAPTOP AND CARDS (NO TEXT)
      
      // 1. Laptop animation - MUCH FASTER
      timeline.current
        // Laptop screen opening - FASTER
        .to(laptopScreenRef.current, {
          rotationX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8, // Reduced from 1.2
          ease: "power2.out"
        }, "start")
        
        // Laptop base appears - FASTER
        .to(laptopBaseRef.current, {
          opacity: 1,
          scaleY: 1,
          y: 0,
          duration: 0.4, // Reduced from 0.5
          ease: "power2.out"
        }, "start+=0.3") // Earlier start
        
        // 2. Cards animation - SIMPLE FADE IN ONE BY ONE
        .to(cardsRef.current[0], {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "start+=0.6") // Sooner after laptop
        
        .to(cardsRef.current[1], {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "start+=0.8") // Staggered
        
        .to(cardsRef.current[2], {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "start+=1.0"); // More staggered
    };

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Reset animation when section leaves view
    const resetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && hasAnimated) {
            setTimeout(() => {
              setHasAnimated(false);
            }, 500);
          }
        });
      },
      { 
        threshold: 0
      }
    );

    if (sectionRef.current) {
      resetObserver.observe(sectionRef.current);
    }

    // Check if section is already visible
    const checkInitialVisibility = () => {
      if (sectionRef.current && window.innerWidth > 0) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9;
        
        if (isVisible && !hasAnimated) {
          setTimeout(() => {
            startAnimations();
            setHasAnimated(true);
            if (sectionRef.current && observer) {
              observer.unobserve(sectionRef.current);
            }
          }, 300);
        }
      }
    };

    setTimeout(checkInitialVisibility, 500);

    return () => {
      observer.disconnect();
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, [isClient, hasAnimated]);

  const addCardToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Card hover effects - Simple
  const handleCardHover = (e) => {
    if (!isClient) return;
    gsap.to(e.currentTarget, {
      y: -5,
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (e) => {
    if (!isClient) return;
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  return (
    <section
      ref={sectionRef}
      className="hero-section"
    >
      <div className="hero-container">
        {/* LEFT CONTENT - NO ANIMATION */}
        <div className="left-content">
          {/* Subheading */}
         <p className="subheading">
  {data?.subheading}
</p>

          {/* Main Heading */}
    <h1 className="main-heading">
{data?.heading?.map((line, index) => {
  // Ensure line is a string
  const text =
    typeof line === "string" ? line : // normal string
    line?.current ? line.current :    // Sanity object case
    JSON.stringify(line);             // fallback

  // Ensure index comparison works
  const isHighlighted = index === Number(data?.highlightedTextIndex);

  return (
    <div key={index} className="heading-line">
      <span className={isHighlighted ? "green-text" : ""}>{text}</span>
    </div>
  );
})}
</h1>

          {/* Description */}
         <p className="description">
  {data?.description}
</p>

          {/* CTA Buttons */}
         <div className="buttons-container">
  {data?.buttons?.map((btn, index) => (
    <button
      key={index}
      className={
        btn.type === "primary"
          ? "button-primary-sm"
          : "button-secondary-sm"
      }
      onClick={() => router.push(btn.link)}
    >
      {btn.text}
    </button>
  ))}
</div>
        </div>

        {/* RIGHT SIDE - WITH ANIMATIONS */}
        <div className="right-side">
          {/* Laptop Container */}
          <div className="laptop-container">
            {/* Laptop Screen */}
            <div
              ref={laptopScreenRef}
              className="laptop-screen"
            >
              {/* Screen Content */}
              <div className="screen-content">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Tech analytics dashboard"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  unoptimized={true}
                />
              </div>

              {/* Screen Overlay */}
              <div className="screen-overlay" />
            </div>

            {/* Laptop Base */}
            <div
              ref={laptopBaseRef}
              className="laptop-base"
            />
          </div>

          {/* Circle pattern */}
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

          {/* CARDS - WITH FADE IN ANIMATION */}
          
          {/* Card 1 */}
          
            
            {data?.cards?.map((card, index) => (
  <div
    key={index}
    ref={addCardToRefs}
    className={`card card-${index + 1}`}
    onMouseEnter={handleCardHover}
    onMouseLeave={handleCardLeave}
  >
    <div className="card-content">
      <p className="card-title">{card.title}</p>
      <p className="card-description">{card.description}</p>
    </div>
  </div>
))}

          {/* Background Elements */}
          <div className="bg-element bg-element-1" />
          <div className="bg-element bg-element-2" />
        </div>
      </div>
    </section>
  );
}