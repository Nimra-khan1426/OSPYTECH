"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesCards.css";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesCards() {
  const cardsRef = useRef([]);
  const [isClient, setIsClient] = useState(false);

  // Services Data with content-related images
  const services = [
    {
      id: 1,
      title: "AI & Machine Learning",
      description: "Build intelligent systems that analyze data patterns and automate complex processes using advanced algorithms and neural networks for prediction.",
      badges: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
          <path d="M22 19v-3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
          <path d="M6 2v4" />
          <path d="M12 2v4" />
          <path d="M18 2v4" />
          <circle cx="12" cy="15" r="4" />
          <path d="M12 11v4" />
          <path d="M8 15h8" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Web Development",
      description: "Create modern, responsive websites and web applications with cutting-edge technologies that deliver user experiences across all devices.",
      badges: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind","Wordpress"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          <path d="M21 12a9 9 0 1 1-9-9" />
          <path d="M12 3v3" />
          <path d="M3 12h3" />
          <path d="M12 21v-3" />
          <path d="M21 12h-3" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Mobile Applications",
      description: "Develop cross-platform mobile applications for iOS and Android with native performance, smooth animations, and offline capabilities.",
      badges: ["React Native", "Flutter", "iOS", "Android", "PWA","Firebase"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12" y2="18" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Cloud Solutions",
      description: "Implement scalable cloud infrastructure and migration services that grow with your business needs while optimizing costs and performance.",
      badges: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "UI/UX Design",
      description: "Design user-centered interfaces that enhance engagement, improve conversion rates, and provide seamless navigation through intuitive workflows.",
      badges: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Data Analytics",
      description: "Transform raw data into actionable insights with advanced analytics, interactive dashboards, and predictive modeling for informed decision-making.",
      badges: ["Power BI", "Tableau", "SQL", "Python", "Big Data","Machine Learning"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      id: 7,
      title: "Cybersecurity",
      description: "Protect your digital assets with comprehensive security solutions including threat detection, encryption, and continuous monitoring systems.",
      badges: ["Penetration Testing", "Firewalls", "Encryption", "SIEM", "Compliance"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      id: 8,
      title: "IoT Solutions",
      description: "Connect devices and sensors to create smart, interconnected systems that collect and analyze real-time data for automation and optimization.",
      badges: ["Arduino", "Raspberry Pi", "MQTT", "Sensor Networks", "Edge Computing"],
      image: "https://plus.unsplash.com/premium_photo-1688678097958-0620a452f0e8?q=80&w=808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },
    {
      id: 9,
      title: "Blockchain",
      description: "Develop decentralized applications and smart contracts that enable secure, transparent transactions and automated business processes.",
      badges: ["Smart Contracts", "Solidity", "Web3.js", "DApps", "NFTs"],
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, [isClient]);

  const addCardToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Split services into 3 rows
  const row1 = services.slice(0, 3);
  const row2 = services.slice(3, 6);
  const row3 = services.slice(6, 9);

  return (
    <section className="services-cards-section">
      <div className="services-container">
        {/* Professional Header */}
        <div className="section-header">
          <div className="header-badge">
            <span>Our Services</span>
          </div>
          <h2 className="section-title">
            Technology <span className="highlight">Solutions</span>
          </h2>
          <p className="section-subtitle">
            Expert services to transform your business with cutting-edge technology 
            and innovative approaches for sustainable growth.
          </p>
        </div>

        {/* Row 1 */}
        <div className="row-1 services-grid">
          {row1.map((service) => (
            <div
              key={service.id}
              ref={addCardToRefs}
              className="service-card"
              style={{ opacity: 1, transform: 'none' }} // Remove initial animation styles
            >
              <div className="image-container">
                <div className="image-wrapper">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="card-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    unoptimized={true}
                  />
                  <div className="image-overlay" />
                </div>
                <div className="icon-overlay">
                  {service.icon}
                </div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                
                <div className="badges-container">
                  {service.badges.map((badge, idx) => (
                    <span key={idx} className="badge">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="row-2 services-grid">
          {row2.map((service) => (
            <div
              key={service.id}
              ref={addCardToRefs}
              className="service-card"
              style={{ opacity: 1, transform: 'none' }} // Remove initial animation styles
            >
              <div className="image-container">
                <div className="image-wrapper">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="card-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    unoptimized={true}
                  />
                  <div className="image-overlay" />
                </div>
                <div className="icon-overlay">
                  {service.icon}
                </div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                
                <div className="badges-container">
                  {service.badges.map((badge, idx) => (
                    <span key={idx} className="badge">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 3 */}
        <div className="row-3 services-grid">
          {row3.map((service) => (
            <div
              key={service.id}
              ref={addCardToRefs}
              className="service-card"
              style={{ opacity: 1, transform: 'none' }} // Remove initial animation styles
            >
              <div className="image-container">
                <div className="image-wrapper">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="card-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    unoptimized={true}
                  />
                  <div className="image-overlay" />
                </div>
                <div className="icon-overlay">
                  {service.icon}
                </div>
              </div>

              <div className="card-content">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
                
                <div className="badges-container">
                  {service.badges.map((badge, idx) => (
                    <span key={idx} className="badge">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
       
      </div>
    </section>
  );
}