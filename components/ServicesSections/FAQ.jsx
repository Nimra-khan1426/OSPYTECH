"use client";

import { useState, useEffect, useRef } from "react";

const faqs = [
  {
    q: "Do you offer revisions?",
    a: "Yes, we provide revisions to ensure the final content meets your expectations and goals.",
  },
  {
    q: "How long does branding take?",
    a: "Most branding projects take about 4–5 weeks, depending on scope and complexity.",
  },
  {
    q: "What do you need from me to start the project?",
    a: "We'll need details about your brand, goals, and any references you like.",
  },
  {
    q: "What industries do you specialize in?",
    a: "Fintech, healthcare, Web3, SaaS, and e-commerce.",
  },
  {
    q: "How long does it take to design a website?",
    a: "Usually 4–6 weeks depending on project complexity.",
  },
  {
    q: "Why is website design important?",
    a: "Good design improves UX, credibility, SEO, and conversions.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
        once: true, // Key fix: trigger only once
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, [hasAnimated]); // Add dependency

  return (
    <>
      <section 
        className={`faq ${hasAnimated ? "visible" : ""}`} 
        ref={sectionRef} id="faq"
      >
        <div className="container">
          {/* LEFT */}
          <div className="left">
            <div className="tag">
              <span>FAQ</span>
            </div>
            <h2>
              Frequently <br />
              <span style={{ color: "#016712" }}>Asked Questions</span>
            </h2>
          </div>

          {/* RIGHT - 2 columns layout */}
          <div className="right">
            <div className="faq-grid">
              {faqs.map((item, i) => {
                const open = active === i;

                return (
                  <div key={i} className={`item ${open ? "open" : ""}`}>
                    <button
                      className="question"
                      onClick={() => setActive(open ? null : i)}
                      aria-expanded={open}
                    >
                      <span>{item.q}</span>
                      <span className="icon">{open ? "−" : "+"}</span>
                    </button>

                    {open && <div className="answer">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CSS */}
        <style jsx>{`
          .faq {
            padding: 150px 0 60px 0; /* Reduced bottom padding for divider */
            width: auto;
            position: relative;
          }

          .container {
            max-width: 100%;
            margin: 0 auto;
            padding-bottom: 80px;
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 40px; /* Reduced from 80px to 40px */
            align-items: start;
          }

          .tag {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            color: #016712;
            margin-bottom: 12px; /* Reduced margin */
            padding-left: 105px;
          }

          h2 {
            margin-top: 10px; /* Reduced from 20px to 10px */
            font-size: 50px;
            line-height: 1.2;
            padding-left: 100px;
          }

          .right {
            width: 100%;
          }

          .faq-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px; /* Reduced gap between FAQ cards */
          }

          .item {
            background: #fff;
            border-radius: 14px;
            transition: background 0.3s ease;
            overflow: hidden;
          }

          .item.open {
            background: #e5e9eb;
          }

          .question {
            width: 100%;
            padding: 22px 26px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            text-align: left;
            transition: all 0.2s ease;
          }

          .question:hover {
            background: rgba(0, 0, 0, 0.02);
          }

          .icon {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #e5e9eb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
            margin-left: 16px;
            transition: all 0.2s ease;
          }

          .item.open .icon {
            background: #000;
            color: #fff;
            transform: rotate(180deg);
          }

          .answer {
            padding: 0 26px 22px;
            font-size: 14px;
            color: #333;
            line-height: 1.6;
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Desktop: 2 columns */
          @media (min-width: 768px) {
            .faq-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 16px; /* Reduced gap for 2-column layout */
            }
          }

          @media (max-width: 900px) {
            .container {
              grid-template-columns: 1fr;
              gap: 30px; /* Reduced gap for mobile */
            }

            h2 {
              font-size: 34px;
            }

            .tag, h2 {
              padding-left: 0;
              text-align: center;
            }
          }

          @media (max-width: 768px) {
            .faq {
              padding: 60px 0 30px 0;
            }
            
            .container {
              padding: 0 24px;
            }
            
            h2 {
              font-size: 32px;
            }
          }

          /* Animation Styles - ONLY APPLY ONCE */
          .faq {
            opacity: 1;
            transform: translateY(0);
          }

          .tag,
          h2,
          .right,
          .item {
            opacity: 1;
            transform: translateY(0);
          }

          /* ANIMATION - ONLY WHEN hasAnimated IS TRUE */
          .faq:not(.visible) {
            opacity: 0;
            transform: translateY(30px);
          }

          .faq:not(.visible) .tag,
          .faq:not(.visible) h2,
          .faq:not(.visible) .right,
          .faq:not(.visible) .item {
            opacity: 0;
            transform: translateY(20px);
          }

          .faq.visible {
            transition: opacity 0.8s ease, transform 0.8s ease;
          }

          .faq.visible .tag {
            transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
          }

          .faq.visible h2 {
            transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
          }

          .faq.visible .right {
            transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
          }

          .faq.visible .item:nth-child(1) {
            transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
          }
          .faq.visible .item:nth-child(2) {
            transition: opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s;
          }
          .faq.visible .item:nth-child(3) {
            transition: opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s;
          }
          .faq.visible .item:nth-child(4) {
            transition: opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s;
          }
          .faq.visible .item:nth-child(5) {
            transition: opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s;
          }
          .faq.visible .item:nth-child(6) {
            transition: opacity 0.6s ease 1.0s, transform 0.6s ease 1.0s;
          }

          /* Divider inside section (before end) */
          .faq::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 90%;
            max-width: 1100px;
            height: 1px;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(0, 0, 0, 0.1) 15%,
              rgba(0, 0, 0, 0.1) 85%,
              transparent 100%
            );
            opacity: 0;
          }

          .faq.visible::after {
            opacity: 1;
            transform: translateX(-50%) scaleX(1);
            transition: opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s;
          }
        `}</style>
      </section>
    </>
  );
}