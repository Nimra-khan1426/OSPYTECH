"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter } from "next/navigation";
import { 
  Database,
  Globe,
  Server,
  Zap,
  ArrowUpRight
} from 'lucide-react';

const bottomRowServices = [
  {
    id: 5,
    title: "Data Analytics",
    description: "BI dashboards & insights.",
    icon: <Database />,
    features: ["Real-time", "Big Data", "Warehousing"],
    gradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop",
    stats: "5M+ Data Points"
  },
  {
    id: 6,
    title: "Web Development",
    description: "Modern apps with Next.js/React.",
    icon: <Globe />,
    features: ["Next.js", "React", "PWA"],
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&auto=format&fit=crop",
    stats: "0.5s Load"
  },
  {
    id: 7,
    title: "DevOps & CI/CD",
    description: "Automated pipelines & infrastructure.",
    icon: <Server />,
    features: ["CI/CD", "Terraform", "Docker"],
    gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop",
    stats: "90% Faster"
  },
  {
    id: 8,
    title: "IoT Solutions",
    description: "Connected devices & real-time data.",
    icon: <Zap />,
    features: ["Edge", "Real-time", "Device Mgmt"],
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    stats: "10K+ Devices"
  }
];

export default function ServicesSection2() {
  const bottomCarouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // 2 sets of cards for seamless loop
  const duplicatedBottomServices = [
    ...bottomRowServices,
    ...bottomRowServices
  ];
  
  const router = useRouter();

  // One-time animation when section appears
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // INFINITE LOOP - RIGHT TO LEFT VERSION
  useEffect(() => {
    if (!bottomCarouselRef.current) return;

    const carousel = bottomCarouselRef.current;
    let animationId: number;
    let position = 0;
    
    // Card measurements - responsive card width
    const getCardWidth = () => {
      if (window.innerWidth <= 480) return 260;
      if (window.innerWidth <= 640) return 280;
      return 300;
    };
    
    const cardGap = 16;
    
    const updateAnimation = () => {
      const cardWidth = getCardWidth();
      const totalCardWidth = cardWidth + cardGap;
      const oneSetWidth = bottomRowServices.length * totalCardWidth;
      
      // Initial position - start from leftmost
      position = -oneSetWidth;

      const animate = () => {
        position += 0.8; // POSITIVE for right-to-left movement
        
        // Reset when we've moved through 2 sets
        if (position >= 0) {
          position = -oneSetWidth;
          
          // Apply reset without animation
          carousel.style.transition = 'none';
          carousel.style.transform = `translateX(${position}px)`;
          
          // Force reflow
          void carousel.offsetHeight;
          
          // Re-enable smooth animation
          carousel.style.transition = 'transform 0.1s linear';
        }
        
        carousel.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
      };

      // Set initial position
      carousel.style.transform = `translateX(${position}px)`;
      
      // Start animation
      animationId = requestAnimationFrame(animate);
    };

    updateAnimation();

    // Handle resize
    const handleResize = () => {
      if (animationId) cancelAnimationFrame(animationId);
      updateAnimation();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '40px 0 20px',
        overflow: 'hidden',
        marginTop: '-30px'
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '-100px',
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03), rgba(139, 92, 246, 0.03))',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 20s ease-in-out infinite',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03), rgba(6, 182, 212, 0.03))',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 20s ease-in-out infinite reverse',
        zIndex: 0
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* BOTTOM ROW CONTAINER - MOVES RIGHT TO LEFT */}
        <div style={{ 
          marginBottom: '20px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%'
            }}>
              {/* Left Gradient Fade - Responsive */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 'min(150px, 15vw)',
                background: 'linear-gradient(to right, white, transparent)',
                zIndex: 20,
                pointerEvents: 'none'
              }} />
              
              {/* Right Gradient Fade - Responsive */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 'min(150px, 15vw)',
                background: 'linear-gradient(to left, white, transparent)',
                zIndex: 20,
                pointerEvents: 'none'
              }} />
              
              {/* Bottom Carousel - INFINITE SCROLL */}
              <div 
                ref={bottomCarouselRef}
                style={{
                  display: 'flex',
                  padding: '10px 0',
                  willChange: 'transform',
                  transition: 'transform 0.1s linear',
                  width: 'max-content'
                }}
              >
                {duplicatedBottomServices.map((service, index) => (
                  <div
                    key={`bottom-${service.id}-${index}`}
                    style={{
                      flexShrink: 0,
                      margin: '0 8px',
                      width: 'min(300px, 85vw)',
                      maxWidth: '300px'
                    }}
                  >
                    <motion.div 
                      style={{
                        position: 'relative',
                        background: 'white',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.06)',
                        border: '1px solid rgba(243, 244, 246, 0.8)',
                        height: 'auto',
                        minHeight: '360px',
                        cursor: 'pointer'
                      }}
                      whileHover={{ 
                        scale: 1.03,
                        y: -8,
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                        transition: { duration: 0.3 }
                      }}
                    >
                      
                      {/* Service Image - Responsive height */}
                      <div style={{
                        height: 'min(120px, 30vw)',
                        minHeight: '100px',
                        background: `url(${service.image}) center/cover`,
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: service.gradient,
                          opacity: '0.15'
                        }} />
                        
                        {/* Stats Badge - Responsive sizing */}
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '4px 10px',
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '100px',
                          border: '1px solid rgba(229, 231, 235, 0.8)',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                          maxWidth: 'calc(100% - 60px)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          <span style={{
                            fontSize: 'clamp(10px, 3vw, 11px)',
                            fontWeight: '700',
                            background: service.gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}>
                            {service.stats}
                          </span>
                        </div>

                        {/* Icon - Responsive */}
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          width: 'clamp(36px, 8vw, 40px)',
                          height: 'clamp(36px, 8vw, 40px)',
                          borderRadius: '10px',
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.12)'
                        }}>
                          <div style={{ 
                            color: service.gradient.split(',')[1].trim(),
                            width: 'clamp(18px, 4vw, 20px)',
                            height: 'clamp(18px, 4vw, 20px)'
                          }}>
                            {service.icon}
                          </div>
                        </div>
                      </div>

                      {/* Content - Responsive padding */}
                      <div style={{ 
                        padding: 'clamp(16px, 4vw, 20px)'
                      }}>
                        <h3 style={{
                          fontSize: 'clamp(16px, 4vw, 18px)',
                          fontWeight: '700',
                          color: '#111827',
                          marginBottom: '8px',
                          lineHeight: '1.3'
                        }}>
                          {service.title}
                        </h3>

                        <p style={{
                          color: '#6B7280',
                          fontSize: 'clamp(12px, 3.5vw, 13px)',
                          lineHeight: '1.5',
                          marginBottom: '16px',
                          minHeight: '36px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {service.description}
                        </p>

                        {/* Features - Responsive grid */}
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginBottom: '20px'
                        }}>
                          {service.features.map((feature, idx) => (
                            <motion.span
                              key={idx}
                              style={{
                                padding: '4px 8px',
                                background: 'rgba(249, 250, 251, 0.8)',
                                backdropFilter: 'blur(8px)',
                                color: '#374151',
                                fontSize: 'clamp(10px, 3vw, 11px)',
                                fontWeight: '600',
                                borderRadius: '6px',
                                border: '1px solid rgba(229, 231, 235, 0.6)'
                              }}
                              whileHover={{ 
                                scale: 1.05,
                                background: service.gradient,
                                color: 'white',
                                borderColor: 'transparent'
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button 
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: 'clamp(8px, 3vw, 10px)',
                            background: 'white',
                            border: `1px solid ${service.gradient.split(',')[1].trim()}40`,
                            borderRadius: '8px',
                            color: service.gradient.split(',')[1].trim(),
                            fontSize: 'clamp(12px, 3.5vw, 13px)',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            background: service.gradient,
                            color: 'white',
                            boxShadow: `0 10px 30px ${service.gradient.split(',')[1].trim()}40`
                          }}
                          transition={{ duration: 0.3 }}
                          onClick={() => router.push("/services")}
                        >
                          <span>Explore</span>
                          <ArrowUpRight style={{ width: '14px', height: '14px' }} />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Button - CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '10px'
          }}
        >
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <motion.button 
              style={{
                padding: 'clamp(12px, 4vw, 15px) clamp(24px, 6vw, 36px)',
                background: 'linear-gradient(90deg, #0a0a0a, #070707)',
                color: 'white',
                fontWeight: '600',
                fontSize: 'clamp(13px, 3.5vw, 14px)',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(15, 15, 15, 0.25)',
                width: 'fit-content',
                whiteSpace: 'nowrap'
              }}
              whileHover={{ 
                scale: 1.05,
                y: -4,
                boxShadow: '0 12px 40px rgba(34, 34, 35, 0.35)'
              }}
              transition={{ duration: 0.3 }}
              onClick={() => router.push("/services")}
            >
              View All Services
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(20px);
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .service-card {
            height: auto !important;
            min-height: 340px;
          }
        }
        
        @media (max-width: 480px) {
          .service-card {
            min-height: 320px;
          }
        }
      `}</style>
    </section>
  );
}