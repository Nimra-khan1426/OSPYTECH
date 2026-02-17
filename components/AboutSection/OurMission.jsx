"use client";

import { useRef } from "react";

export default function OurMission() {
  const sectionRef = useRef(null);

  return (
    <section className="mission-section" ref={sectionRef} id="Mission">
      <div className="mission-container">

        {/* LEFT IMAGES - Using Background Images */}
        <div className="mission-images">
          <div className="image-wrapper">
            {/* Main Image - Background Image */}
            <div 
              className="img main"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Small Overlay Image - Background Image */}
            <div 
              className="img small"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="mission-content">
          <h2>Our Mission</h2>

          <p>
            To provide innovative, quality craftsmanship and a commitment
            to sustainable growth. We aim to build lasting relationships
            through integrity, precision, and customer-centric solutions.
          </p>

          <ul className="mission-list">
            <li>Fostering Sustainable Growth</li>
            <li>Innovating for a Sustainable Future</li>
            <li>Customer-Centric Approach</li>
            <li>Building Stronger Communities</li>
          </ul>
        </div>

      </div>

      <style jsx>{`
        .mission-section {
          padding: 100px 5%;
          background: #fff;
          overflow: hidden;
        }

        .mission-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* IMAGES SECTION */
        .mission-images {
          position: relative;
          width: 100%;
          height: 500px;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .img {
          position: absolute;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .img.main {
          width: 80%;
          height: 90%;
          left: 0;
          top: 0;
          z-index: 2;
        }

        .img.small {
          width: 60%;
          height: 60%;
          right: 0;
          bottom: 0;
          border: 8px solid #fff;
          z-index: 3;
        }

        .img:hover {
          transform: translateY(-5px);
        }

        /* CONTENT SECTION */
        .mission-content {
          padding-left: 20px;
        }

        .mission-content h2 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 24px;
          line-height: 1.2;
          color: #111827;
          background: linear-gradient(135deg, #000000, #000000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mission-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4b5563;
          margin-bottom: 32px;
        }

        .mission-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mission-list li {
          position: relative;
          padding-left: 36px;
          margin-bottom: 16px;
          font-size: 1.1rem;
          font-weight: 500;
          color: #374151;
          line-height: 1.6;
        }

        .mission-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          color: #016712;
          font-size: 1.3rem;
          font-weight: bold;
          width: 28px;
          height: 28px;
        
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* RESPONSIVE */
        @media (max-width: 1200px) {
          .mission-container {
            gap: 60px;
          }
          
          .mission-images {
            height: 450px;
          }
          
          .mission-content h2 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 1024px) {
          .mission-container {
            grid-template-columns: 1fr;
            gap: 60px;
            text-align: center;
          }
          
          .mission-images {
            height: 400px;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .mission-content {
            padding-left: 0;
          }
          
          .mission-list li {
            text-align: left;
          }
          
          .img.main {
            width: 85%;
            height: 85%;
          }
          
          .img.small {
            width: 55%;
            height: 55%;
          }
        }

        @media (max-width: 768px) {
          .mission-section {
            padding: 80px 5%;
          }
          
          .mission-images {
            height: 350px;
          }
          
          .mission-content h2 {
            font-size: 2.2rem;
          }
          
          .mission-content p {
            font-size: 1rem;
          }
          
          .mission-list li {
            font-size: 1rem;
            padding-left: 32px;
          }
          
          .img.main {
            width: 90%;
            height: 80%;
          }
          
          .img.small {
            width: 50%;
            height: 50%;
            border-width: 6px;
          }
        }

        @media (max-width: 480px) {
          .mission-section {
            padding: 60px 5%;
          }
          
          .mission-container {
            gap: 40px;
          }
          
          .mission-images {
            height: 280px;
          }
          
          .mission-content h2 {
            font-size: 1.9rem;
          }
          
          .img {
            border-radius: 18px;
          }
          
          .img.main {
            width: 95%;
            height: 75%;
          }
          
          .img.small {
            width: 45%;
            height: 45%;
            border-width: 5px;
          }
          
          .mission-list li::before {
            width: 24px;
            height: 24px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}