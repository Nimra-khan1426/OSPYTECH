"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Title animation
    gsap.from(".about-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Description animation
    gsap.from(".about-description", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Image animation
    gsap.from(".about-image", {
      opacity: 0,
      x: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Stats animation
    gsap.from(".stat-item", {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.6,
      delay: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Button animation
    gsap.from(".learn-more-btn", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="who">
      <div className="container">
        <div className="about-grid">
          {/* Left Column - Content */}
          <div className="about-content">
            <div className="content-wrapper">
              <div className="about-header">
                <div className="about-badge">About Us</div>
                <h1 className="about-title">
                  Driven by <span className="green">Innovation.</span><br />
                  Powered by <span className="green">People.</span>
                </h1>
              </div>

              <p className="about-description">
                With years of hands-on experience in SaaS development, cloud architecture, 
                and enterprise IT services, we empower businesses to adapt to changing 
                technologies, scale operations seamlessly, and thrive in an increasingly 
                competitive digital world.
              </p>

              <div className="learn-more">
                <a href="http://localhost:3000/contact" className="learn-more-btn">
                  Contact Us 
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Image + Small Stats */}
          <div className="about-visual">
            {/* Tech Team Image */}
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Tech Team Collaboration"
              />
            </div>
            
            {/* Small Stats Row */}
            <div className="stats-row">
              {/* Stat 1 */}
              <div className="stat-item">
                <div className="stat-number">90%</div>
                <div className="stat-divider"></div>
                <div className="stat-label">Client satisfaction</div>
              </div>

              {/* Stat 2 */}
              <div className="stat-item">
                <div className="stat-number">180+</div>
                <div className="stat-divider"></div>
                <div className="stat-label">Projects Done</div>
              </div>

              {/* Stat 3 */}
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-divider"></div>
                <div className="stat-label">Revenue Raised</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 100px 40px;
          background: #ffffff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: flex-start;
        }

        /* Left Content */
        .about-content {
          padding-top: 20px;
        }

        .content-wrapper {
          max-width: 520px;
        }
        
        .green {
  color: #016712;
}
        .about-header {
          margin-bottom: 40px;
        }

        .about-badge {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: #016712;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0.8;
        }

        .about-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.1;
          color: #000000;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .about-description {
          font-size: 18px;
          line-height: 1.7;
          color: #666666;
          margin-bottom: 50px;
          max-width: 480px;
        }

        .learn-more {
          margin-top: 40px;
        }

        .learn-more-btn {
          display: inline-block;
          padding: 16px 40px;
          background: #000000;
          color: #ffffff;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          border: 1px solid #000000;
        }

        .learn-more-btn:hover {
          background: transparent;
          color: #000000;
        }

        /* Right Visual */
        .about-visual {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .about-image {
          width: 100%;
          height: 300px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Small Stats Row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 500;
          color: #000000;
          line-height: 1;
          letter-spacing: -1px;
        }

        .stat-divider {
          width: 40px;
          height: 1px;
          background: #000000;
          opacity: 0.3;
        }

        .stat-label {
          font-size: 14px;
          color: #666666;
          line-height: 1.4;
          font-weight: 400;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .about-grid {
            gap: 60px;
          }
          
          .about-title {
            font-size: 42px;
          }
          
          .about-image {
            height: 280px;
          }
          
          .stat-number {
            font-size: 28px;
          }
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          
          .content-wrapper {
            max-width: 100%;
          }
          
          .about-description {
            max-width: 100%;
          }
          
          .about-visual {
            max-width: 600px;
            margin: 0 auto;
          }
          
          .about-image {
            height: 250px;
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 80px 24px;
          }
          
          .about-title {
            font-size: 36px;
          }
          
          .about-description {
            font-size: 16px;
            margin-bottom: 40px;
          }
          
          .about-image {
            height: 220px;
          }
          
          .stats-row {
            gap: 20px;
          }
          
          .stat-number {
            font-size: 24px;
          }
          
          .stat-label {
            font-size: 13px;
          }
          
          .learn-more-btn {
            padding: 14px 32px;
          }
        }

        @media (max-width: 640px) {
          .stats-row {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .stat-item {
            flex-direction: row;
            align-items: center;
            gap: 15px;
          }
          
          .stat-divider {
            width: 1px;
            height: 24px;
          }
          
          .stat-label {
            margin-left: 10px;
          }
        }

        @media (max-width: 480px) {
          .about-section {
            padding: 60px 20px;
          }
          
          .about-title {
            font-size: 32px;
          }
          
          .about-image {
            height: 200px;
          }
          
          .learn-more-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}