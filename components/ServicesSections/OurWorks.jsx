"use client";

import { useRef } from "react";

export default function OurWorks() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: dir * width,
      behavior: "smooth",
    });
  };

  const projects = [
    {
      title: "InnrevAI",
      year: "2024",
      img: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/67570dedcc1f224d4dc4102d_Frame%201707479710.avif",
      link: "/projects/web-design/innrevai",
      services: ["Web Design", "Webflow Dev"],
    },
    {
      title: "Taraxa",
      year: "2024",
      img: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/6756eacf763bb038793ea68b_%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5(6).avif",
      link: "/projects/web-design/taraxa",
      services: ["Branding", "Web Design"],
    },
    {
      title: "Fractal",
      year: "2024",
      img: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/6756f639ff58c80b0f82594b_%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5(8).avif",
      link: "/projects/web-design/fractal",
      services: ["Web Design", "Webflow Dev"],
    },
    {
      title: "Incipet",
      year: "2024",
      img: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/673a5dc9be91f06883fa0e53_Rectangle%20161124065.avif",
      link: "/projects/web-design/incipet",
      services: ["Web Design", "Webflow Dev"],
    },
  ];

  return (
    <section style={styles.container} id="projects">
      <div style={styles.worksWrapper}>
        <div style={styles.gridNoPad}>
          <div style={styles.sectDotFlex}>
            
          </div>
          <div style={styles.sectDotFlex}>
            <h2 style={styles.heading}>Check Our<span  style={styles.greentext}> Featured</span> Projects</h2>
          </div>
        </div>

        {/* Projects Slider */}
        <div style={styles.worksSliderWrapper}>
          <div
            className="swiper is-works w-dyn-list"
            ref={sliderRef}
            style={styles.slider}
          >
            {projects.map((project, idx) => (
              <div key={idx} style={styles.slide}>
                <div style={styles.projectWrapper}>
                  <a href={project.link} style={styles.projectLink}>
                    <img
                      src={project.img}
                      alt={project.title}
                      style={styles.projectImage}
                      loading="lazy"
                    />
                  </a>
                  <div style={styles.projectInfo}>
                    <div style={styles.projectTitle}>
                      <h2 style={styles.projectName}>{project.title}</h2>
                      <span style={styles.projectText}>&nbsp;-&nbsp;</span>
                      <span style={styles.projectYear}>{project.year}</span>
                    </div>
                    <div>
                      <div style={styles.servicesList}>
                        {project.services.map((service, sIdx) => (
                          <div key={sIdx} style={styles.serviceItemWrapper}>
                            <a 
                              href={`/services/${service.toLowerCase().replace(/\s/g, "-")}`} 
                              style={styles.serviceLink}
                            >
                              {service}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div style={styles.arrowsWrapper}>
            <button 
              style={styles.arrowButton} 
              onClick={() => scroll(-1)}
            >
              Prev
            </button>
            <button 
              style={styles.arrowButton} 
              onClick={() => scroll(1)}
            >
              Next
            </button>
          </div>
        </div>

        

        {/* Partners Section */}
        
      </div>

      <style jsx>{`
        .img-100-hover-style {
          transition: transform 0.3s ease;
          border-radius: 12px;
        }
        .img-100-hover-style:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}

const styles = {
  container: {
    padding: "100px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
    paddingTop:"150px",
  },
  worksWrapper: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
    transformStyle: "preserve-3d",
  },
  gridNoPad: {
    marginBottom: "40px",
  },
  sectDotFlex: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  dot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#000",
    borderRadius: "50%",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "700",
    color: "#000",
    margin: 0,
  },
  worksSliderWrapper: {
    position: "relative",
    marginBottom: "60px",
  },
  greentext: {
  color: "#016712",
},
  slider: {
    display: "flex",
    overflowX: "auto",
    scrollBehavior: "smooth",
    gap: "30px",
    paddingBottom: "20px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  sliderWebkit: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  slide: {
    flex: "0 0 auto",
    width: "calc(33.333% - 20px)",
    minWidth: "350px",
  },
  projectWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  projectLink: {
    display: "block",
    textDecoration: "none",
    overflow: "hidden",
    borderRadius: "12px",
  },
  projectImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    transition: "transform 0.3s ease",
  },
  projectInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  projectName: {
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: 0,
    color: "#000",
  },
  projectText: {
    color: "#666",
  },
  projectYear: {
    color: "#666",
    fontWeight: "500",
  },
  servicesList: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  serviceItemWrapper: {
    display: "inline-block",
  },
  serviceLink: {
    padding: "6px 12px",
    backgroundColor: "#f5f5f5",
    borderRadius: "20px",
    fontSize: "0.875rem",
    color: "#333",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
  },
  arrowsWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  arrowButton: {
    padding: "12px 30px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "60px",
  },
  mainButton: {
    position: "relative",
    padding: "16px 40px",
    backgroundColor: "#000",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "30px",
    fontSize: "1rem",
    fontWeight: "500",
    display: "inline-block",
    overflow: "hidden",
  },
  buttonBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#333",
    borderRadius: "30px",
  },
  buttonText: {
    position: "relative",
    zIndex: 1,
  },
  partnersWrapper: {
    paddingTop: "40px",
    borderTop: "1px solid #eee",
  },
};

// Additional CSS for hover effects
const hoverStyles = `
  .service-link:hover {
    background-color: #000;
    color: #fff;
  }
  .arrow-button:hover {
    background-color: #333;
  }
  .main-button:hover .button-bg {
    transform: scale(1.05);
  }
  .project-image:hover {
    transform: scale(1.02);
  }
`;