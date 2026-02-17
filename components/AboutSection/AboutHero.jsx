"use client";

import { useRouter } from "next/navigation";

export default function AboutHero() {
  const router = useRouter();

  return (
    <section className="hero">
      <div className="hero-wrap">

        {/* HERO CONTENT */}
        <div className="hero-content">
          <div className="nav-column">
  <h3 className="column-title">
    <span className="badge">About Us</span>
  </h3>
  </div>
<h1>
  Driving business growth <br />
  through <span className="green">modern technology</span>
</h1>



          <p>
            We design and engineer high-performance digital products using
            cloud infrastructure, modern web frameworks, AI-powered systems,
            and data-driven architectures that help businesses scale faster
            and operate smarter.
          </p>

          <div className="actions">
           

          
          </div>
        </div>

        {/* HERO CARDS */}
        <div className="cards">
          <div className="card green-card">
            <p className="small">Our Mission</p>
            <h3>
              Empower teams with <br /> secure, scalable & smart tech
            </h3>
          </div>

          <div className="card stat">
            <h2>300%</h2>
            <p>Boost in operational efficiency</p>
          </div>

          <div className="card image">
          </div>

          <div className="card stat green-soft">
            <h2>99.9%</h2>
            <p>Cloud & platform uptime</p>
          </div>

          <div className="card profile">
            <img
              src="https://images.unsplash.com/photo-1690627931320-16ac56eb2588?q=80&w=1193&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Tech Team"
            />
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .hero {
          background: #cfe8cf84;
          padding: 40px;
         
        }

        .hero-wrap {
          background: #fff;
          border-radius: 28px;
          padding: 40px;
          margin-top: -30px;
        }

        .hero-content {
          max-width: 720px;
          margin: 80px auto 60px;
          text-align: center;
        }

        h1 {
          font-size: 60px;
          line-height: 1.1;
          margin-bottom: 20px;
          font-weight:600;
        }
          .badge {
  display: inline-block;
 
  font-size: 16px;
  font-weight: 600;
  color: #016712;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}

        .green {
          color:#016712;
        }

        p {
          color: #555;
          font-size: 18px;
          max-width: 640px;
          margin: auto;
          line-height:1.5;
        }

        .actions {
          margin-top: 0px;
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .btn-primary {
          background: #caff72;
          border: none;
          padding: 14px 28px;
          border-radius: 24px;
          cursor: pointer;
          font-weight: 500;
          transition: transform 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
        }

        .btn-light {
          background: #f3f3f3;
          border: none;
          padding: 14px 28px;
          border-radius: 24px;
          cursor: pointer;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          align-items: end;
        }

        .card {
          background: #f6f6f6;
          border-radius: 22px;
          padding: 20px;
          height: 180px;
        }

        .green-card {
          background: #cfe8cf;
        }

        .stat h2 {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .green-soft {
          background: #e7f3e7;
        }

        .image {
          background-image: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
          background-size: cover;
          background-position: center;
          position: relative;
          color: #fff;
        }

        .overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          font-weight: 500;
        }

        .profile {
          padding: 0;
          overflow: hidden;
        }

        .profile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 22px;
        }

        @media (max-width: 1024px) {
          h1 {
            font-size: 42px;
          }

          .cards {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
