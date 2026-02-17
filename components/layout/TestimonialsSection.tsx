"use client";
import { Twitter, Facebook, Instagram, ExternalLink, Star, Quote, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const tweets = [
  {
    name: "Alex",
    handle: "@alxxrah",
    text: "We use magic.",
    avatar: "https://i.pravatar.cc/150?img=6",
    socialIcon: "twitter",
  },
  {
    name: "Nickz",
    handle: "@mckz",
    text: "Need a beautiful Magic UI. Instance and tag them 100% of the world this easy.",
    avatar: "https://i.pravatar.cc/150?img=9",
    socialIcon: "facebook",
  },
  {
    name: "Steven Tey",
    handle: "@steventey",
    text: "bruh this is so good 😊",
    avatar: "https://i.pravatar.cc/150?img=1",
    socialIcon: "instagram",
  },
  {
    name: "Minh-Phuc Tran",
    handle: "@phuctm97",
    text: "Oh man, these are so good, thanks for making it open-source 😊",
    avatar: "https://i.pravatar.cc/150?img=5",
    socialIcon: "twitter",
  },
  {
    name: "Mckay Wrigley",
    handle: "@mckaywrigley",
    text: "Need a beautiful landing page? Use Cursor + Magic UI.",
    avatar: "https://i.pravatar.cc/150?img=3",
    socialIcon: "facebook",
  },
  {
    name: "Alex Vah",
    handle: "@vahaah",
    text: "Thanks, @magiculdesign. This is my new favourite UI library, and their Pro templates look magical.",
    avatar: "https://i.pravatar.cc/150?img=8",
    socialIcon: "instagram",
  },
  {
    name: "Guillermo Rauch",
    handle: "@rauchg",
    text: "beautiful site ✨",
    avatar: "https://i.pravatar.cc/150?img=2",
    socialIcon: "twitter",
  },
  {
    name: "Aiden Bai",
    handle: "@aidenybai",
    text: "we use magicui.design for million.dev",
    avatar: "https://i.pravatar.cc/150?img=7",
    socialIcon: "facebook",
  },
];

// Color schemes for different social icons
const socialColors = {
  twitter: { icon: Twitter, color: "#1DA1F2", hoverColor: "#0d8bd9" },
  facebook: { icon: Facebook, color: "#1877F2", hoverColor: "#0d66d9" },
  instagram: { 
    icon: Instagram, 
    color: "#E4405F", 
    hoverColor: "#d32a4a",
    gradient: "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)"
  },
};

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardHeights, setCardHeights] = useState([]);

  // Calculate text height based on content
  const calculateTextHeight = (text) => {
    const baseHeight = 80; // Base height for header and padding
    const lineHeight = 24; // Line height for text
    const words = text.split(' ');
    const estimatedLines = Math.ceil(words.length / 6); // Rough estimate: 6 words per line
    return baseHeight + (estimatedLines * lineHeight);
  };

  useEffect(() => {
    setMounted(true);
    
    // Calculate initial heights based on text content
    const heights = tweets.map(tweet => calculateTextHeight(tweet.text));
    setCardHeights(heights);
  }, []);

  useEffect(() => {
    if (!mounted || cardHeights.length === 0) return;
    
    const arrangeMasonry = () => {
      const container = containerRef.current;
      if (!container) return;

      const items = container.children;
      const gap = 20;
      const containerWidth = container.offsetWidth;
      
      // Desktop: 3 columns, Mobile: 2 columns
      const isMobile = containerWidth < 768;
      const columns = isMobile ? 2 : 3;
      const itemWidth = (containerWidth - (gap * (columns - 1))) / columns;
      
      if (columns <= 0 || items.length === 0) return;

      // Reset positions
      Array.from(items).forEach((item, index) => {
        if (item) {
          item.style.position = 'absolute';
          item.style.width = `${itemWidth}px`;
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
        }
      });

      // Calculate column heights
      const colHeights = new Array(columns).fill(0);
      const colPositions = new Array(columns).fill(0).map((_, i) => i * (itemWidth + gap));

      // Position items in masonry layout
      Array.from(items).forEach((item, index) => {
        if (!item) return;
        
        // Use calculated height
        const height = cardHeights[index] || 140;
        
        // Find column with minimum height
        let minCol = 0;
        let minHeight = colHeights[0];
        for (let col = 1; col < columns; col++) {
          if (colHeights[col] < minHeight) {
            minHeight = colHeights[col];
            minCol = col;
          }
        }

        // Position item
        item.style.left = `${colPositions[minCol]}px`;
        item.style.top = `${colHeights[minCol]}px`;
        
        // Update column height
        colHeights[minCol] += height + gap;

        // Staggered animation
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 100);
      });

      // Set container height
      container.style.height = `${Math.max(...colHeights) - gap}px`;
    };

    // Initial arrangement with delay for images to load
    const timer = setTimeout(arrangeMasonry, 200);

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(arrangeMasonry, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, cardHeights]);

  // Update heights after render based on actual content
  useEffect(() => {
    if (!mounted || cardRefs.current.length === 0) return;

    const updateHeights = () => {
      const newHeights = cardRefs.current.map((cardRef, index) => {
        if (!cardRef) return calculateTextHeight(tweets[index]?.text || '');
        
        const contentDiv = cardRef.querySelector('.card-content');
        if (contentDiv) {
          return contentDiv.offsetHeight + 40; // Add padding
        }
        return calculateTextHeight(tweets[index]?.text || '');
      });
      
      setCardHeights(newHeights);
    };

    // Update heights after a delay
    const timer = setTimeout(updateHeights, 300);
    return () => clearTimeout(timer);
  }, [mounted]);

  const SocialIcon = ({ type, size = 20 }) => {
    const { icon: Icon, color } = socialColors[type] || socialColors.twitter;
    return <Icon size={size} color={color} />;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#c7f9d1",
        padding: "20px 20px",
        color: "#111827",

        position: "relative",
        overflow: "hidden",
        paddingBottom:"80px",
      }}
    >
      {/* Premium Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(40, 200, 101, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(173, 236, 188, 0.37) 0%, transparent 50%),
          linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)
        `,
        zIndex: 0,
      }} />

      {/* Decorative Corner Accents */}
      <div style={{
        position: "absolute",
        top: "0%",
        left: "5%",
        width: "200px",
        height: "200px",
        borderTop: "2px solid rgba(138, 248, 138, 0.33)",
        borderLeft: "2px solid rgba(66, 254, 14, 0.17)",
        zIndex: 1,
      }} />
      
      <div style={{
        position: "absolute",
        bottom: "5%",
        right: "5%",
        width: "200px",
        height: "200px",
        borderBottom: "2px solid rgba(138, 248, 138, 0.33)",
        borderRight: "2px solid rgba(205, 249, 205, 0.76)",
        zIndex: 1,
      }} />

      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto",
        position: "relative",
        zIndex: 10
      }}>
        {/* PROFESSIONAL HEADING */}
        <div style={{
          textAlign: "center",
          marginBottom: "80px",
          position: "relative",
          color :"#016712",
          fontSize: "18px",
        }}>
          <h3> Testimonials</h3>
          
           
            
  
          

          {/* Elegant Main Heading */}
          <div style={{
            position: "relative",
            marginBottom: "24px",
          }}>
           

            <h1 style={{
              fontSize: "55px",
              fontWeight: "600",
              lineHeight: "1.1",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              position: "relative",
              display: "inline-block",
            }}>
              <span style={{
                color: "#111827",
                position: "relative",
                display: "inline-block",
              }}>
                Words from{" "}
                <span style={{
                  position: "relative",
                  background: "linear-gradient(135deg, #016712, #4f8658)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "8px",
                }}>
                  Our Clients
                </span>
             
              </span>
            </h1>

        

            <p style={{
              fontSize: "18px",
              color: "#6B7280",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontWeight: "400",
            }}>
              Trusted by industry leaders and innovative teams worldwide. 
              Here's what they have to say about their experience with us.
            </p>
          </div>

         
              
          
        </div>

        {/* Masonry Grid */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            margin: "0 auto",
            transition: "height 0.3s ease",
          }}
        >
          {tweets.map((t, i) => {
            const socialConfig = socialColors[t.socialIcon];
            const isHovered = hoveredCard === i;
            const cardHeight = cardHeights[i] || 140;
            
            return (
              <div
                key={i}
                ref={el => cardRefs.current[i] = el}
                style={{
                  position: "absolute",
                  opacity: 0,
                  transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  filter: hoveredCard !== null && hoveredCard !== i ? "blur(2px)" : "none",
                  transform: hoveredCard !== null && hoveredCard !== i ? "scale(0.99)" : "scale(1)",
                  height: `${cardHeight}px`,
                }}
                className="testimonial-card"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="card-content"
                  style={{
                    background: "white",
                    border: `1px solid ${isHovered ? socialConfig.color : "#E5E7EB"}`,
                    borderRadius: "16px",
                    padding: cardHeight > 160 ? "24px" : "20px",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: isHovered 
                      ? `0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px ${socialConfig.color}20`
                      : "0 4px 20px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      right: "0",
                      height: "3px",
                      background: socialConfig.gradient || socialConfig.color,
                      transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: cardHeight > 160 ? "20px" : "16px",
                      position: "relative",
                      zIndex: "2",
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div
                        style={{
                          position: "relative",
                          width: cardHeight > 160 ? "46px" : "42px",
                          height: cardHeight > 160 ? "46px" : "42px",
                        }}
                      >
                        <img
                          src={t.avatar}
                          alt={t.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #F3F4F6",
                          }}
                          onLoad={() => {
                            setTimeout(() => {
                              const container = containerRef.current;
                              if (container) {
                                const event = new Event('resize');
                                window.dispatchEvent(event);
                              }
                            }, 100);
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: "-2px",
                            borderRadius: "50%",
                            padding: "2px",
                            background: socialConfig.gradient || socialConfig.color,
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            opacity: isHovered ? "1" : "0",
                            transition: "opacity 0.3s",
                          }}
                        />
                      </div>
                      <div>
                        <div style={{ 
                          fontWeight: "700", 
                          fontSize: cardHeight > 160 ? "16px" : "15px",
                          letterSpacing: "-0.01em",
                          color: "#111827",
                        }}>
                          {t.name}
                        </div>
                        <div
                          style={{ 
                            fontSize: cardHeight > 160 ? "14px" : "13px", 
                            color: "#6B7280",
                            fontWeight: "500",
                          }}
                        >
                          {t.handle}
                        </div>
                      </div>
                    </div>

                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: cardHeight > 160 ? "40px" : "36px",
                        height: cardHeight > 160 ? "40px" : "36px",
                        borderRadius: "10px",
                        background: isHovered ? `${socialConfig.color}15` : "#F9FAFB",
                        border: `1px solid ${isHovered ? socialConfig.color : "#E5E7EB"}`,
                        transition: "all 0.3s ease",
                        position: "relative",
                        zIndex: "2",
                        transform: isHovered ? "rotate(8deg)" : "rotate(0)",
                      }}
                    >
                      <SocialIcon 
                        type={t.socialIcon} 
                        size={cardHeight > 160 ? 20 : 18} 
                      />
                    </a>
                  </div>

                  <p
                    style={{
                      color: "#4B5563",
                      lineHeight: cardHeight > 160 ? "1.7" : "1.6",
                      fontSize: cardHeight > 160 ? "16px" : "15px",
                      margin: 0,
                      position: "relative",
                      zIndex: "1",
                      fontWeight: "400",
                      wordBreak: "break-word",
                    }}
                  >
                    {t.text}
                  </p>

                  {/* View Tweet indicator */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: cardHeight > 160 ? "20px" : "16px",
                      right: cardHeight > 160 ? "20px" : "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: isHovered ? socialConfig.color : "#9CA3AF",
                      fontSize: cardHeight > 160 ? "13px" : "12px",
                      fontWeight: "500",
                      opacity: isHovered ? "1" : "0",
                      transform: isHovered ? "translateX(0)" : "translateX(10px)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ExternalLink size={cardHeight > 160 ? 14 : 12} />
                    View Post
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          .testimonial-card {
            position: relative !important;
            width: 100% !important;
            left: 0 !important;
            top: 0 !important;
            margin-bottom: 20px;
            filter: none !important;
            transform: none !important;
            height: auto !important;
          }
          
          div[ref] {
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}