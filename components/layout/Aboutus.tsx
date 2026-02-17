"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, ArrowRight } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";

export default function MinimalAboutGrid({data}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [gridInView, setGridInView] = useState(false);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const isGridInView = useInView(gridRef, { once: false, amount: 0.3 });
  
const router = useRouter();

  // Start counters when section comes into view
  useEffect(() => {
    if (isSectionInView && !countersStarted) {
      setCountersStarted(true);
    } else if (!isSectionInView && countersStarted) {
      setCountersStarted(false);
    }
  }, [isSectionInView, countersStarted]);

  // Start grid animations when grid comes into view
  useEffect(() => {
    if (isGridInView && !gridInView) {
      setGridInView(true);
    } else if (!isGridInView && gridInView) {
      setGridInView(false);
    }
  }, [isGridInView, gridInView]);

  const gridItems = data?.gridItems || [];
const metrics = data?.metrics || [];
  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <section className="minimal-section" ref={sectionRef}>
      <div className="container">
        
        {/* Minimal Header with staggered animation */}
        <div className="minimal-header">
          <h1>
            <span className="light">We Build</span>
            <br />
            <span className="bold">Digital Experiences</span>
          </h1>
          <p className="subtitle">
            Creating technology that matters. Simple, powerful, effective.
          </p>
        </div>

        <div className="split-layout">
          
          {/* Left Content - Minimal with staggered animations */}
          <motion.div 
            className="left-side"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="content-block">
              <motion.div 
                className="accent-line"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              
              <h2>
                <span className="number">01</span>
                <span className="title">Our Focus</span>
              </h2>
              
              <motion.p 
                className="brief"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We specialize in creating digital solutions that are both beautiful and functional. 
                Our approach combines technical excellence with user-centric design to deliver 
                exceptional experiences that users love. From concept to deployment, we ensure every project meets the highest standards 
                  of quality and innovation. Our team works closely with clients to understand 
                  their unique needs and deliver tailored solutions.
              </motion.p>

              {/* Minimal Metrics with CountUp Animation */}
              <motion.div 
                className="metric-grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {metrics.map((metric, idx) => (
                  <motion.div 
                    key={idx} 
                    className="metric-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                  >
                    <div className="metric-value">
                      {countersStarted ? (
                        <>
                          <CountUp 
                            start={metric.value - (metric.value * 0.5)} 
                            end={metric.value} 
                            duration={2.5} 
                            delay={idx * 0.2}
                            separator=""
                          />
                          {metric.suffix}
                        </>
                      ) : (
                        `${metric.value}${metric.suffix}`
                      )}
                    </div>
                    <div className="metric-label">{metric.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="highlight"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.div 
                  className="highlight-icon"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                >
                  →
                </motion.div>
                <div className="highlight-text">
                  Award-winning solutions trusted by industry leaders worldwide
                </div>
              </motion.div>

              {/* Button Container */}
              <motion.div 
                className="button-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <motion.button 
                  className="minimal-cta"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="button-text"   onClick={() => router.push("/services")}>View Our Work</span>
                  <div className="button-icon-wrapper">
                    <ArrowRight className="button-icon" />
                  </div>
                </motion.button>
                
                <motion.button 
                  className="secondary-cta"   onClick={() => router.push("/contact")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Contact Team</span>
                  <ChevronRight size={14} />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Grid - Visual Focus with staggered animations */}
          <motion.div 
            className="right-side"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            ref={gridRef}
          >
            
            {/* First Row: Big on left, Small on right */}
            <div className="magazine-row first-row">
              <motion.div
                className={`grid-cell big ${hoveredIndex === 0 ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleImageClick(0)}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -1 }}
                animate={gridInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotate: 0 
                } : { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.9,
                  rotate: -1 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="image-wrapper">
          <img 
src={
  gridItems[0]?.image
    ? urlFor(gridItems[0].image).url()
    : ""
}

                    className="grid-image"
                  />
                  <motion.div 
                    className="category-tag"
                    style={{ 
                      backgroundColor: hoveredIndex === 0 ? gridItems[0].color : 'rgba(255, 255, 255, 0.9)',
                      color: hoveredIndex === 0 ? 'white' : gridItems[0].color,
                      border: hoveredIndex === 0 ? 'none' : `2px solid ${gridItems[0].color}`
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {gridItems[0].category}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className={`grid-cell small ${hoveredIndex === 1 ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleImageClick(1)}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotate: 1 }}
                animate={gridInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotate: 0 
                } : { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.9,
                  rotate: 1 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="image-wrapper">
        <img 
               
src={
  gridItems[1]?.image
    ? urlFor(gridItems[1].image).url()
    : ""
}

                    className="grid-image"
                  />
                  <motion.div 
                    className="category-tag"
                    style={{ 
                      backgroundColor: hoveredIndex === 1 ? gridItems[1].color : 'rgba(255, 255, 255, 0.9)',
                      color: hoveredIndex === 1 ? 'white' : gridItems[1].color,
                      border: hoveredIndex === 1 ? 'none' : `2px solid ${gridItems[1].color}`
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {gridItems[1].category}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Second Row: Small on left, Big on right */}
            <div className="magazine-row second-row">
              <motion.div
                className={`grid-cell small ${hoveredIndex === 2 ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(2)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleImageClick(2)}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotate: -1 }}
                animate={gridInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotate: 0 
                } : { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.9,
                  rotate: -1 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="image-wrapper">
                  <img 
               
src={
  gridItems[2]?.image
    ? urlFor(gridItems[2].image).url()
    : ""
}
                    className="grid-image"
                  />
                  <motion.div 
                    className="category-tag"
                    style={{ 
                      backgroundColor: hoveredIndex === 2 ? gridItems[2].color : 'rgba(255, 255, 255, 0.9)',
                      color: hoveredIndex === 2 ? 'white' : gridItems[2].color,
                      border: hoveredIndex === 2 ? 'none' : `2px solid ${gridItems[2].color}`
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {gridItems[2].category}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className={`grid-cell big ${hoveredIndex === 3 ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(3)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleImageClick(3)}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotate: 1 }}
                animate={gridInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotate: 0 
                } : { 
                  opacity: 0, 
                  y: 30, 
                  scale: 0.9,
                  rotate: 1 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="image-wrapper">
                    <img 
                    src={
  gridItems[3]?.image
    ? urlFor(gridItems[3].image).url()
    : ""
}
              

                    className="grid-image"
                  />
                  <motion.div 
                    className="category-tag"
                    style={{ 
                      backgroundColor: hoveredIndex === 3 ? gridItems[3].color : 'rgba(255, 255, 255, 0.9)',
                      color: hoveredIndex === 3 ? 'white' : gridItems[3].color,
                      border: hoveredIndex === 3 ? 'none' : `2px solid ${gridItems[3].color}`
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {gridItems[3].category}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Grid Footer */}
            <motion.div 
              className="grid-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="footer-indicator">
                <div className="indicator-text">
                  {hoveredIndex !== null ? 
                    `Hovering ${gridItems[hoveredIndex].category}` : 
                    'Click for details'
                  }
                </div>
                <div className="indicator-dots">
                  {gridItems.map((_, idx) => (
                    <motion.div 
                      key={idx}
                      className={`indicator-dot ${hoveredIndex === idx ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      whileHover={{ scale: 1.3 }}
                      animate={gridInView ? { 
                        scale: [1, 1.1, 1],
                        transition: { repeat: Infinity, duration: 2, delay: idx * 0.2 }
                      } : {}}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Card Overlay - Appears on click */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            className="floating-card-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div 
              className="floating-card"
              initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 50, scale: 0.8, rotate: 5 }}
              transition={{ 
                duration: 0.4, 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section in Card */}
              <motion.div 
                className="floating-card-image"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={urlFor(gridItems[selectedIndex]?.image).url()} 
  alt={gridItems[selectedIndex]?.title}
                  className="card-main-image"
                />
                <motion.div 
                  className="floating-card-category-tag"
                  style={{ backgroundColor: gridItems[selectedIndex].color }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {gridItems[selectedIndex].category}
                </motion.div>
              </motion.div>
              
              <div className="floating-card-content">
                <motion.div 
                  className="floating-card-body"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="floating-card-title">{gridItems[selectedIndex].title}</h3>
                  <p className="floating-card-subtitle">{gridItems[selectedIndex].subtitle}</p>
                  <p className="floating-card-description">
                    {gridItems[selectedIndex].description}
                  </p>
                  <div className="floating-card-stats">
                    <span className="stat-value">{gridItems[selectedIndex].stats}</span>
                  </div>
                </motion.div>
                <motion.div 
                  className="floating-card-footer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <button className="floating-card-button"   onClick={() => router.push("/services")}>
                    Explore Solution
                    <ExternalLink className="icon" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
       
        /* Section */
        .minimal-section {
          min-height: 100vh;
          background: #ffffff;
          padding: 3rem 1.5rem;
          
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: auto;
          margin: 0 auto;
        }

        /* Minimal Header - ANIMATION HATA DI */
        .minimal-header {
          text-align: left;
          margin-bottom: 2rem;
        }

        .minimal-header h1 {
          font-size: 3.4rem;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.1;
          margin-bottom: 1rem;
          text-align: left;
        }

        .minimal-header h1 .bold {
          font-weight: 600;
          color :#016712;
        }

        .subtitle {
          font-size: 1.125rem;
          color: #666;
          max-width: 400px;
          margin: 0;
          line-height: 1.5;
          text-align: left;
        }

        /* Split Layout - Content on left, smaller grid on right */
        .split-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* Left Side - Minimal Content */
        .left-side {
          position: sticky;
          top: 1rem;
        }

        .content-block {
          padding-right: 2rem;
        }

        .accent-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #016712 , #016712 );
          margin-bottom: 1rem;
        }

        .content-block h2 {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .number {
          font-size: 0.875rem;
          color: #016712;
          font-weight: 400;
        }

        .title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #000;
          letter-spacing: -0.5px;
        }

        .brief {
          font-size: 0.875rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 2rem;
        }

        /* Metric Grid */
        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .metric-item {
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }

        .metric-value {
          font-size: 1.75rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.25rem;
          font-variant-numeric: tabular-nums;
        }

        .metric-label {
          font-size: 0.75rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }

        /* Highlight */
        .highlight {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: linear-gradient(135deg, #e0fde5, #e1fae5);
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .highlight-icon {
          color: #000;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .highlight-text {
          font-size: 0.875rem;
          color: #555;
          line-height: 1.5;
        }

        /* Button Container */
        .button-container {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        /* Main CTA Button */
        .minimal-cta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #000, #000000);
          color: #fff;
          padding:0.875rem 1.5rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .minimal-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .button-text {
          position: relative;
          z-index: 2;
        }

        .button-icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          padding: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .minimal-cta:hover .button-icon-wrapper {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(4px);
        }

        .button-icon {
          width: 12px;
          height: 12px;
          transition: transform 0.3s ease;
        }

        /* Secondary Button */
        .secondary-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid #016712;
          color: #000;
          padding: 1.1rem 1.5rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-cta:hover {
          background: #f8f9fa;
          border-color: #016712;
          transform: translateY(-2px);
        }

        /* Right Side - Visual Grid */
        .right-side {
          overflow: visible;
          height: fit-content;
        }

        /* ========== MANUAL GRID LAYOUT ========== */
        /* Magazine Row - Grid layout with proper spacing */
        .magazine-row {
          display: grid;
          grid-template-columns: 2fr 1fr; /* First row: big (2 parts) left, small (1 part) right */
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .second-row {
          grid-template-columns: 1fr 2fr; /* Second row: small (1 part) left, big (2 parts) right */
        }

        .grid-cell {
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          border-radius: 12px;
        }

        .grid-cell.hovered {
          z-index: 10;
          transform: translateY(-4px);
        }

        .grid-cell.hovered .image-wrapper {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        /* Big images - Portrait style (taller than wide) */
        .grid-cell.big {
          aspect-ratio: 5.8/5; /* Height is 4/3 of width */
          height: 290px; /* Fixed height for consistency */
        }

        /* Small images - Square style */
        .grid-cell.small {
          aspect-ratio: 1/1.7; /* Perfect square */
          height: 290px; /* Fixed height */
        }

        .grid-image {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Crop to fill container without distortion */
          display: block;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .grid-cell.hovered .grid-image {
          transform: scale(1.08);
        }

        /* Category Tag on Image */
        .category-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 0.375rem 0.875rem;
          border-radius: 2rem;
          transition: all 0.3s ease;
          z-index: 2;
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        /* Grid Footer */
        .grid-footer {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e5e5;
        }

        .footer-indicator {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .indicator-text {
          font-size: 0.875rem;
          color: #666;
          font-weight: 500;
        }

        .indicator-dots {
          display: flex;
          gap: 0.5rem;
        }

        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ddd;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator-dot.active {
          background: #1a1a1a;
          transform: scale(1.3);
        }

        .indicator-dot:hover {
          background: #1a1a1a;
        }

        /* Floating Card Overlay - Appears on click */
        .floating-card-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .floating-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          width: 100%;
          max-width: 480px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .floating-card-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .card-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .floating-card-category-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 0.375rem 0.875rem;
          border-radius: 2rem;
          color: white;
          z-index: 2;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .floating-card-content {
          padding: 2rem;
        }

        .floating-card-body {
          margin-bottom: 1.5rem;
        }

        .floating-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          color: #1a1a1a;
        }

        .floating-card-subtitle {
          font-size: 1.125rem;
          color: #666;
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .floating-card-description {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 1.5rem;
        }

        .floating-card-stats {
          margin-bottom: 1.5rem;
        }

        .stat-value {
          display: inline-block;
          background: #f8f9fa;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1a1a1a;
          border: 1px solid #e5e5e5;
        }

        .floating-card-footer {
          padding-top: 1.5rem;
          border-top: 1px solid #e5e5e5;
        }

        .floating-card-button {
          background: #1a1a1a;
          border: none;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
        }

        .floating-card-button:hover {
          background: #333;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .floating-card-button .icon {
          width: 14px;
          height: 14px;
        }

        /* ========== RESPONSIVE DESIGN ========== */
        /* Large screens (1200px and above) */
        @media (max-width: 1200px) {
          .container {
            max-width: 1000px;
          }
          
          .grid-cell.big {
            height: 280px;
          }
          
          .grid-cell.small {
            height: 135px;
          }
        }

        /* Medium-large screens (1024px - 1200px) */
        @media (max-width: 1024px) {
          .split-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .left-side {
            position: static;
          }
          
          .content-block {
            padding-right: 0;
          }
          
          .minimal-header h1 {
            font-size: 2.5rem;
          }
          
          .magazine-row {
            grid-template-columns: 1fr 1fr; /* Equal columns on medium screens */
            gap: 0.75rem;
            max-width: 600px;
            margin: 0 auto 0.75rem;
          }
          
          .second-row {
            grid-template-columns: 1fr 1fr;
          }
          
          .minimal-header {
            text-align: center;
          }
          
          .subtitle {
            text-align: center;
            margin: 0 auto;
          }
          
          .button-container {
            justify-content: center;
          }
          
          .grid-cell.big {
            height: 250px;
            aspect-ratio: 4/3; /* More landscape on medium screens */
          }
          
          .grid-cell.small {
            height: 120px;
            aspect-ratio: 4/3; /* More landscape on medium screens */
          }
          
          .floating-card {
            max-width: 400px;
          }
        }

        /* Medium screens (768px - 1024px) */
        @media (max-width: 768px) {
          .magazine-row {
            grid-template-columns: 1fr; /* Single column on mobile */
            gap: 0.75rem;
            max-width: 400px;
            margin: 0 auto 0.75rem;
          }
          
          .second-row {
            grid-template-columns: 1fr;
          }
          
          .minimal-section {
            padding: 2rem 1rem;
          }
          
          .grid-cell.big {
            height: 220px;
            aspect-ratio: 4/3; /* Landscape on mobile */
          }
          
          .grid-cell.small {
            height: 110px;
            aspect-ratio: 4/3; /* Landscape on mobile */
          }
          
          .metric-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-indicator {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .button-container {
            flex-direction: column;
            align-items: stretch;
          }
          
          .minimal-cta,
          .secondary-cta {
            justify-content: center;
          }
          
          .floating-card {
            max-width: 350px;
          }
          
          .floating-card-image {
            height: 180px;
          }
        }

        /* Small screens (640px - 768px) */
        @media (max-width: 640px) {
          .minimal-header h1 {
            font-size: 2rem;
          }
          
          .title {
            font-size: 1.125rem;
          }
          
          .grid-cell.big {
            height: 200px;
          }
          
          .grid-cell.small {
            height: 100px;
          }
          
          .floating-card {
            max-width: 320px;
          }
          
          .floating-card-title {
            font-size: 1.5rem;
          }
          
          .floating-card-image {
            height: 160px;
          }
        }

        /* Extra small screens (480px - 640px) */
        @media (max-width: 480px) {
          .grid-cell.big {
            height: 180px;
          }
          
          .grid-cell.small {
            height: 90px;
          }
          
          .floating-card {
            max-width: 300px;
          }
          
          .floating-card-title {
            font-size: 1.25rem;
          }
          
          .floating-card-description {
            font-size: 0.75rem;
          }
          
          .floating-card-image {
            height: 140px;
          }
        }

        /* Very small screens (below 480px) */
        @media (max-width: 400px) {
          .grid-cell.big {
            height: 160px;
          }
          
          .grid-cell.small {
            height: 80px;
          }
          
          .floating-card {
            max-width: 280px;
            padding: 0;
          }
          
          .floating-card-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}