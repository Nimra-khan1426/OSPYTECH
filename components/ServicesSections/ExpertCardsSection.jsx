"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExpertCardsSection() {
  const cardRefs = useRef([]);
  const circleContainerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const slideshowImages = [
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/675139d52a382a1c6d8fb5aa_Card-2.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/675139d6974df788a5e5c060_Card-3.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/675139d53af2aafe44758aff_Card-4.avif"
  ];

  const circleImages = [
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/67696f393973099b3a68bea3_Frame%201707480426as.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/6750a7cfd9e09f811b80d179_image-2.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/6750a7cfb1b723eb0cba02e1_image-1.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/6750a7ce10d7b20f4b7c916d_image.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/6750a7ced96ba51ec2b0a7a_telegram-cloud-document-2-5307772854148818830.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/6750a7cf2bba3e4b32727fc3_image-3.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/6750a7ce7141c79dc2273e9f_Frame%201707480427.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/6758da20c433eea4cf5b16fd_img-new.avif",
    "https://cdn.prod.website-files.com/673786754d248974527e65b5/6758da178c8965007bc597cd_asldkm.avif"
  ];

  const cards = [
    {
      number: "20+",
      text: "Team of talented creative experts",
      isFirstCard: true
    },
    {
      number: "5+ Years",
      text: "Experience in transforming businesses",
      img: "https://cdn.prod.website-files.com/673786754d248974527e65b5/675139d511c6b6144ad5d7de_Card-1.avif",
    },
    {
      number: "100+",
      text: "Successfully completed projects",
      img: "https://cdn.prod.website-files.com/673786754d248974527e65b5/675139d5e8a345677c90f7b3_Card.avif",
    },
    {
      number: "15+ Industries",
      text: "Diverse experience across multiple sectors",
      img: slideshowImages[0],
      isSlideshow: true
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    
    const checkVisibility = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isInView) {
          setIsVisible(true);
        }
      }
    };
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Cards animations
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.set(card, {
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 80,
          scale: isVisible ? 1 : 0.95
        });
        
        const numberEl = card.querySelector('.expert-card-number');
        const textEl = card.querySelector('.expert-card-text');
        const imgEl = card.querySelector('.expert-card-img, .circles-background, .slideshow-background');
        
        if (numberEl) {
          gsap.set(numberEl, {
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 30
          });
        }
        
        if (textEl) {
          gsap.set(textEl, {
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20
          });
        }
        
        if (imgEl && !card.classList.contains('expert-card-first')) {
          gsap.set(imgEl, {
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.9
          });
        }
      });

      // Animate cards when they come into view
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          {
            opacity: 0,
            y: 80,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 30%",
              toggleActions: "play none none reverse",
              onEnter: () => setIsVisible(true)
            }
          }
        );

        const numberEl = card.querySelector('.expert-card-number');
        const textEl = card.querySelector('.expert-card-text');
        const imgEl = card.querySelector('.expert-card-img, .circles-background, .slideshow-background');

        if (numberEl) {
          gsap.fromTo(numberEl,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2 + 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 40%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        if (textEl) {
          gsap.fromTo(textEl,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2 + 0.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 40%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        if (imgEl && !card.classList.contains('expert-card-first')) {
          gsap.fromTo(imgEl,
            {
              opacity: 0,
              scale: 0.9
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2 + 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 40%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // INFINITE LOOP ANIMATIONS FOR CARDS

      // Card 1 - Floating pulse effect
      const firstCard = cardRefs.current[0];
      if (firstCard) {
        // Card floating animation
        gsap.to(firstCard, {
          y: -5,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: firstCard,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        });

        // Text glow effect
        const numberEl = firstCard.querySelector('.expert-card-number');
        if (numberEl) {
          gsap.to(numberEl, {
            textShadow: "0 0 20px rgba(1, 103, 18, 0.5)",
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: firstCard,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse"
            }
          });
        }
      }

      // Card 2 - Scale pulse with shine
      const secondCard = cardRefs.current[1];
      if (secondCard) {
        // Card scale pulse
        gsap.to(secondCard, {
          scale: 1.02,
          duration: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: secondCard,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        });

        // Image brightness pulse
        const imgEl = secondCard.querySelector('.expert-card-img');
        if (imgEl) {
          gsap.to(imgEl, {
            filter: "brightness(1.1) contrast(1.2)",
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: secondCard,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse"
            }
          });
        }
      }

      // Card 3 - Rotating border glow
      const thirdCard = cardRefs.current[2];
      if (thirdCard) {
        // Border gradient animation
        gsap.to(thirdCard, {
          borderColor: "rgba(1, 103, 18, 0.5)",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: thirdCard,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        });

        // Text color pulse
        const textEl = thirdCard.querySelector('.expert-card-text');
        if (textEl) {
          gsap.to(textEl, {
            color: "#01560d",
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: thirdCard,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse"
            }
          });
        }
      }

      // Card 4 - Slideshow (already infinite)
      const slideshowCard = cardRefs.current[3];
      if (slideshowCard) {
        // Additional shine effect for slideshow
        gsap.to(slideshowCard, {
          boxShadow: "0 0 30px rgba(76, 175, 80, 0.3)",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: slideshowCard,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // FIRST CARD CIRCLES ANIMATION - EXACT SAME AS WEBFLOW EXAMPLE
      const firstCardCircles = cardRefs.current[0];
      if (firstCardCircles && circleContainerRef.current) {
        const circleContainer = circleContainerRef.current;
        const circles = circleContainer.querySelectorAll('.cl');
        const centerLogo = circleContainer.querySelector('.c-center');
        
        // IMPORTANT: Center logo ki inline style clear karein
        if (centerLogo) {
          centerLogo.style.transform = '';
          centerLogo.style.opacity = '1';
          centerLogo.style.visibility = 'visible';
          centerLogo.style.transformStyle = 'preserve-3d';
          centerLogo.style.willChange = 'transform';
        }
        
        // Circles ki inline styles
        circles.forEach(circle => {
          circle.style.transformStyle = 'preserve-3d';
          circle.style.willChange = 'transform';
          circle.style.opacity = '1';
        });
        
        // Container styles
        circleContainer.style.transformStyle = 'preserve-3d';
        circleContainer.style.willChange = 'transform';
        
        // Webflow-style continuous rotation
        const rotationTl = gsap.timeline({ 
          repeat: -1,
          defaults: { 
            ease: "none"
          }
        });
        
        // Container rotates continuously (clockwise)
        rotationTl.to(circleContainer, {
          rotation: "+=360",
          duration: 30,
          modifiers: {
            rotation: gsap.utils.unitize(parseFloat)
          }
        }, 0);
        
        // REMOVED: Center logo rotation animation - center logo stationary rahega
        
        // Outer circles rotate opposite way (counter-clockwise)
        circles.forEach(circle => {
          // Center logo ko skip karein
          if (!circle.classList.contains('c-center')) {
            rotationTl.to(circle, {
              rotation: "-=360",
              duration: 30,
              modifiers: {
                rotation: gsap.utils.unitize(parseFloat)
              }
            }, 0);
          }
        });
        
        // Animate circles and center logo in with scale effect
        const allImages = centerLogo ? [...circles, centerLogo] : [...circles];
        gsap.fromTo(allImages,
          {
            scale: 0
          },
          {
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: firstCardCircles,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        // ScrollTrigger to control animation
        ScrollTrigger.create({
          trigger: firstCardCircles,
          start: "top 85%",
          onEnter: () => rotationTl.play(),
          onLeave: () => rotationTl.pause(),
          onEnterBack: () => rotationTl.play(),
          onLeaveBack: () => rotationTl.pause(),
        });
      }

      // Slideshow animation for last card
      const slideshowCardTimeline = cardRefs.current[3];
      if (slideshowCardTimeline) {
        const slideshowImagesEl = slideshowCardTimeline.querySelectorAll('.slideshow-img');
        const paginationLines = slideshowCardTimeline.querySelectorAll('.pagination-line-fill');

        if (slideshowImagesEl.length > 0) {
          gsap.set(slideshowImagesEl[0], { opacity: 1 });
        }

        const slideshowTimeline = gsap.timeline({ repeat: -1 });
        
        slideshowImages.forEach((_, index) => {
          const nextIndex = (index + 1) % slideshowImages.length;
          
          slideshowTimeline.to(slideshowImagesEl[index], {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
          }, index * 3)
          .to(slideshowImagesEl[nextIndex], {
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut"
          }, index * 3)
          .to(paginationLines[index], {
            width: "100%",
            duration: 3,
            ease: "none"
          }, index * 3);
        });

        ScrollTrigger.create({
          trigger: slideshowCardTimeline,
          start: "top 90%",
          onEnter: () => slideshowTimeline.play(),
          onLeave: () => slideshowTimeline.pause(),
          onEnterBack: () => slideshowTimeline.play(),
          onLeaveBack: () => slideshowTimeline.pause(),
        });
      }

      // Hover effects
      cardRefs.current.forEach((card) => {
        if (!card) return;
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
          
          const bgImg = card.querySelector('.expert-card-img, .circles-background, .slideshow-background');
          if (bgImg) {
            gsap.to(bgImg, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          
          const bgImg = card.querySelector('.expert-card-img, .circles-background, .slideshow-background');
          if (bgImg) {
            gsap.to(bgImg, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMounted, isVisible]);

  return (
    <section className="expert-cards-section" ref={sectionRef} id="expertise">
      <h2 className="expert-section-title">Our Expertise</h2>
      <div className="expert-cards-wrap">
        {cards.map((card, index) => (
          <div
            className={`expert-card ${card.isSlideshow ? 'expert-card-slideshow' : ''} ${card.isFirstCard ? 'expert-card-first' : ''}`}
            key={index}
            ref={addToRefs}
          >
            {/* Background Images */}
            <div className="card-background-container">
              {card.isFirstCard ? (
                <div 
                  className="circles-container" 
                  ref={circleContainerRef}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                  }}
                >
                  <img
                    src="https://cdn.prod.website-files.com/673786754d248974527e65b5/6750a7ce52cd748dc1c4e354_circles.avif"
                    alt="Background circles"
                    className="circles-big"
                    loading="lazy"
                  />
                  <img
                    src="https://cdn.prod.website-files.com/673786754d248974527e65b5/6750a7ce510e19ff14b4e61b_Group%201707478598.avif"
                    alt="Center logo"
                    className="cl c-center"
                    loading="lazy"
                    style={{ 
                      opacity: 1, 
                      visibility: 'visible',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform'
                    }}
                  />
                  {circleImages.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`Circle ${imgIndex + 1}`}
                      className={`cl gc${imgIndex + 1}`}
                      loading="lazy"
                      style={{ 
                        opacity: 1, 
                        visibility: 'visible',
                        transformStyle: 'preserve-3d',
                        willChange: 'transform'
                      }}
                    />
                  ))}
                </div>
              ) : card.isSlideshow ? (
                <div className="slideshow-background">
                  {slideshowImages.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`Slide ${imgIndex + 1}`}
                      className="slideshow-img"
                      loading="lazy"
                    />
                  ))}
                  
                  <div className="pagination-container">
                    {slideshowImages.map((_, pagIndex) => (
                      <div key={pagIndex} className="pagination-line">
                        <div className="pagination-line-bg"></div>
                        <div className="pagination-line-fill"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <img 
                  src={card.img} 
                  alt={card.text}
                  className="expert-card-img"
                  loading="lazy"
                />
              )}
            </div>
            
            {/* Text Content */}
            <div className="card-text-content">
              <div className="text-overlay"></div>
              <h3 className="expert-card-number">{card.number}</h3>
              <p className="expert-card-text">{card.text}</p>
            </div>
            
            {/* Top gradient line */}
            <div className="card-top-line"></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .expert-cards-section {
          padding: 50px 20px;
          background: #f8fafc;
          text-align: center;
          min-height: 100vh;
           width:auto;
        }

        .expert-section-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 80px;
          color: #016712;
          letter-spacing: -0.02em;
          position: relative;
          display: inline-block;
        }

      

        .expert-cards-wrap {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        @media (max-width: 1200px) {
          .expert-cards-wrap {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .expert-cards-wrap {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }

        .expert-card {
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.05),
            0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.03);
          height: 430px;
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
          visibility: visible !important;
          width: 280px;
        }

        .card-background-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 20px;
          z-index: 1;
          opacity: 1 !important;
          transform: scale(1) !important;
        }

        .card-text-content {
          position: relative;
          z-index: 10;
          padding: 40px 30px;
          text-align: left;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          pointer-events: none;
        }

        .expert-card-slideshow .card-top-line {
          background: linear-gradient(90deg, #4CAF50, #8BC34A);
        }

        .expert-card-number {
          font-size: 2.5rem;
          font-weight: 900;
          color: #016712;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.05);
          opacity: 1 !important;
          transform: translateY(0) !important;
          visibility: visible !important;
        }

        .expert-card-slideshow .expert-card-number {
          color: white;
          text-shadow: 
            0 2px 6px rgba(0, 0, 0, 0.8),
            0 4px 12px rgba(0, 0, 0, 0.6);
        }

        .expert-card-text {
          font-size: 1rem;
          color: #2d3748;
          line-height: 1.6;
          font-weight: 600;
          max-width: 90%;
          text-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.1),
            0 2px 4px rgba(0, 0, 0, 0.05);
          opacity: 1 !important;
          transform: translateY(0) !important;
          visibility: visible !important;
        }

        .expert-card-slideshow .expert-card-text {
          color: white;
          text-shadow: 
            0 1px 4px rgba(0, 0, 0, 0.8),
            0 2px 8px rgba(0, 0, 0, 0.6);
        }

        /* First card circles - EXACT SAME AS WEBFLOW */
        .circles-container {
          position: absolute;
          top: 70%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 320px;
          height: 320px;
          opacity: 1 !important;
          transform-origin: center center !important;
        }

        .circles-big {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.5;
          filter: blur(2px);
          top: 0;
          left: 0;
        }

        .cl {
          position: absolute;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 1;
          opacity: 1 !important;
          visibility: visible !important;
          transform-origin: center center !important;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          margin-left: -20px;
          margin-top: -20px;
          transform: initial !important;
        }

        .c-center {
          width: 60px;
          height: 60px;
          object-fit: contain;
          z-index: 2;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          margin-left: -30px;
          margin-top: -30px;
          transform: initial !important;
        }

        .gc1 { 
          transform: translate(140px, 0) !important; 
        }
        .gc2 { 
          transform: rotate(40deg) translate(130px, 0) rotate(-40deg) !important; 
        }
        .gc3 { 
          transform: rotate(80deg) translate(130px, 0) rotate(-80deg) !important; 
        }
        .gc4 { 
          transform: rotate(120deg) translate(130px, 0) rotate(-120deg) !important; 
        }
        .gc5 { 
          transform: rotate(160deg) translate(130px, 0) rotate(-160deg) !important; 
        }
        .gc6 { 
          transform: rotate(200deg) translate(130px, 0) rotate(-200deg) !important; 
        }
        .gc7 { 
          transform: rotate(240deg) translate(130px, 0) rotate(-240deg) !important; 
        }
        .gc8 { 
          transform: rotate(280deg) translate(130px, 0) rotate(-280deg) !important; 
        }
        .gc9 { 
          transform: rotate(320deg) translate(130px, 0) rotate(-320deg) !important; 
        }

        /* Slideshow styles */
        .slideshow-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          opacity: 1 !important;
        }

        .slideshow-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
        }

        .slideshow-img:first-child {
          opacity: 1 !important;
        }

        .expert-card-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 390px;
          height: 430px;
          object-fit: cover;
          opacity: 1 !important;
          transform: scale(1) !important;
          filter: brightness(0.9) contrast(1.1);
        }

        /* Pagination */
        .pagination-container {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          display: flex;
          gap: 8px;
          z-index: 20;
        }

        .pagination-line {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .pagination-line-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.3);
        }

        .pagination-line-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: white;
          border-radius: 4px;
        }

        .expert-card:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 5px 15px rgba(0, 0, 0, 0.05);
          transform: translateY(-10px) scale(1.02) !important;
        }

        .expert-card:hover .expert-card-number {
          color: #01560d;
        }

        .expert-card-slideshow:hover .expert-card-number {
          color: #ffffff;
        }

        @media (max-width: 1200px) {
          .expert-card {
            height: 380px;
          }
          
          .circles-container {
            width: 280px;
            height: 280px;
          }
          
          .cl {
            width: 35px;
            height: 35px;
            margin-left: -17.5px;
            margin-top: -17.5px;
          }
          
          .c-center {
            width: 50px;
            height: 50px;
            margin-left: -25px;
            margin-top: -25px;
          }
          
          .gc1 { transform: translate(100px, 0) !important; }
          .gc2 { transform: rotate(40deg) translate(100px, 0) rotate(-40deg) !important; }
          .gc3 { transform: rotate(80deg) translate(100px, 0) rotate(-80deg) !important; }
          .gc4 { transform: rotate(120deg) translate(100px, 0) rotate(-120deg) !important; }
          .gc5 { transform: rotate(160deg) translate(100px, 0) rotate(-160deg) !important; }
          .gc6 { transform: rotate(200deg) translate(100px, 0) rotate(-200deg) !important; }
          .gc7 { transform: rotate(240deg) translate(100px, 0) rotate(-240deg) !important; }
          .gc8 { transform: rotate(280deg) translate(100px, 0) rotate(-280deg) !important; }
          .gc9 { transform: rotate(320deg) translate(100px, 0) rotate(-320deg) !important; }
        }

        @media (max-width: 768px) {
          .expert-cards-section {
            padding: 80px 20px;
          }

          .expert-section-title {
            font-size: 2.5rem;
            margin-bottom: 60px;
          }

          .expert-card {
            height: 350px;
          }

          .card-text-content {
            padding: 30px 25px;
          }

          .expert-card-number {
            font-size: 2.8rem;
          }

          .expert-card-text {
            font-size: 1.05rem;
            max-width: 95%;
          }

          .circles-container {
            width: 250px;
            height: 250px;
          }
          
          .cl {
            width: 30px;
            height: 30px;
            margin-left: -15px;
            margin-top: -15px;
          }
          
          .c-center {
            width: 45px;
            height: 45px;
            margin-left: -22.5px;
            margin-top: -22.5px;
          }
          
          .gc1 { transform: translate(90px, 0) !important; }
          .gc2 { transform: rotate(40deg) translate(90px, 0) rotate(-40deg) !important; }
          .gc3 { transform: rotate(80deg) translate(90px, 0) rotate(-80deg) !important; }
          .gc4 { transform: rotate(120deg) translate(90px, 0) rotate(-120deg) !important; }
          .gc5 { transform: rotate(160deg) translate(90px, 0) rotate(-160deg) !important; }
          .gc6 { transform: rotate(200deg) translate(90px, 0) rotate(-200deg) !important; }
          .gc7 { transform: rotate(240deg) translate(90px, 0) rotate(-240deg) !important; }
          .gc8 { transform: rotate(280deg) translate(90px, 0) rotate(-280deg) !important; }
          .gc9 { transform: rotate(320deg) translate(90px, 0) rotate(-320deg) !important; }
        }

        @media (max-width: 480px) {
          .expert-cards-wrap {
            padding: 0 10px;
            gap: 20px;
          }

          .expert-card {
            height: 320px;
          }

          .card-text-content {
            padding: 25px 20px;
          }

          .expert-card-number {
            font-size: 2.5rem;
          }

          .expert-card-text {
            font-size: 1rem;
          }

          .circles-container {
            width: 220px;
            height: 220px;
          }
          
          .cl {
            width: 25px;
            height: 25px;
            margin-left: -12.5px;
            margin-top: -12.5px;
          }
          
          .c-center {
            width: 40px;
            height: 40px;
            margin-left: -20px;
            margin-top: -20px;
          }
          
          .gc1 { transform: translate(70px, 0) !important; }
          .gc2 { transform: rotate(40deg) translate(70px, 0) rotate(-40deg) !important; }
          .gc3 { transform: rotate(80deg) translate(70px, 0) rotate(-80deg) !important; }
          .gc4 { transform: rotate(120deg) translate(70px, 0) rotate(-120deg) !important; }
          .gc5 { transform: rotate(160deg) translate(70px, 0) rotate(-160deg) !important; }
          .gc6 { transform: rotate(200deg) translate(70px, 0) rotate(-200deg) !important; }
          .gc7 { transform: rotate(240deg) translate(70px, 0) rotate(-240deg) !important; }
          .gc8 { transform: rotate(280deg) translate(70px, 0) rotate(-280deg) !important; }
          .gc9 { transform: rotate(320deg) translate(70px, 0) rotate(-320deg) !important; }
        }
      `}</style>
    </section>
  );
}