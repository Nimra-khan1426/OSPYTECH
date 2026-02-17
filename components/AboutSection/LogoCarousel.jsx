"use client";

import { useEffect, useRef } from "react";

export default function LogoCarouselSimple() {
  const logos = [
    { name: "Microsoft", img: "/microsoft-logo.svg" },
    { name: "Google", img: "/google-logo.svg" },
    { name: "Amazon", img: "/amazon-logo.svg" },
    { name: "Apple", img: "/apple-logo.svg" },
    { name: "Meta", img: "/meta-logo.svg" },
    { name: "Tesla", img: "/tesla-logo.svg" },
    { name: "Netflix", img: "/netflix-logo.svg" },
    { name: "Adobe", img: "/adobe-logo.svg" },
    { name: "Salesforce", img: "/salesforce-logo.svg" },
    { name: "IBM", img: "/ibm-logo.svg" },
    { name: "Intel", img: "/intel-logo.svg" },
    { name: "Cisco", img: "/cisco-logo.svg" },
    { name: "Oracle", img: "/oracle-logo.svg" },
    { name: "SAP", img: "/sap-logo.svg" },
    { name: "Dell", img: "/dell-logo.svg" },
    { name: "HP", img: "/hp-logo.svg" },
    { name: "Accenture", img: "/accenture-logo.svg" },
    { name: "Deloitte", img: "/deloitte-logo.svg" },
    { name: "PwC", img: "/pwc-logo.svg" },
    { name: "EY", img: "/ey-logo.svg" },
    { name: "KPMG", img: "/kpmg-logo.svg" },
    { name: "Stripe", img: "/stripe-logo.svg" },
    { name: "PayPal", img: "/paypal-logo.svg" },
    { name: "Visa", img: "/visa-logo.svg" },
    { name: "Mastercard", img: "/mastercard-logo.svg" },
  ];

  const carouselRef = useRef(null);
  const duplicatedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId;
    let position = 0;
    const speed = 1.2;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= carousel.scrollWidth / 3) {
        position = 0;
      }
      carousel.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      <section className="logo-carousel-section" id="partners">
        <div className="carousel-header">
          <h2 className="carousel-title">Our Esteemed Partners</h2>
          <p className="carousel-subtitle">
            Trusted by global leaders and innovators
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-track" ref={carouselRef}>
            {duplicatedLogos.map((logo, index) => (
              <div className="logo-item" key={index}>
                <div className="logo-wrapper">
                  <img 
                    src={logo.img} 
                    alt={logo.name} 
                    className="logo-image"
                    onError={(e) => {
                      // Fallback to original Wikipedia URLs if local images not found
                      const fallbackUrls = {
                        "Microsoft": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                        "Google": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                        "Amazon": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                        "Apple": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                        "Meta": "https://upload.wikimedia.org/wikipedia/commons/0/01/Meta_Platforms_Inc._logo.svg",
                        "Tesla": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
                        "Netflix": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
                        "Adobe": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Corporate_logo.svg",
                        "Salesforce": "https://upload.wikimedia.org/wikipedia/commons/7/77/Salesforce_logo.svg",
                        "IBM": "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
                        "Intel": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg",
                        "Cisco": "https://upload.wikimedia.org/wikipedia/commons/8/87/Cisco_logo_blue_2016.svg",
                        "Oracle": "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
                        "SAP": "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
                        "Dell": "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
                        "HP": "https://upload.wikimedia.org/wikipedia/commons/3/32/HP_logo_2012.svg",
                        "Accenture": "https://upload.wikimedia.org/wikipedia/commons/0/00/Accenture.svg",
                        "Deloitte": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Deloitte.svg",
                        "PwC": "https://upload.wikimedia.org/wikipedia/commons/9/99/PwC_logo.svg",
                        "EY": "https://upload.wikimedia.org/wikipedia/commons/f/f3/EY_logo_2019.svg",
                        "KPMG": "https://upload.wikimedia.org/wikipedia/commons/8/88/KPMG_logo.svg",
                        "Stripe": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Stripe_Logo%2C_revised_2016.svg",
                        "PayPal": "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
                        "Visa": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
                        "Mastercard": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      };
                      if (fallbackUrls[logo.name]) {
                        e.target.src = fallbackUrls[logo.name];
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gradient-left"></div>
        <div className="gradient-right"></div>
      </section>

      <style jsx>{`
        .logo-carousel-section {
          padding: 80px 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .carousel-header {
          text-align: center;
          margin: 0 auto 60px;
          max-width: 700px;
          padding: 0 20px;
        }

        .carousel-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #016712;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .carousel-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.6;
        }

        .carousel-container {
          position: relative;
          overflow: hidden;
          padding: 30px 0;
        }

        .carousel-track {
          display: flex;
          align-items: center;
          gap: 50px; /* UNIFORM GAP */
          padding: 0 20px;
        }

        .logo-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 160px; /* FIXED WIDTH */
          height: 80px; /* FIXED HEIGHT */
          padding: 20px;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain; /* MAINTAIN ASPECT RATIO */
          transition: all 0.3s ease;
          opacity: 0.8;
        }

        .logo-image:hover {
          opacity: 1;
          transform: scale(1.05);
        }

        .gradient-left,
        .gradient-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 150px;
          z-index: 2;
          pointer-events: none;
        }

        .gradient-left {
          left: 0;
          background: linear-gradient(90deg, #ffffff 0%, transparent 100%);
        }

        .gradient-right {
          right: 0;
          background: linear-gradient(90deg, transparent 0%, #ffffff 100%);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .carousel-title {
            font-size: 2.2rem;
          }
          
          .carousel-track {
            gap: 40px; /* UNIFORM GAP */
          }
          
          .logo-wrapper {
            width: 140px; /* SAME SIZE */
            height: 70px;
            padding: 15px;
          }
        }

        @media (max-width: 768px) {
          .logo-carousel-section {
            padding: 60px 0;
          }
          
          .carousel-title {
            font-size: 2rem;
          }
          
          .carousel-subtitle {
            font-size: 1rem;
          }
          
          .carousel-track {
            gap: 30px; /* UNIFORM GAP */
          }
          
          .logo-wrapper {
            width: 120px; /* SAME SIZE */
            height: 60px;
            padding: 12px;
          }
          
          .gradient-left,
          .gradient-right {
            width: 80px;
          }
        }

        @media (max-width: 480px) {
          .carousel-title {
            font-size: 1.7rem;
          }
          
          .carousel-track {
            gap: 25px; /* UNIFORM GAP */
          }
          
          .logo-wrapper {
            width: 100px; /* SAME SIZE */
            height: 50px;
            padding: 10px;
          }
          
          .gradient-left,
          .gradient-right {
            width: 60px;
          }
        }
      `}</style>
    </>
  );
}