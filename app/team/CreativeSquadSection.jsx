"use client";
import React from "react";

const creativeTeam = [
  {
    id: 1,
    name: "Serhii Shtefanesa",
    role: "Design Lead",
    linkedin: "https://www.linkedin.com/in/serhii-shtefanesa/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7e121aecd7e9a2430fda_Serhii%20Shtefanesa.avif",
  },
  {
    id: 2,
    name: "Sofiia Dovhych",
    role: "Lead Graphic Designer",
    linkedin: "https://www.linkedin.com/in/sofiia-dovhych-5b285a334/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7e7875c55ac3239b747f_Sofiia%20Dovhych.avif",
  },
  {
    id: 3,
    name: "Nika Juileka",
    role: "Senior Designer",
    linkedin: "https://www.linkedin.com/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7ea689adf33c8f8ad5de_Nika%20Juileka.avif",
  },
  {
    id: 4,
    name: "Inna Kalianova",
    role: "UX/UI Designer",
    linkedin: "https://www.linkedin.com/in/inna-kalianova-089a2689/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7ecbf46a57e5c563fee0_Inna%20Kalianova.avif",
  },
  {
    id: 5,
    name: "Kurulo Sedyh",
    role: "Motion Designer",
    linkedin: "https://www.linkedin.com/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7eed7564524569a53d2b_Kurulo%20Sedyh.avif",
  },
  {
    id: 6,
    name: "Karina Fairushina",
    role: "Web / AI Designer",
    linkedin: "https://www.linkedin.com/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7f0bb3b37d9589fad65b_Karina%20Fairushina.avif",
  },
  {
    id: 7,
    name: "Zahra Karimi",
    role: "Motion Designer",
    linkedin: "https://www.linkedin.com/in/zahrakarimi21/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/695933dbd61f5b6a3ea8a074_photo_2026-01-03_18-33-35.avif",
  },
  {
    id: 8,
    name: "Olga Bulatova",
    role: "Web Designer",
    linkedin: "https://www.linkedin.com/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7f47df1767b3c818c7ee_Olga%20Bulatova.avif",
  },
  {
    id: 9,
    name: "Yana Chernetska",
    role: "Graphic Designer",
    linkedin: "https://www.linkedin.com/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7f60de1aaf58d23eac32_Yana%20Chernetska.avif",
  },
  {
    id: 10,
    name: "Anastasia Romashova",
    role: "Graphic Designer",
    linkedin: "https://www.linkedin.com/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7f86d94bc6ec7a0ea017_Anastasia%20Romashova.avif",
  },
  {
    id: 11,
    name: "Mehdi Fa",
    role: "UX/UI Designer",
    linkedin: "https://www.linkedin.com/in/mehdi-fa-4a9461215/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7fbae10c1ae4e9a2c138_Mehdi%20Fa.avif",
  },
  {
    id: 12,
    name: "Ian Sotnichenko",
    role: "Web Designer",
    linkedin: "https://www.linkedin.com/",
    image: "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/68de97f94a55efa5bd2b99c1_oilui.avif",
  },

];

export default function CreativeSquadSection() {
  return (
    <section style={{ background: "#cafdd933", padding: "90px 20px" }}>
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
          <div style={{ fontSize: "30px", fontWeight: 600 }}>
            • Our Creative Squad
          </div>

          <h2
            style={{
              fontSize: "48px",
              fontWeight: 700,
              maxWidth: "620px",
              lineHeight: "1.2",
              margin: 0,
            }}
          >
            The ones who see     <span style={{ color: "#016712" }}>beyond</span> the<span style={{ color: "#016712" }}> obvious</span>
          </h2>
        </div>

        {/* CARDS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {creativeTeam.map((member) => (
            <a
              key={member.id}
              href={member.linkedin}
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
                    height: "160px",
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(100%)",
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
                  <div style={{ fontSize: "15px", fontWeight: 600 }}>
                    {member.name}
                  </div>
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "#9ca3af",
                      marginTop: "2px",
                    }}
                  >
                    ( {member.role} )
                  </div>
                </div>

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
