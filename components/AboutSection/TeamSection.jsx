import Image from "next/image";

export default function TeamSection() {
  const team = [
    {
      name: "David Turner",
      role: "Frontend Engineer",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
      linkedin: "https://linkedin.com/in/davidturner",
    },
    {
      name: "Sophia Lee",
      role: "AI Researcher",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
      linkedin: "https://linkedin.com/in/sophialee",
    },
    {
      name: "Emma Watson",
      role: "Cloud Solutions Architect",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
      linkedin: "https://linkedin.com/in/emmawatson",
    },
  ];

  return (
    <section className="team-section" id="team">
      <div className="container">
        {/* LEFT TEXT */}
        <div className="text-column">
          <h1 className="heading">
            Our experts drive <br />
            <span className="green">tech innovation</span>
          </h1>

          <p className="description">
            Meet the team that builds the future of technology! From AI to cloud
            solutions, our experts turn ideas into cutting-edge tech.
          </p>

          <a href="http://localhost:3000/team" className="view-all-btn">
            View All Team →
          </a>
        </div>

        {/* RIGHT CARDS */}
        <div className="cards-column">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="image-wrap">
                <img src={member.img} alt={member.name} />
              </div>

              <div className="card-footer">
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="linkedin-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS remains the same */}
      <style jsx>{`
        .team-section {
          padding: 100px 20px;
          background: #f7f7f7;
        }
         .green {
          color:#016712;
        }
        .container {
          max-width: 1200px;
          margin: auto;
          display: flex;
          gap: 60px;
          align-items: flex-start;
        }

        /* LEFT */
        .text-column {
          flex: 1;
        }

        .heading {
          font-size: 56px;
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 30px;
          color: #000;
        }

        .description {
          max-width: 380px;
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .view-all-btn {
          font-size: 16px;
          font-weight: 500;
          border-bottom: 1px solid #000;
          text-decoration: none;
          color: #000;
          padding-bottom: 4px;
          display: inline-block;
          transition: opacity 0.3s;
        }

        .view-all-btn:hover {
          opacity: 0.7;
        }

        /* RIGHT */
        .cards-column {
          flex: 1.2;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .team-card {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .image-wrap {
          width: 100%;
          height: 280px;
          overflow: hidden;
          border-radius: 24px 24px 0 0;
        }

        .image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .team-card:hover .image-wrap img {
          transform: scale(1.05);
        }

        .card-footer {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-footer h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #000;
        }

        .card-footer p {
          margin: 6px 0 0;
          font-size: 14px;
          color: #777;
        }

        .linkedin-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #e0e0e0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9f9f9;
          color: #0077b5;
          text-decoration: none;
          transition: all 0.3s;
        }

        .linkedin-btn:hover {
          background: #0077b5;
          color: white;
          border-color: #0077b5;
          transform: scale(1.1);
        }

        .linkedin-btn svg {
          width: 16px;
          height: 16px;
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .cards-column {
            gap: 20px;
          }
        }

        @media (max-width: 992px) {
          .container {
            flex-direction: column;
            gap: 50px;
          }

          .cards-column {
            grid-template-columns: repeat(2, 1fr);
            width: 100%;
          }

          .team-card:nth-child(3) {
            grid-column: 1 / -1;
            max-width: 400px;
            margin: 0 auto;
          }

          .heading {
            font-size: 48px;
          }
        }

        @media (max-width: 768px) {
          .team-section {
            padding: 80px 20px;
          }

          .heading {
            font-size: 40px;
          }

          .description {
            font-size: 16px;
          }

          .cards-column {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }

          .team-card:nth-child(3) {
            grid-column: 1;
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .heading {
            font-size: 36px;
          }

          .image-wrap {
            height: 240px;
          }

          .card-footer {
            padding: 16px 20px;
          }

          .linkedin-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
}
