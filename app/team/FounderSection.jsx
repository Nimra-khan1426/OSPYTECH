"use client";

import React from "react";

const foundersData = [
  {
    id: 1,
    name: "Linur Chubaev",
    role: "CEO, Founder",
    linkedin: "https://www.linkedin.com/in/linurchubaev/",
    image:
      "https://cdn.prod.website-files.com/673786754d248974527e65b5/686e87931aecd7e9a24e5c1d_Linur%20Chubaev.avif",
  },
  {
    id: 2,
    name: "Mirhayot Yunusov",
    role: "Design Director, Co-Founder",
    linkedin: "https://www.linkedin.com/in/mirhayot-yunusov",
    image:
      "https://cdn.prod.website-files.com/673786754d248974527e65b5/686e879b1972821f3ffc23ea_Mirhayot%20Yunusov.avif",
  },
];

export default function FoundersSection() {
  return (
    <section style={{ background: "#f3f4f6", padding: "90px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            marginBottom: "64px",
          }}
        >
          <div style={{ fontSize: "30px", fontWeight: 600 }}>• Our Founders</div>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 700,
              maxWidth: "620px",
              lineHeight: "1.2",
              margin: 0,
            }}
          >
            Meet the<span style={{ color: "#016712" }}> visionaries</span> behind our company
          </h2>
        </div>

        {/* CARDS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            paddingLeft:"250px",
            paddingRight:"250px",
          }}
        >
          {foundersData.map((founder) => (
            <a
              key={founder.id}
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "14px",
                textDecoration: "none",
                color: "inherit",
                boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
                display: "block",
                transition: "all 0.3s ease",
                  paddingLeft:"10px",
            paddingRight:"10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.08)";
              }}
            >
              {/* IMAGE FRAME */}
              <div
                style={{
                  background: "#f2f2f2",
                  borderRadius: "18px",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    height: "250px",
                  }}
                >
                  <img
                    src={founder.image}
                    alt={founder.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(100%)",
                      transition: "filter 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "grayscale(0%)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "grayscale(100%)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
              </div>

              {/* NAME + ROLE */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "12px",
                  padding: "0 4px",
                }}
              >
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 600 }}>{founder.name}</div>
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "#9ca3af",
                      marginTop: "2px",
                    }}
                  >
                    ({founder.role})
                  </div>
                </div>

                {/* LinkedIn Icon */}
                <img
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/6758cf29b434b38cf032de24_elements.svg"
                  alt="LinkedIn"
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
