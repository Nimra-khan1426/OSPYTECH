"use client";
import { Twitter, Facebook, Instagram, ExternalLink, Star, Quote, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SocialType = "twitter" | "facebook" | "instagram";

type SocialConfig = {
  icon: any;
  color: string;
  hoverColor: string;
  gradient?: string;
};

const socialColors: Record<SocialType, SocialConfig> = {
  twitter: {
    icon: Twitter,
    color: "#1DA1F2",
    hoverColor: "#0d8bd9",
  },
  facebook: {
    icon: Facebook,
    color: "#1877F2",
    hoverColor: "#0d66d9",
  },
  instagram: {
    icon: Instagram,
    color: "#E4405F",
    hoverColor: "#d32a4a",
    gradient: "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
  },
};

// Updated testimonials for Ospytech
const tweets: {
  name: string;
  handle: string;
  text: string;
  avatar: string;
  socialIcon: SocialType;
}[] = [
  {
    name: "Rahul Sharma",
    handle: "@rahul_digital",
    text: "Ospytech transformed our online presence completely. Their team delivered a stunning website that perfectly captures our brand identity.",
    avatar: "https://i.pravatar.cc/150?img=6",
    socialIcon: "twitter",
  },
  {
    name: "Priya Patel",
    handle: "@priya_ventures",
    text: "Working with Ospytech was a game-changer for our startup. They understood our vision and executed it flawlessly.",
    avatar: "https://i.pravatar.cc/150?img=9",
    socialIcon: "facebook",
  },
  {
    name: "Amit Kumar",
    handle: "@amit_tech",
    text: "The mobile app Ospytech developed for us has 5-star ratings on both stores. Their technical expertise is top-notch!",
    avatar: "https://i.pravatar.cc/150?img=1",
    socialIcon: "instagram",
  },
  {
    name: "Neha Singh",
    handle: "@neha_designs",
    text: "Ospytech's UI/UX design team created magic for our platform. User engagement increased by 200% after the redesign.",
    avatar: "https://i.pravatar.cc/150?img=5",
    socialIcon: "twitter",
  },
  {
    name: "Vikram Mehta",
    handle: "@vikram_business",
    text: "Professional and passionate. Ospytech delivered our e-commerce platform ahead of schedule with exceptional quality.",
    avatar: "https://i.pravatar.cc/150?img=3",
    socialIcon: "facebook",
  },
  {
    name: "Anjali Desai",
    handle: "@anjali_creative",
    text: "The team at Ospytech doesn't just build websites; they create experiences. Our clients constantly compliment the design.",
    avatar: "https://i.pravatar.cc/150?img=8",
    socialIcon: "instagram",
  },
  {
    name: "Rajesh Gupta",
    handle: "@rajesh_enterprise",
    text: "Best decision we made was partnering with Ospytech for our digital transformation. Their solutions exceeded all expectations.",
    avatar: "https://i.pravatar.cc/150?img=2",
    socialIcon: "twitter",
  },
  {
    name: "Kavita Reddy",
    handle: "@kavita_tech",
    text: "Ospytech's team understood our complex requirements and delivered a robust solution that scales perfectly.",
    avatar: "https://i.pravatar.cc/150?img=7",
    socialIcon: "facebook",
  },
  {
    name: "Vikram Mehta",
    handle: "@vikram_business",
    text: "Professional and passionate. Ospytech delivered our e-commerce platform ahead of schedule with exceptional quality.",
    avatar: "https://i.pravatar.cc/150?img=3",
    socialIcon: "facebook",
  },
];

export default function TestimonialsSection() {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cardHeights, setCardHeights] = useState<number[]>([]);

  // Original calculateTextHeight - exactly as before
  const calculateTextHeight = (text: string): number => {
    const baseHeight = 80;
    const lineHeight = 24;
    const words = text.split(' ');
    const estimatedLines = Math.ceil(words.length / 6);
    return baseHeight + (estimatedLines * lineHeight);
  };

  useEffect(() => {
    setMounted(true);
    const heights = tweets.map(tweet => calculateTextHeight(tweet.text));
    setCardHeights(heights);
  }, []);

  useEffect(() => {
    if (!mounted || cardHeights.length === 0) return;
    
    const arrangeMasonry = () => {
      const container = containerRef.current;
      if (!container) return;

      const items = container.children as HTMLCollectionOf<HTMLElement>;
      const gap = 20;
      const containerWidth = container.offsetWidth;
      
      const isMobile = containerWidth < 768;
      const columns = isMobile ? 1 : 3; // Mobile 1 column, Desktop 3 columns
      const itemWidth = (containerWidth - (gap * (columns - 1))) / columns;
     
      if (columns <= 0 || items.length === 0) return;

      if (isMobile) {
        // MOBILE ONLY: Simple vertical stack - no absolute positioning
        Array.from(items).forEach((item) => {
          if (item) {
            item.style.position = 'relative';
            item.style.width = '100%';
            item.style.left = '0';
            item.style.top = '0';
            item.style.marginBottom = `${gap}px`;
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.height = 'auto'; // Auto height for mobile
          }
        });
        container.style.height = 'auto';
      } else {
        // DESKTOP: Original masonry layout - exactly as before
        Array.from(items).forEach((item) => {
          if (item) {
            item.style.position = 'absolute';
            item.style.width = `${itemWidth}px`;
            item.style.marginBottom = '0';
          }
        });

        const colHeights = new Array(columns).fill(0);
        const colPositions = new Array(columns).fill(0).map((_, i) => i * (itemWidth + gap));

        Array.from(items).forEach((item, index) => {
          if (!item) return;
          
          const height = cardHeights[index] || 140; // Original default height
          
          let minCol = 0;
          let minHeight = colHeights[0];
          for (let col = 1; col < columns; col++) {
            if (colHeights[col] < minHeight) {
              minHeight = colHeights[col];
              minCol = col;
            }
          }

          item.style.left = `${colPositions[minCol]}px`;
          item.style.top = `${colHeights[minCol]}px`;
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          
          colHeights[minCol] += height + gap;
        });

        container.style.height = `${Math.max(...colHeights) - gap}px`;
      }
    };

    const timer = setTimeout(arrangeMasonry, 200);

    let resizeTimer: ReturnType<typeof setTimeout>;
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

  useEffect(() => {
    if (!mounted || cardRefs.current.length === 0) return;

    const updateHeights = () => {
      const newHeights = cardRefs.current.map((cardRef, index) => {
        if (!cardRef) return calculateTextHeight(tweets[index]?.text || '');
        
        const contentDiv = cardRef.querySelector('.card-content') as HTMLDivElement;
        if (contentDiv) {
          return contentDiv.offsetHeight + 60; // Original padding
        }
        return calculateTextHeight(tweets[index]?.text || '');
      });
      setCardHeights(newHeights);
    };

    const timer = setTimeout(updateHeights, 300);
    return () => clearTimeout(timer);
  }, [mounted]);

  const SocialIcon = ({ type, size = 20 }: { type: SocialType; size?: number }) => {
    const { icon: Icon, color } = socialColors[type] || socialColors.twitter;
    return <Icon size={size} color={color} />;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#c7f9d1",
        padding: "20px 20px 80px 20px",
        color: "#111827",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
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

      {/* Corner Accents */}
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
        {/* HEADING - Original styles preserved */}
        <div style={{
          textAlign: "center",
          marginBottom: "80px",
          position: "relative",
        }}>
          <h3 style={{
            color: "#016712",
            fontSize: "18px",
            marginBottom: "8px",
          }}>Testimonials</h3>

          <div style={{
            position: "relative",
            marginBottom: "24px",
          }}>
            <h1 style={{
              fontSize: "clamp(32px, 8vw, 55px)",
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
              fontSize: "clamp(14px, 4vw, 18px)",
              color: "#6B7280",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.7",
              fontWeight: "400",
              padding: "0 16px",
            }}>
              Trusted by industry leaders and innovative teams worldwide. 
              Here's what they have to say about their experience with Ospytech.
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
            width: "100%",
          }}
        >
          {tweets.map((t, i) => {
            const socialConfig = socialColors[t.socialIcon];
            const isHovered = hoveredCard === i;
            const cardHeight = cardHeights[i] || 140; // Original default height
            
            return (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  opacity: 0,
                  transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  filter: hoveredCard !== null && hoveredCard !== i ? "blur(2px)" : "none",
                  transform: hoveredCard !== null && hoveredCard !== i ? "scale(0.99)" : "scale(1)",
                  height: `${cardHeight}px`,
                  width: "100%",
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
                    padding: cardHeight > 160 ? "24px" : "20px", // Original threshold
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
                      zIndex: 3,
                    }}
                  />

                  {/* Header */}
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
                            zIndex: 3,
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

                    {/* Social Icon Button */}
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

                  {/* Testimonial Text */}
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

                  {/* View Post Indicator */}
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
            opacity: 1 !important;
          }
          
          div[ref] {
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
}