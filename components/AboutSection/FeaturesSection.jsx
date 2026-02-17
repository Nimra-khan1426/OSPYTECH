"use client";

import { useEffect, useRef } from "react";
import { Shield, Zap, TrendingUp, Users, Lock, BarChart } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    { 
      icon: <Shield className="icon" />, 
      title: "Military-Grade Security", 
      desc: "Enterprise-grade encryption, SOC2 Type II compliance, and zero-trust architecture for maximum data protection."
    },
    { 
      icon: <Zap className="icon" />, 
      title: "AI-Powered Automation", 
      desc: "Advanced machine learning algorithms automate workflows, detect anomalies, and optimize performance in real-time."
    },
    { 
      icon: <TrendingUp className="icon" />, 
      title: "Scalable Infrastructure", 
      desc: "Cloud-native architecture with auto-scaling capabilities to handle exponential growth without performance degradation."
    },
    { 
      icon: <Users className="icon" />, 
      title: "Real-Time Collaboration", 
      desc: "Multi-tenant architecture with live synchronization, enabling seamless team collaboration across distributed environments."
    },
    { 
      icon: <Lock className="icon" />, 
      title: "Advanced Data Protection", 
      desc: "End-to-end encryption, blockchain-based audit trails, and automated disaster recovery with 99.99% uptime SLA."
    },
    { 
      icon: <BarChart className="icon" />, 
      title: "Predictive Analytics", 
      desc: "Real-time business intelligence with predictive modeling, anomaly detection, and customizable performance dashboards."
    },
  ];

  const sectionRef = useRef(null);
  const headerTitleRef = useRef(null);
  const headerSubtitleRef = useRef(null);
  const featureRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
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

          featureRefs.current.forEach((feature, index) => {
            if (feature) {
              setTimeout(() => {
                feature.style.animation = `featureReveal 0.8s ease forwards ${index * 0.1}s`;
              }, 100);
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
      <section className="features" ref={sectionRef} id="excellence">
        {/* 🔹 HEADER ROW - FIXED GAP */}
        <div className="features-header">
          <div className="header-left">
            <h2 
              className="features-title" 
              ref={headerTitleRef}
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              Technical <br /> Excellence
            </h2>
          </div>
          
          <div className="header-right">
            <p 
              className="features-subtitle" 
              ref={headerSubtitleRef}
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              Cutting-edge technology stack with enterprise-grade security, AI-powered <br></br>automation, 
              and scalable architecture designed for high-performance<br></br> digital transformation.
            </p>
          </div>
        </div>

        {/* 🔹 FEATURES IN 2 ROWS */}
        <div className="features-container">
          {/* Row 1 */}
          <div className="features-row">
            {features.slice(0, 3).map((feature, i) => (
              <div
                className="feature-item"
                key={i}
                ref={(el) => (featureRefs.current[i] = el)}
                style={{ 
                  opacity: 0,
                  transform: "translateY(20px)"
                }}
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title-text">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="features-row">
            {features.slice(3, 6).map((feature, i) => (
              <div
                className="feature-item"
                key={i + 3}
                ref={(el) => (featureRefs.current[i + 3] = el)}
                style={{ 
                  opacity: 0,
                  transform: "translateY(20px)"
                }}
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title-text">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .features {
          padding: 80px 20px;
          padding-left:100px;
            padding-right:100px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* 🔹 HEADER - FIXED LAYOUT */
        .features-header {
          max-width: 1200px;
          margin: 0 auto 60px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
        }

        .header-left {
          flex: 0 0 40%;
          padding-right: 30px;
        }

        .header-right {
          flex: 0 0 60%;
          padding-left: 30px;
          margin-top: 8px; /* Small adjustment for alignment */
        }

        .features-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.1;
          color: #016712;
          margin: 0;
        }

        .features-subtitle {
          font-size: 1.1rem;
          color: #4b5563;
          line-height: 1.5;
          text-align: justify;
          margin: 0;
        }

        @keyframes textReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 🔹 FEATURES CONTAINER */
        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .features-row {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 40px;
        }

        /* 🔹 FEATURE ITEMS */
        .feature-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes featureReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-icon-wrapper {
          width: 50px;
          height: 50px;
          background: #f0fdf4;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .feature-icon-wrapper :global(.icon) {
          width: 24px;
          height: 24px;
          color: #016712;
        }

        .feature-content {
          flex: 1;
        }

        .feature-title-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .feature-desc {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        /* 📱 RESPONSIVE */
        @media (max-width: 1100px) {
          .features-header {
            gap: 30px;
          }
          
          .header-left,
          .header-right {
            padding-left: 0;
            padding-right: 0;
          }
        }

        @media (max-width: 900px) {
          .features-header {
            flex-direction: column;
            gap: 20px;
            margin-bottom: 50px;
          }

          .header-left,
          .header-right {
            flex: 0 0 100%;
            width: 100%;
          }

          .features-title {
            font-size: 2.5rem;
          }

          .features-subtitle {
            font-size: 1.05rem;
          }

          .features-row {
            flex-direction: column;
            gap: 30px;
          }

          .feature-item {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .features {
            padding: 60px 20px;
          }
          
          .features-title {
            font-size: 2.2rem;
          }
          
          .features-subtitle {
            font-size: 1rem;
          }
          
          .feature-icon-wrapper {
            width: 45px;
            height: 45px;
          }
          
          .feature-icon-wrapper :global(.icon) {
            width: 22px;
            height: 22px;
          }
          
          .feature-title-text {
            font-size: 1.1rem;
          }
          
          .feature-desc {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .features-title {
            font-size: 1.9rem;
          }
          
          .features-subtitle {
            font-size: 0.95rem;
          }
          
          .feature-icon-wrapper {
            width: 40px;
            height: 40px;
            margin-bottom: 15px;
          }
          
          .feature-icon-wrapper :global(.icon) {
            width: 20px;
            height: 20px;
          }
          
          .features-row {
            gap: 25px;
            margin-bottom: 25px;
          }
        }

        @media (max-width: 380px) {
          .features {
            padding: 50px 15px;
          }
          
          .features-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </>
  );
}