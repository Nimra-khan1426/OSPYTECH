"use client";
import React from "react";

const operationsTeam = [
  {
    id: 1,
    name: "Abduqodir Abidov",
    role: "Project Manager",
    linkedin: "https://www.linkedin.com/in/abduqodir-abidov-209481299/",
    image:
      "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7d17ba48bcc800313673_Abduqodir%20Abidov.avif",
  },
  {
    id: 2,
    name: "Sofiya Li",
    role: "Project Manager",
    linkedin: "https://www.linkedin.com/in/sofiya-li-624507302/",
    image:
      "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7d8857bf13bb92fce558_Sofiya%20Li.avif",
  },
  {
    id: 3,
    name: "Alla Ten",
    role: "Content Manager",
    linkedin: "https://www.linkedin.com/in/alla-ten-317868287/",
    image:
      "https://cdn.prod.website-files.com/673a535e55337a9ba48cdebb/686e7db9d617ae62d15f4edd_Alla%20Ten.avif",
  },
];

export default function OperationsSection() {
  return (
    <section style={{ background: "#f3f4f6", padding: "90px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "70px",
            gap: "40px",
          }}
        >
          <div style={{ fontSize: "30px", fontWeight: 600 }}>
            • Our Operations & Management
          </div>

          <h2
            style={{
              fontSize: "50px",
              fontWeight: 700,
              maxWidth: "600px",
              lineHeight: "1.2",
              margin: 0,
            }}
          >
            Logic in the middle of     <span style={{ color: "#016712" }}>creative chaos</span>
          </h2>
        </div>

        {/* CARDS */}
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "26px",
    paddingRight:"300px",
  }}
>
  {operationsTeam.map((member) => (
    <a
      key={member.id}
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: "#ffffff",
        borderRadius: "22px",
        padding: "16px",
        textDecoration: "none",
        color: "inherit",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        display: "block",
        paddingRight:"16px",
      }}
    >
      {/* IMAGE like Webflow */}
      <div
        style={{
          background: "#f1f1f1",
          borderRadius: "18px",
          overflow: "hidden",
          height: "190px",
        }}
      >
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(100%)",
            transition: "transform 0.4s ease",
          }}
        />
      </div>

      {/* NAME + ROLE + ICON */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "14px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#111",
            }}
          >
            {member.name}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#9ca3af",
              marginTop: "2px",
            }}
          >
            ( {member.role} )
          </div>
        </div>

        {/* Small LinkedIn Icon (like screenshot) */}
        <img
          src="https://cdn.prod.website-files.com/673786754d248974527e65b5/6758cf29b434b38cf032de24_elements.svg"
          alt="LinkedIn"
          style={{
            width: "26px",
            height: "26px",
          }}
        />
      </div>
    </a>
  ))}
</div>

      </div>
    </section>
  );
}
