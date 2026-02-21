"use client";

import { useRef } from "react";

export default function PartnerInProgress() {
  const sectionRef = useRef(null);

  return (
    <section className="partner-section" ref={sectionRef}>
      <div className="container">
        <div className="layout-grid">
          {/* RIGHT - Heading - Will move to top on mobile */}
          <div className="heading-column">
            <div className="heading-content">
              <h1 className="main-heading">
                Your Partner <br />in <span className="green">Progress</span>
              </h1>
              <p className="sub-heading">
                Driving <span className="green">Technology</span> innovation for business growth
              </p>
            </div>
          </div>

          {/* LEFT - Services */}
          <div className="services-column">
            <div className="services-container">
              <div className="service-item">
                <h3>Cloud Infrastructure & DevOps</h3>
                <p>Scalable cloud solutions and automated deployment pipelines for seamless operations</p>
              </div>

              <div className="divider-line"></div>

              <div className="service-item">
                <h3>Cybersecurity & Risk Management</h3>
                <p>Proactive threat detection and robust security protocols to safeguard your digital assets</p>
              </div>
            </div>
          </div>

          {/* CENTER - Clean Images Grid */}
          <div className="image-column">
            <div className="images-grid">
              {/* Top Left - Data Center */}
              <div className="grid-item">
                <div className="grid-image-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1934&auto=format&fit=crop" 
                    alt="Data Center"
                    className="grid-image"
                    loading="lazy"
                  />
                </div>
                <div className="grid-label">
                  <span className="grid-number">01</span>
                  <span className="grid-text">Data Centers</span>
                </div>
              </div>
              
              {/* Top Right - Network Security */}
              <div className="grid-item">
                <div className="grid-image-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Network Security"
                    className="grid-image"
                    loading="lazy"
                  />
                </div>
                <div className="grid-label">
                  <span className="grid-number">02</span>
                  <span className="grid-text">Network Security</span>
                </div>
              </div>
              
              {/* Bottom - Cloud Infrastructure */}
              <div className="grid-item large">
                <div className="grid-image-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                    alt="Cloud Infrastructure"
                    className="grid-image"
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="grid-label">
                  <span className="grid-number">03</span>
                  <span className="grid-text">Cloud Infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .partner-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 40px;
          background: #cfe8cf77;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .layout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        
        .green {
          color: #016712;
        }

        /* LEFT - Services */
        .services-column {
          display: flex;
          justify-content: flex-end;
        }

        .services-container {
          max-width: 400px;
        }

        .service-item {
          margin-bottom: 32px;
        }

        .service-item h3 {
          font-size: 26px;
          font-weight: 500;
          color: #000000;
          margin-bottom: 12px;
          line-height: 1.3;
          letter-spacing: -0.5px;
        }

        .service-item p {
          color: #666666;
          font-size: 16px;
          line-height: 1.6;
          margin: 0;
          font-weight: 400;
        }

        .divider-line {
          width: 60px;
          height: 1px;
          background: #000000;
          margin: 40px 0;
          opacity: 0.2;
        }

        /* CENTER - Clean Images Grid */
        .image-column {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          width: 100%;
          max-width: 500px;
        }

        .grid-item {
          display: flex;
          flex-direction: column;
        }

        .grid-item.large {
          grid-column: 1 / span 2;
        }

        .grid-image-wrapper {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #f5f5f5;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .grid-item:not(.large) .grid-image-wrapper {
          aspect-ratio: 1 / 1;
          height: 220px;
        }

        .grid-item.large .grid-image-wrapper {
          aspect-ratio: 2 / 1;
          height: 240px;
        }

        .grid-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .grid-image-wrapper:hover .grid-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
          pointer-events: none;
        }

        .grid-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          padding: 0 4px;
        }

        .grid-number {
          font-size: 14px;
          font-weight: 500;
          color: #999999;
          min-width: 24px;
        }

        .grid-text {
          font-size: 16px;
          color: #000000;
          font-weight: 500;
          line-height: 1.3;
        }

        /* RIGHT - Heading */
        .heading-column {
          display: flex;
          justify-content: flex-start;
        }

        .heading-content {
          max-width: 380px;
        }

        .main-heading {
          font-size: 56px;
          line-height: 1.1;
          color: #000000;
          font-weight: 600;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }

        .sub-heading {
          font-size: 20px;
          color: #000000;
          font-weight: 500;
          margin: 0;
          opacity: 0.7;
          line-height: 1.5;
        }

        /* RESPONSIVE */
        @media (max-width: 1280px) {
          .layout-grid {
            gap: 60px;
          }
          
          .grid-item:not(.large) .grid-image-wrapper {
            height: 200px;
          }
          
          .grid-item.large .grid-image-wrapper {
            height: 220px;
          }
          
          .main-heading {
            font-size: 50px;
          }
        }

        @media (max-width: 1024px) {
          .layout-grid {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
          }

          .heading-column {
            grid-column: 1 / span 2;
            grid-row: 1; /* Heading ko row 1 pe rakha */
            justify-content: center;
            text-align: center;
            margin-bottom: 40px;
          }

          .services-column {
            grid-column: 1;
            grid-row: 2;
            justify-content: flex-start;
          }

          .image-column {
            grid-column: 2;
            grid-row: 2;
            justify-content: flex-start;
          }
          
          .services-container {
            max-width: 100%;
          }
          
          .images-grid {
            max-width: 100%;
          }
          
          .grid-item:not(.large) .grid-image-wrapper {
            height: 180px;
          }
          
          .grid-item.large .grid-image-wrapper {
            height: 200px;
          }
          
          .main-heading {
            font-size: 46px;
          }
          
          .sub-heading {
            font-size: 18px;
          }
        }

        @media (max-width: 900px) {
          .layout-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .heading-column {
            grid-column: 1;
            grid-row: 1; /* Heading sabse upar */
            margin-bottom: 20px;
          }

          .services-column {
            grid-column: 1;
            grid-row: 2;
            justify-content: center;
            text-align: center;
          }

          .image-column {
            grid-column: 1;
            grid-row: 3;
            justify-content: center;
          }
          
          .divider-line {
            margin-left: auto;
            margin-right: auto;
          }
          
          .images-grid {
            max-width: 500px;
            margin: 0 auto;
          }
          
          .grid-item:not(.large) .grid-image-wrapper {
            height: 200px;
          }
          
          .grid-item.large .grid-image-wrapper {
            height: 220px;
          }
        }

        @media (max-width: 768px) {
          .partner-section {
            padding: 80px 24px;
          }
          
          .images-grid {
            gap: 24px;
          }

          .main-heading {
            font-size: 42px;
          }

          .service-item h3 {
            font-size: 24px;
          }
          
          .grid-text {
            font-size: 15px;
          }
          
          .grid-item:not(.large) .grid-image-wrapper {
            height: 180px;
          }
          
          .grid-item.large .grid-image-wrapper {
            height: 200px;
          }
        }

        @media (max-width: 600px) {
          .images-grid {
            max-width: 400px;
          }
          
          .grid-item:not(.large) .grid-image-wrapper {
            height: 160px;
          }
          
          .grid-item.large .grid-image-wrapper {
            height: 180px;
          }
          
          .main-heading {
            font-size: 38px;
          }
          
          .sub-heading {
            font-size: 17px;
          }
        }

        @media (max-width: 480px) {
          .partner-section {
            padding: 60px 20px;
          }
          
          .images-grid {
            grid-template-columns: 1fr;
            max-width: 300px;
            gap: 20px;
          }
          
          .grid-item.large {
            grid-column: 1;
          }
          
          .grid-item:not(.large) .grid-image-wrapper {
            height: 180px;
          }
          
          .grid-item.large .grid-image-wrapper {
            height: 180px;
          }

          .main-heading {
            font-size: 34px;
          }
          
          .sub-heading {
            font-size: 16px;
          }
          
          .service-item h3 {
            font-size: 22px;
          }
          
          .service-item p {
            font-size: 15px;
          }
          
          .layout-grid {
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
}