"use client";

import { useRef } from "react";

export default function OurVision() {
  const sectionRef = useRef(null);

  return (
    <section className="vision-section" ref={sectionRef} id="vision">
      <div className="vision-container">

        {/* LEFT CONTENT */}
        <div className="vision-content">
          <h2>
            Our Vision
          </h2>

          <p>
            We envision a future where innovation, technology, and strategic
            thinking come together to create meaningful impact. Our goal is to
            set new industry benchmarks through excellence, sustainability,
            and forward-thinking solutions.
          </p>

          <ul className="vision-list">
            <li>Driving Digital Transformation</li>
            <li>Building Future-Ready Solutions</li>
            <li>Empowering Businesses Globally</li>
            <li>Leading with Innovation & Trust</li>
          </ul>
        </div>

        {/* RIGHT IMAGES - Using Background Images */}
        <div className="vision-images">
          <div className="img main">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
              alt="Future Planning and Strategy"
              className="image-content"
            />
          </div>

          <div className="img small">
            <img
              src="https://images.unsplash.com/photo-1628440501245-393606514a9e?w=600&auto=format&fit=crop&q=60"
              alt="Team collaboration and goals"
              className="image-content"
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        .vision-section {
          padding: 100px 5%;
          background: #f8fafc;
          overflow: hidden;
        }

        .vision-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* IMAGES RIGHT */
        .vision-images {
          position: relative;
          width: 100%;
          height: 500px;
          grid-column: 2;
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

        .image-content {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* CONTENT LEFT */
        .vision-content {
          grid-column: 1;
          padding-right: 20px;
        }

        .vision-content h2 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 24px;
          line-height: 1.2;
          color: #111827;
          background: linear-gradient(135deg, #0e0e0e, #0a0a0a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .vision-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4b5563;
          margin-bottom: 32px;
        }

        .vision-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .vision-list li {
          position: relative;
          padding-left: 36px;
          margin-bottom: 16px;
          font-size: 1.1rem;
          font-weight: 500;
          color: #374151;
          line-height: 1.6;
        }

        .vision-list li::before {
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
          .vision-container {
            gap: 60px;
          }
          
          .vision-images {
            height: 450px;
          }
          
          .vision-content h2 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 1024px) {
          .vision-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          
          .vision-images {
            grid-column: 1;
            height: 400px;
            order: 2;
          }
          
          .vision-content {
            grid-column: 1;
            order: 1;
            padding-right: 0;
            text-align: center;
          }
          
          .vision-list li {
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
          .vision-section {
            padding: 80px 5%;
          }
          
          .vision-images {
            height: 350px;
          }
          
          .vision-content h2 {
            font-size: 2.2rem;
          }
          
          .vision-content p {
            font-size: 1rem;
          }
          
          .vision-list li {
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
          .vision-section {
            padding: 60px 5%;
          }
          
          .vision-container {
            gap: 40px;
          }
          
          .vision-images {
            height: 280px;
          }
          
          .vision-content h2 {
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
          
          .vision-list li::before {
            width: 24px;
            height: 24px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 380px) {
          .vision-content h2 {
            font-size: 1.7rem;
          }
          
          .vision-images {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
}