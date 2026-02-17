"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";


export default function Testimonials() {
  const sliderRef = useRef(null);
  const dragRef = useRef(null);
  const dragWrapperRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Smooth reveal state - ORIGINAL CODE
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  const testimonials = [
    {
      text: "Eloqwnt did a great job understanding our business of being a platform that helps create AI influencers that spots trends and create show stopping videos.",
      name: "Mav",
      role: "AI Platform",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      linkedin: "https://x.com/0xmaveryk",
    },
    {
      text: "We would like to thank Eloqwnt for the work done on the rebranding of our Company. The new visual identity perfectly captures our vision and values.",
      name: "Mohammed Al Abri",
      role: "Investment Director",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      linkedin: "https://www.linkedin.com/in/mohammed-al-abri-101041a8/",
    },
    {
      text: "Eloqwnt delivered designs that were clearer and easier to navigate. The team was responsive, professional, and quick in their communication.",
      name: "Jill Li",
      role: "Senior Designer, Jogg",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      linkedin: "https://www.linkedin.com/",
    },
    {
      text: "Eloqunt delivered a clean, fast, conversion-focused website for XIM that clarified our messaging and elevated the overall user experience.",
      name: "Taylor Scharman",
      role: "Founder",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      linkedin: "https://www.linkedin.com/in/taylerscharman/",
    },
    {
      text: "An incredibly talented UX/UI team, thoughtful, collaborative, and laser-focused on creating an excellent user experience.",
      name: "Rei Celo",
      role: "Product Lead",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      linkedin: "https://www.linkedin.com/",
    },
    {
      text: "They understood our AI platform vision perfectly and delivered a fresh and timeless design. Can't wait for the world to see it.",
      name: "Alex Chen",
      role: "CEO, TechVibe",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      linkedin: "https://www.linkedin.com/",
    },
  ];

  // ORIGINAL smooth scroll function - Fixed and improved
  useEffect(() => {
    // Check if we're navigating to this section via hash
    const handleHashNavigation = () => {
      if (window.location.hash === '#testimonials' && sectionRef.current) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          sectionRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          setIsVisible(true);
        }, 100);
      }
    };

    // Initial check
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    // Smooth reveal observer - ORIGINAL
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // ORIGINAL resize handler
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        setMaxScroll(sliderRef.current.scrollWidth - sliderRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ORIGINAL scroll function
  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: dir === "next" ? width : -width,
      behavior: "smooth",
    });
  };

  // ORIGINAL handleScroll
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const newScrollPos = sliderRef.current.scrollLeft;
    setScrollPos(newScrollPos);
    
    // Update drag position
    if (dragRef.current && dragWrapperRef.current && !isDragging) {
      const dragWrapperWidth = dragWrapperRef.current.clientWidth;
      const dragWidth = 137.584;
      const maxDrag = dragWrapperWidth - dragWidth;
      const dragPosition = maxScroll > 0 ? (newScrollPos / maxScroll) * maxDrag : 0;
      dragRef.current.style.transform = `translate3d(${dragPosition}px, 0px, 0px)`;
    }
  };

  // ORIGINAL handleDragStart
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    
    const startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const startDragX = dragRef.current ? parseFloat(dragRef.current.style.transform.replace('translate3d(', '').split(',')[0]) || 0 : 0;
    
    const handleMove = (moveEvent) => {
      if (!dragWrapperRef.current || !dragRef.current || !sliderRef.current) return;
      
      const currentX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
      const deltaX = currentX - startX;
      const dragWrapperWidth = dragWrapperRef.current.clientWidth;
      const dragWidth = 137.584;
      const maxDrag = dragWrapperWidth - dragWidth;
      
      let newDragX = startDragX + deltaX;
      newDragX = Math.max(0, Math.min(newDragX, maxDrag));
      
      dragRef.current.style.transform = `translate3d(${newDragX}px, 0px, 0px)`;
      
      // Update slider scroll position
      const newScrollPos = maxScroll > 0 ? (newDragX / maxDrag) * maxScroll : 0;
      sliderRef.current.scrollLeft = newScrollPos;
      setScrollPos(newScrollPos);
    };
    
    const handleEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
  };

  // ORIGINAL getDragPosition
  const getDragPosition = () => {
    if (!dragWrapperRef.current || maxScroll === 0) return 0;
    const dragWrapperWidth = dragWrapperRef.current.clientWidth;
    const dragWidth = 137.584;
    const maxDrag = dragWrapperWidth - dragWidth;
    return (scrollPos / maxScroll) * maxDrag;
  };

  return (
    <section 
      className="testimonials" 
      id="testimonials" 
      ref={sectionRef}
      style={{
        scrollMarginTop: '80px', // Added for smooth scroll
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}
    >
      <div 
        ref={contentRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s'
        }}
      >
        <h4 className="eyebrow">• Testimonials</h4>

        <div className="slider-wrapper">
          <div className="slider" ref={sliderRef} onScroll={handleScroll}>
            {testimonials.map((item, i) => (
              <div 
                key={i} 
                className="card"
                style={{
                  animation: isVisible ? `fadeInUp 0.5s ease ${0.1 * i}s forwards` : 'none',
                  opacity: 0
                }}
              >
                <p className="text">{item.text}</p>

                <div className="footer">
                  <div className="user">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={44}
                      height={44}
                      className="avatar"
                    />
                    <div>
                      <strong>{item.name}</strong>
                      {item.role && <span>{item.role}</span>}
                    </div>
                  </div>

                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin"
                  >
                    <Image
                      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                      alt="LinkedIn"
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* EXACT ORIGINAL structure as Webflow HTML */}
          <div 
            className="w-layout-hflex nav-flex-wap"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s'
            }}
          >
            <div 
              className="swiper-drag-wrapper is-testim swiper-scrollbar-horizontal" 
              ref={dragWrapperRef}
              style={{ transitionDuration: '0ms' }}
            >
              <div 
                className="swiper-drag is-testim" 
                ref={dragRef}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                style={{ 
                  transform: `translate3d(${getDragPosition()}px, 0px, 0px)`,
                  transitionDuration: isDragging ? '0ms' : '300ms',
                  width: '137.584px'
                }}
              />
            </div>
            
            <div className="w-layout-hflex h-flex-arrows-wrap">
              <a 
                href="#" 
                className="swiper-prev w-inline-block" 
                tabIndex={0}
                role="button" 
                aria-label="Previous slide"
                onClick={(e) => {
                  e.preventDefault();
                  scroll("prev");
                }}
              >
                <div className="arrow-slider w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 12" fill="none">
                    <path d="M0.999817 6L16.9998 6" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.9996 11C5.9996 11 0.999645 7.31756 0.999634 5.99996C0.999622 4.68237 5.99963 1 5.99963 1" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
              
              <a 
                href="#" 
                className="swiper-next w-inline-block" 
                tabIndex={0}
                role="button" 
                aria-label="Next slide"
                onClick={(e) => {
                  e.preventDefault();
                  scroll("next");
                }}
              >
                <div className="arrow-slider w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 12" fill="none">
                    <path d="M17.0001 6L1.00012 6" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.0003 11C12.0003 11 17.0002 7.31756 17.0002 5.99996C17.0003 4.68237 12.0002 1 12.0002 1" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ORIGINAL CSS - Exactly as you had it */
        .testimonials {
          padding: 80px 0;
          background: #cdfade36;
          width: auto;
          max-width: auto;
          scroll-margin-top: 80px; /* Added for smooth scroll */
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .eyebrow {
          margin-left: 40px;
          font-size: 3rem;
          font-weight: 600;
          color: #016712;
        }

        .slider-wrapper {
          position: relative;
          margin-top: 40px;
          padding-left: 20px;
          padding-right: 20px;
        }

        .slider {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0 40px 20px 40px;
          scrollbar-width: none;
        }

        .slider::-webkit-scrollbar {
          display: none;
        }

        .card {
          min-width: 300px;
          background: #fff;
          border-radius: 28px;
          padding: 32px;
          scroll-snap-align: start;
        }

        .text {
          font-size: 18px;
          line-height: 1.5;
          margin-bottom: 32px;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          border-radius: 50%;
        }

        .user span {
          display: block;
          font-size: 14px;
          color: #666;
        }

        .linkedin {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #ddd;
          cursor: pointer;
        }

        /* EXACT Webflow classes and styles - ORIGINAL */
        .w-layout-hflex {
          display: flex;
          align-items: center;
        }

        .nav-flex-wap {
          justify-content: space-between;
          padding: 0 40px;
          margin-top: 40px;
        }

        .swiper-drag-wrapper {
          flex: 1;
          height: 4px;
          background: #ccc;
          border-radius: 2px;
          position: relative;
          margin-right: 24px;
          cursor: pointer;
          overflow: hidden;
        }

        .swiper-drag-wrapper.is-testim {
          background: #e0e0e0;
        }

        .swiper-drag {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #0073b1;
          border-radius: 2px;
          cursor: grab;
          will-change: transform;
        }

        .swiper-drag.is-testim {
          background: #000;
        }

        .swiper-drag:active {
          cursor: grabbing;
        }

        .h-flex-arrows-wrap {
          display: flex;
          gap: 12px;
        }

        .swiper-prev,
        .swiper-next {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          color: #000;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .swiper-prev:hover,
        .swiper-next:hover {
          background: #f5f5f5;
        }

        .w-embed {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .arrow-slider {
          width: 18px;
          height: 12px;
        }

        @media (max-width: 768px) {
          .card {
            min-width: 90%;
          }
          
          .nav-flex-wap {
            flex-direction: column;
            gap: 20px;
          }
          
          .swiper-drag-wrapper {
            width: 100%;
            margin-right: 0;
          }
          
          .h-flex-arrows-wrap {
            align-self: flex-end;
          }
          
          .testimonials {
            scroll-margin-top: 60px; /* Adjusted for mobile */
          }
        }
      `}</style>
    </section>
  );
}