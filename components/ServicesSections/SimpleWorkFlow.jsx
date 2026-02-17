"use client";

import { useEffect, useRef } from "react";

export default function SimpleWorkflow() {
  const steps = [
    { title: "Deep Dive", desc: "In-depth exploration of business and the product.", num: "01" },
    { title: "Pre-Production", desc: "Identification of core problems and art direction.", num: "02" },
    { title: "Design Proposition", desc: "Presenting concept solutions.", num: "03" },
    { title: "Design Development", desc: "Further development of the concept to final product.", num: "04" },
    { title: "Delivery & Testing", desc: "Finalization, testing, delivery and handover.", num: "05" },
  ];

  const sectionRef = useRef(null);
  const headerTitleRef = useRef(null);
  const headerSubtitleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (headerTitleRef.current) {
            headerTitleRef.current.style.animation = "textReveal 0.9s ease forwards";
          }
          if (headerSubtitleRef.current) {
            headerSubtitleRef.current.style.animation = "textReveal 0.9s ease forwards 0.2s";
          }

          cardRefs.current.forEach((card, index) => {
            if (card) {
              setTimeout(() => {
                card.style.animation = `cardReveal 0.8s ease forwards ${index * 0.15}s`;
              }, 100);
            }
          });
        } else {
          if (headerTitleRef.current) {
            headerTitleRef.current.style.animation = "none";
            void headerTitleRef.current.offsetWidth;
          }
          if (headerSubtitleRef.current) {
            headerSubtitleRef.current.style.animation = "none";
            void headerSubtitleRef.current.offsetWidth;
          }
          cardRefs.current.forEach((card) => {
            if (card) {
              card.style.animation = "none";
              void card.offsetWidth;
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="approach" ref={sectionRef} id="approach">
        {/* 🔥 Background Pattern Elements */}
        <div className="bg-pattern">
          <div className="pattern-circle pattern-circle-1"></div>
          <div className="pattern-circle pattern-circle-2"></div>
          <div className="pattern-circle pattern-circle-3"></div>
          <div className="pattern-circle pattern-circle-4"></div>
          <div className="pattern-grid"></div>
          <div className="pattern-lines"></div>
          <div className="pattern-dots"></div>
          <div className="gradient-overlay"></div>
           {/* Decorative Corner Accents */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "3%",
        width: "200px",
        height: "200px",
        borderTop: "2px solid rgba(138, 248, 138, 0.33)",
        borderLeft: "2px solid rgba(66, 254, 14, 0.17)",
        zIndex: 1,
      }} />
        </div>

        {/* 🔹 HEADER ROW */}
        <div className="approach-header">
          
          <h2 
            className="approach-title" 
            ref={headerTitleRef}
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Our <br /> Tech Approach
          </h2>

          <p 
            className="approach-subtitle" 
            ref={headerSubtitleRef}
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            A structured, technology-driven process that transforms ideas into
            scalable, high-performance digital products.We follow a structured process that guides ideas from initial exploration through design, development, and final delivery.
          </p>
        </div>

        {/* 🔹 CARDS */}
        <div className="approach-card-wrap">
          {steps.map((step, i) => (
            <div
              className="approach-card"
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ 
                opacity: 0,
                transform: "translateY(40px) scale(0.96)"
              }}
            >
              <div className="sect-dot-flex">
                <div className="dot"></div>
                <div>{step.title}</div>
              </div>

              <div className="approach-content-wrap">
                <div className="appr-num">{step.num}</div>
                <div className="appr-line"></div>
                <p className="papproach">{step.desc}</p>
              </div>
              
            </div>
            
          ))}
        </div>
          <div style={{
        position: "absolute",
        bottom: "10%",
        right: "3%",
        width: "200px",
        height: "200px",
        borderBottom: "2px solid rgba(138, 248, 138, 0.33)",
        borderRight: "2px solid rgba(205, 249, 205, 0.76)",
        zIndex: 1,
      }} />
      </section>

      {/* 🔥 CSS */}
      <style jsx>{`
        .approach {
          padding: 100px 20px;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
          width:auto;
          max-width:auto;
        }

        /* 🔥 Background Pattern Styles */
      
       

     

        .pattern-dots {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          opacity: 0.4;
        }

        .gradient-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, transparent 30%, #f8fafc 70%);
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes patternMove {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 1000px 1000px, 500px 500px;
          }
        }

        /* 🔹 HEADER */
        .approach-header {
          max-width: auto;
          margin: 0 auto 90px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0px;
          position: relative;
          z-index: 1;
        }

        .approach-title {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.1;
          background: linear-gradient(135deg, #016712 0%,#016712 50%, #016712 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding-left: 50px;
        }

        .approach-subtitle {
          max-width: 520px;
          font-size: 1.05rem;
          color: #4b5563;
          line-height: 1.6;
          position: relative;
          z-index: 1;
          padding-right: 100px;
        }

        /* 🔑 TEXT ANIMATION */
        @keyframes textReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 🔹 CARDS */
        .approach-card-wrap {
          max-width: 1200px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        .approach-card {
         
          backdrop-filter: blur(10px);
          padding: 32px 26px;
          border-radius: 22px;
          width: 220px;
          text-align: left;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          position: relative;
          overflow: hidden;
        }

      

        .approach-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 20px 40px rgba(59, 130, 246, 0.1),
            0 10px 20px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.95);
        }


        @keyframes cardReveal {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .sect-dot-flex {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #016712;
        }

        .dot {
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #016712, #016712);
          border-radius: 50%;
          box-shadow: 0 0 10px #016712;
        }

        .appr-num {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #016712, #016712);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .appr-line {
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #016712, #016712);
          margin-bottom: 14px;
          border-radius: 1px;
        }

        .papproach {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.5;
        }

        /* 📱 MOBILE */
        @media (max-width: 900px) {
          .approach-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .approach-title {
            font-size: 2.4rem;
          }

          .approach-card-wrap {
            flex-direction: column;
            align-items: center;
          }

          .approach-card {
            width: 100%;
            max-width: 360px;
          }

          .pattern-circle-1,
          .pattern-circle-2,
          .pattern-circle-3,
          .pattern-circle-4 {
            display: none;
          }
          
          .pattern-lines,
          .pattern-dots {
            opacity: 0.2;
          }
        }

        @media (max-width: 768px) {
          .approach {
            padding: 60px 20px;
          }
          
          .pattern-grid {
            background-size: 40px 40px;
          }
        }
      `}</style>
    </>
  );
}