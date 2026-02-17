// components/Footer.jsx
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Animated Background Elements - LEFT SIDE */}
      
      
      
      <div className="footer-wrapper">
        {/* Top Section */}
        <div className="footer-top-section">
          {/* Left Column - Brand */}
          <div className="brand-section">
            <div className="logo-container">
              <div className="logo-square"></div>
              <span className="logo-text">OSPYTECH</span>
            </div>
            <p className="tagline">
              Empowering your productivity with intuitive tools and seamless solutions.
            </p>
            <a href="mailto:hello@genius.com" className="email-link">
              hello@genius.com
            </a>
            {/* Middle - Social Links */}
            <div className="social-section">
             
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <FaFacebookF className="icon" />
                </a>
                <a href="#" className="social-icon">
                  <FaTwitter className="icon" />
                </a>
                <a href="#" className="social-icon">
                  <FaLinkedinIn className="icon" />
                </a>
                <a href="#" className="social-icon">
                  <FaInstagram className="icon" />
                </a>
              </div>
            </div>
          </div>
          

          {/* Navigation Columns */}
          <div className="nav-column">
            <h3 className="column-title">Home</h3>
            <ul className="nav-list">
              {['Overview', 'Features', 'Process', 'Comparison', 'Pricing'].map((item) => (
                <li key={item}>
                  <a href="#" className="nav-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-column">
            <h3 className="column-title">Company</h3>
            <ul className="nav-list">
              {['About Us', 'Our Team', 'How to Use', 'FAQs', 'Testimonials'].map((item) => (
                <li key={item}>
                  <a href="#" className="nav-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-column">
            <h3 className="column-title">All Pages</h3>
            <ul className="nav-list">
              {['Home', 'Waitlist', 'Blogs', 'Contact', 'Changelog'].map((item) => (
                <li key={item}>
                  <a href="#" className="nav-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
       <div className="footer-bottom-section">
  <div className="bottom-wrapper">
    <p className="copyright-text">
      Template by <span className="highlight-text">Nimra Khan</span> &nbsp;|&nbsp; 
      All CopyRights Reserved by <span className="highlight-text">OspyTech</span> @ 2026
    </p>
  </div>
</div>

         
      </div>

      <style >{`
        .footer-container {
          background: #cfe8cf84;
          color: #016712;
          padding: 3rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        /* Animated Background Elements - LEFT SIDE */
        .animated-background {
          position: absolute;
          top: 0;
          right: 0;
          bottom:0;
          width: 15%; /* Left side cover */
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        /* Large Light Rotating Circle */
        .rotating-circle {
          position: absolute;
          top: 50%;
          left: -10%; /* Left side se bahar nikal kar */
          transform: translateY(-50%);
          width: 400px;
          height: 400px;
          animation: rotateCircle 40s linear infinite;
        }
        
        .circle-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(122, 212, 137, 0.03); /* Very light color */
          border-radius: 50%;
          border-top-color: rgba(60, 114, 69, 0.12);
          border-right-color: rgba(67, 129, 77, 0.05);
          border-bottom-color: rgba(90, 165, 103, 0.06);
          border-left-color: rgba(129, 223, 145, 0.06);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulseRing 10s ease-in-out infinite;
          opacity: 0.5;
        }
        
        .circle-ring.ring-2 {
          width: 85%;
          height: 85%;
          border-width: 0.8px;
          opacity: 0.4;
          animation-delay: 2s;
          animation-duration: 12s;
          animation-direction: reverse;
        }
        
        .circle-ring.ring-3 {
          width: 70%;
          height: 70%;
          border-width: 0.6px;
          opacity: 0.3;
          animation-delay: 4s;
          animation-duration: 14s;
        }
        
        .circle-ring.ring-4 {
          width: 55%;
          height: 55%;
          border-width: 0.5px;
          opacity: 0.2;
          animation-delay: 6s;
          animation-duration: 16s;
          animation-direction: reverse;
        }
        
        @keyframes rotateCircle {
          0% {
            transform: translateY(-50%) rotate(0deg);
          }
          100% {
            transform: translateY(-50%) rotate(360deg);
          }
        }
        
        @keyframes pulseRing {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.02);
            opacity: 0.5;
          }
        }
        
        .footer-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .footer-top-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .brand-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .logo-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: #016712;
        }
        
        .tagline {
          color: black;
          line-height: 1.5;
          max-width: 280px;
          font-size: 0.9rem;
        }
        
        .email-link {
          color: #016712;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .email-link:hover {
          color: #016712;
        }
        
        .nav-column {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .column-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        
        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .nav-link {
          color: black;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        
        .nav-link:hover {
          color: #016712;
        }
        
        .footer-bottom-section {
          padding-top: 2rem;
          border-top: 1px solid #016712;
        }
        
        .bottom-wrapper {
            display: flex;
  justify-content: center; /* center horizontally */
  align-items: center;    /* center vertically if needed */
  text-align: center;     /* for text inside p */
  flex-wrap: wrap;
  gap: 0.25rem;
        }
        .muted {
          color: black;
          font-size: 0.875rem;
        

  
}
        .copyright-text {
          color: black;
          font-size: 0.875rem;
        }
        
        .highlight-text {
          color: black;
          font-weight: 500;
          justify-text: center;
        }
        
        .social-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .social-label {
          color: #0a0a0a;
          font-size: 0.875rem;
        }
        
        .social-icons {
          display: flex;
          gap: 0.5rem;
        }
        
        .social-icon {
          width: 32px;
          height: 32px;
          border: 1px solid #080808;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color:#016712;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .social-icon:hover {
          background: #016712;
          border-color: #016712;
            color:white;
        }
        
        .icon {
          width: 14px;
          height: 14px;
        }
        
        .right-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #050505;
          font-size: 0.875rem;
        }
        
        .privacy-link {
          color: white;
          text-decoration: none;
        }
        
        .privacy-link:hover {
          text-decoration: underline;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-top-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .animated-background {
            width: 40%;
          }
          
          .rotating-circle {
            width: 300px;
            height: 300px;
            left: -15%;
          }
        }
        
        @media (max-width: 768px) {
          .rotating-circle {
            width: 250px;
            height: 250px;
            left: -20%;
          }
        }
        
        @media (max-width: 640px) {
          .footer-top-section {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .bottom-wrapper {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }
          
          .social-section {
            order: -1;
          }
          
          /* Hide animations on mobile for better performance */
          .animated-background {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;