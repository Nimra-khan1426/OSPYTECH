"use client";
import { useState, useEffect } from "react";

export default function CTA() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "60px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "auto",
      position: "relative",
      overflow: "hidden",
    }}>
      
      <div style={{
        display: "flex",
        maxWidth: "1200px",
        width: "100%",
        alignItems: "center",
        gap: "60px",
        flexDirection: isMobile ? "column" : "row"
      }}>
        
        {/* LEFT SIDE - Content */}
        <div style={{
          flex: "1",
          maxWidth: "600px"
        }}>
          {/* Simple OspyTech Logo */}
          <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
            gap: "10px"
          }}>
            
            <span style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#016712",
              letterSpacing: "-0.5px"
            }}>
              
            </span>
          </div>
          
          {/* Tagline - Simple and clean */}
          <h2 style={{
            fontSize: isMobile ? "32px" : "42px",
            fontWeight: "700",
            lineHeight: "1.2",
            marginBottom: "20px",
            color: "#000000"
          }}>
            Let Your Work Speak For Itself.
            <br />
            <span style={{ color: "#016712" }}>We'll Handle The Words.</span>
          </h2>
          
          {/* Description */}
          <p style={{
            fontSize: "18px",
            lineHeight: "1.6",
            color: "#4a5568",
            marginBottom: "40px",
            fontWeight: "400"
          }}>
            We're here to help you navigate your digital journey. Get in touch with us today to discuss how we can take your business to the next level.
          </p>
          
          {/* Contact Us Button - SIMPLE ANCHOR TAGS */}
          <div style={{
            display: "flex",
            gap: "20px",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <a
              href="/contact"
              style={{    
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: "600",
                borderRadius: "6px",
                border: "1.5px solid #000000",
                background: "#000000",
                color: "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                minWidth: "150px",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#000000";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#000000";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Contact Us
            </a>
            
            <a
              href="/about"
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#016712",
                textDecoration: "none",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#01550f";
                e.target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#016712";
                e.target.style.textDecoration = "none";
              }}
            >
              Learn more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          
          {/* Small trust indicators */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              
            </div>
          </div>
        </div>
        
        {/* RIGHT SIDE - Tech Illustration with Icons */}
        {/* ... (rest of your code remains same) ... */}
        {/* RIGHT SIDE - Tech Illustration with Icons */}
        <div style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: isMobile ? "300px" : "400px",
          position: "relative"
        }}>
          {/* Tech-themed design with outlines only */}
          <div style={{
            width: "100%",
            height: "100%",
            maxWidth: isMobile ? "350px" : "450px",
            position: "relative"
          }}>
            {/* Main circle - outline only */}
            <div style={{
              width: isMobile ? "200px" : "280px",
              height: isMobile ? "200px" : "280px",
              borderRadius: "50%",
              border: "3px solid #000000",
              background: "transparent",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2
            }}>
              {/* Inner dashed circle */}
              <div style={{
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <div style={{
                  width: isMobile ? "120px" : "180px",
                  height: isMobile ? "120px" : "180px",
                  borderRadius: "50%",
                  border: "2px dashed #d1d5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {/* AI/Cyber icon in center */}
                  <div style={{
                    width: isMobile ? "70px" : "100px",
                    height: isMobile ? "70px" : "100px",
                    borderRadius: "50%",
                    border: "2px solid #016712",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent"
                  }}>
                    <svg width={isMobile ? "30" : "40"} height={isMobile ? "30" : "40"} viewBox="0 0 24 24" fill="none" stroke="#016712" strokeWidth="2">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating icons with colored outlines */}
            {[
              { 
                top: "20%", 
                left: "10%", 
                size: isMobile ? "45px" : "55px", 
                rotation: "0deg", 
                color: "#000000", 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="2"/>
                    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
                  </svg>
                )
              },
              { 
                top: "10%", 
                right: "20%", 
                size: isMobile ? "35px" : "45px", 
                rotation: "45deg", 
                color: "#016712", 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                )
              },
              { 
                bottom: "30%", 
                left: "5%", 
                size: isMobile ? "40px" : "50px", 
                rotation: "-30deg", 
                color: "#016712", 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="13 3 13 10 19 10 19 21 5 21 5 3 13 3"/>
                    <polyline points="13 3 19 10 13 10"/>
                  </svg>
                )
              },
              { 
                bottom: "15%", 
                right: "10%", 
                size: isMobile ? "50px" : "60px", 
                rotation: "60deg", 
                color: "#000000", 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                )
              }
            ].map((item, index) => (
              <div 
                key={index} 
                style={{
                  width: item.size,
                  height: item.size,
                  borderRadius: "12px",
                  border: `2px solid ${item.color}`,
                  background: "transparent",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  position: "absolute",
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom,
                  transform: `rotate(${item.rotation})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `rotate(${item.rotation}) scale(1.1)`;
                  e.currentTarget.style.boxShadow = `0 8px 20px ${item.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${item.rotation})`;
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
                }}
              >
                {item.icon}
              </div>
            ))}
            
            {/* Connection lines - colored outlines */}
            <svg style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1
            }}>
              <line 
                x1="50%" y1="50%" 
                x2="35%" y2="25%" 
                stroke="#000000" 
                strokeWidth="1.5" 
                strokeDasharray="4,4"
              />
              <line 
                x1="50%" y1="50%" 
                x2="65%" y2="20%" 
                stroke="#016712" 
                strokeWidth="1.5" 
                strokeDasharray="4,4"
              />
              <line 
                x1="50%" y1="50%" 
                x2="25%" y2="60%" 
                stroke="#016712" 
                strokeWidth="1.5" 
                strokeDasharray="4,4"
              />
              <line 
                x1="50%" y1="50%" 
                x2="70%" y2="65%" 
                stroke="#000000" 
                strokeWidth="1.5" 
                strokeDasharray="4,4"
              />
            </svg>
          </div>
        </div>
      </div>
      
    
    
    </section>
  );
}