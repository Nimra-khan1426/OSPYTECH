"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [activeTab, setActiveTab] = useState("home");
  const [authTab, setAuthTab] = useState("login");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.pathname === "/auth") {
        const tab = url.searchParams.get("tab");
        setAuthTab(tab === "signup" ? "signup" : "login");
      }
    }
  }, []);

  const handleAuthClick = (tab) => {
    setAuthTab(tab);
    router.push(`/auth?tab=${tab}`);
  };

  return (
    <div className="site-header">
      <div className="glass-bar">
        {/* Logo */}
        <a href="/" className="logo">
          OSPYTECH
        </a>

        {/* Navigation */}
        <nav className="nav">
          <a href="/" onClick={() => setActiveTab("home")}>Home</a>

          {/* SERVICES DROPDOWN */}
          <div className="nav-item">
            <a href="/services">Services</a>
            <div className="submenu">
              <a href="/services#faq">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff503dddb77a9cb241a80_d2d525d80b0a0a7539ab64b29886a2ad_Marketing%20Content.svg" 
                  className="menu-items-icon-img" 
                  alt="FAQ"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  FAQ
                  <div className="submenu-desc">Common questions answered</div>
                </div>
              </a>
              <a href="/services#testimonials">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff50351c51a45efd6c0a8_5f31366d9f7426b3e27a0206233d8372_Motion%20Design.svg" 
                  className="menu-items-icon-img" 
                  alt="Testimonials"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Testimonials
                  <div className="submenu-desc">Hear from our clients</div>
                </div>
              </a>
              <a href="/services#expertise">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff5031b09d683b0e9b1ad_e37af070ea5ffd845f75fd6a0f697437_Creative%20Direction.svg" 
                  className="menu-items-icon-img" 
                  alt="Expertise"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Expertise
                  <div className="submenu-desc">Our technical strengths</div>
                </div>
              </a>
              <a href="/services#approach">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff503ec1efee19d114323_b0171a975c2c3ddb82402b71449c35ac_Presentation%20Design.svg" 
                  className="menu-items-icon-img" 
                  alt="Approach"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Approach
                  <div className="submenu-desc">How we deliver success</div>
                </div>
              </a>
              <a href="/services#projects">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff503283960030f364bf4_9efdd0707005a4888a6308d86e97f9ad_Content%20Creation.svg" 
                  className="menu-items-icon-img" 
                  alt="Projects"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Featured Projects
                  <div className="submenu-desc">Portfolio highlights</div>
                </div>
              </a>
            </div>
          </div>

          {/* ABOUT DROPDOWN */}
          <div className="nav-item">
            <a href="/about">About</a>
            <div className="submenu">
              <a href="/about#vision">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff50361bc805ce4bdbb7c_2e7b6e7572c7624cd0a35ad7f74ac5d3_Landing%20Page.svg" 
                  className="menu-items-icon-img" 
                  alt="Vision"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Vision
                  <div className="submenu-desc">Our goals</div>
                </div>
              </a>
              <a href="/about#Mission">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff5036079c7c62699bc92_cf57f3a8bb26bd12d3223c46b0fd78f7_Superdesigns.io.svg" 
                  className="menu-items-icon-img" 
                  alt="Mission"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Mission
                  <div className="submenu-desc">Our direction</div>
                </div>
              </a>
              <a href="/about#who">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff5032b8dbeb619e08886_7061561f94371ec225a88dfee22ab6ae_Creative%20Design%20Subscription.svg" 
                  className="menu-items-icon-img" 
                  alt="Who We Are"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Who We Are
                  <div className="submenu-desc">About our team</div>
                </div>
              </a>
              <a href="/about#excellence">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff503bc651fe247f89a91_aaf2c89e1e22a7fa1096b6b9ab21497e_Webflow%20Development.svg" 
                  className="menu-items-icon-img" 
                  alt="Technical Excellence"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Technical Excellence
                  <div className="submenu-desc">Our skills & expertise</div>
                </div>
              </a>
              <a href="/about#partners">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff504c766ffbc3cbe81d0_f0d3dfb4e249ef60500f331bd0ae8885_Packaging%20Design.svg" 
                  className="menu-items-icon-img" 
                  alt="Partners"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Our Partners
                  <div className="submenu-desc">Trusted collaborations</div>
                </div>
              </a>
              <a href="/about#team">
                <img 
                  src="https://cdn.prod.website-files.com/673786754d248974527e65b5/686ff503c24b9058ebe3f531_b0965bb658c3b4935ff4f09ca731d691_Content%20Design%20%26%20Socials.svg" 
                  className="menu-items-icon-img" 
                  alt="Team"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  Team
                  <div className="submenu-desc">Meet our members</div>
                </div>
              </a>
            </div>
          </div>

          <a href="/contact">Contact</a>
          <a href="/account">Account</a>
        </nav>

        {/* Auth */}
        <div className="actions">
          <div className="auth">
            <div
              className="auth-indicator"
              style={{
                transform: authTab === "signup" ? "translateX(100%)" : "translateX(0)",
              }}
            />
            <button className={authTab === "login" ? "active" : ""} onClick={() => handleAuthClick("login")}>
              Login
            </button>
            <button className={authTab === "signup" ? "active" : ""} onClick={() => handleAuthClick("signup")}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}