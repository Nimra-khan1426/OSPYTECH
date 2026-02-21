"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { ArrowUpRight, Smartphone, Cloud, BrainCircuit, Shield } from "lucide-react";

// Map icons strings to components
const iconMap: any = {
  Smartphone,
  Cloud,
  BrainCircuit,
  Shield,
};

// Sanity query
const query = `*[_type == "servicesSection"][0]{
  badgeTitle,
  headingLight,
  headingBold,
  description,
  services[]{
    title,
    description,
    features,
    stats,
    gradientStart,
    gradientEnd,
    icon,
    "imageUrl": image.asset->url
  }
}`;

export default function ServicesSection1() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topCarouselRef = useRef<HTMLDivElement>(null);

  const [header, setHeader] = useState({
    badgeTitle: "",
    headingLight: "",
    headingBold: "",
    description: "",
  });

  const [services, setServices] = useState<any[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Fetch data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(query);
      if (data) {
        setHeader({
          badgeTitle: data.badgeTitle,
          headingLight: data.headingLight,
          headingBold: data.headingBold,
          description: data.description,
        });
        setServices(data.services || []);
      }
    };
    fetchData();
  }, []);

  // Animate once when section comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  // Duplicate services for seamless carousel loop
  const duplicatedServices = [...services, ...services, ...services];

  // Infinite left-scroll animation
  useEffect(() => {
    if (!topCarouselRef.current || services.length === 0) return;

    const carousel = topCarouselRef.current;
    let position = 0;
    const speed = 1;
    const cardWidth = 300 + 20; // card + padding
    const oneSetWidth = services.length * cardWidth;

    let animationId: number;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= oneSetWidth) position = 0;
      carousel.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [services]);

  return (
    <section ref={sectionRef} style={{ position: "relative", background: "#ffffff", padding: "60px 0", overflow: "hidden" }}>
      {/* Animated Background Circles */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "-100px",
        width: "400px",
        height: "400px",
        background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))",
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "float 20s ease-in-out infinite",
        zIndex: 0
      }} />
      <div style={{
        position: "absolute",
        bottom: "30%",
        right: "-100px",
        width: "400px",
        height: "400px",
        background: "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.05))",
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "float 20s ease-in-out infinite reverse",
        zIndex: 0
      }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 10 }}>
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={hasAnimated ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", borderRadius: "100px", marginBottom: "5px", backdropFilter: "blur(10px)" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 800, background: "linear-gradient(90deg, #016712, #016712)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {header.badgeTitle}
              </h3>
            </div>
            <h2 style={{ fontSize: "50px", fontWeight: 700, color: "#111827", marginBottom: "16px", lineHeight: 1.1 }}>
              {header.headingLight}{" "}
              <span style={{ background: "linear-gradient(90deg, #016712, #016712)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {header.headingBold}
              </span>
            </h2>
            <p style={{ fontSize: "16px", color: "#6B7280", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
              {header.description}
            </p>
          </div>
        </motion.div>

        {/* Top Carousel */}
        <div style={{ overflow: "hidden", position: "relative", marginBottom: "40px" }}>
          <div ref={topCarouselRef} style={{ display: "flex", padding: "10px 0", willChange: "transform", width: "max-content" }}>
            {duplicatedServices.map((service, idx) => {
              const gradient = `linear-gradient(135deg, ${service.gradientStart}, ${service.gradientEnd})`;
             const IconComponent = iconMap[service.icon?.trim()] || null;

              return (
                <div key={`${service.title}-${idx}`} style={{ flexShrink: 0, padding: "0 10px", width: "300px" }}>
                  <motion.div
                    style={{
                      position: "relative",
                      background: "white",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(243,244,246,0.8)",
                      height: "360px",
                      cursor: "pointer"
                    }}
                    whileHover={{ scale: 1.03, y: -8, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", transition: { duration: 0.3 } }}
                  >
                    {/* Service Image */}
                    <div style={{ height: "120px", background: `url(${service.imageUrl}) center/cover`, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: gradient, opacity: 0.15 }} />
                      {/* Icon */}
                      <div style={{
  position: 'absolute',
  top: '12px',
  left: '12px',
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 3px 10px rgba(0,0,0,0.12)'
}}>
  {IconComponent && <IconComponent color={service.gradientEnd} size={20} />}
</div>
                      {/* Stats Badge */}
                      <div style={{ position: "absolute", top: "12px", right: "12px", padding: "4px 10px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderRadius: "100px", border: "1px solid rgba(229,231,235,0.8)", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                          {service.stats}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "20px" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "8px", lineHeight: 1.3 }}>
                        {service.title}
                      </h3>
                      <p style={{ color: "#6B7280", fontSize: "13px", lineHeight: 1.5, marginBottom: "16px", minHeight: "36px" }}>
                        {service.description}
                      </p>

                      {/* Features */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                      {service.features?.map((f: string, i: number) => (
                          <motion.span key={i} style={{ padding: "4px 10px", background: "rgba(249,250,251,0.8)", backdropFilter: "blur(8px)", color: "#374151", fontSize: "11px", fontWeight: 600, borderRadius: "6px", border: "1px solid rgba(229,231,235,0.6)" }} whileHover={{ scale: 1.05, background: gradient, color: "white", borderColor: "transparent" }} transition={{ duration: 0.2 }}>
                            {f}
                          </motion.span>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", background: "white", border: `1px solid ${service.gradientEnd}40`, borderRadius: "8px", color: service.gradientEnd, fontSize: "13px", fontWeight: 600, cursor: "pointer", }} whileHover={{ scale: 1.05, background: gradient, color: "white", boxShadow: `0 10px 30px ${service.gradientEnd}40` }} transition={{ duration: 0.3 }} >
                        <span>Explore</span>
                        <ArrowUpRight style={{ width: "14px", height: "14px" }} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(20px); }
        }
      `}</style>
    </section>
  );
}