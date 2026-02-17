"use client";

import { useEffect, useState } from "react";
import "./ContactPage.css";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, message } = formData;

    if (!firstName || !lastName || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      alert("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  };

  useEffect(() => {
    // Animate elements on page load
    const animateElements = () => {
      const elements = document.querySelectorAll(
        ".contact-left h1, .contact-left p, .info, .btn"
      );
      elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        setTimeout(() => {
          el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 200);
      });
    };

    const animateFormFields = () => {
      const formFields = document.querySelectorAll(
        ".name-field, .email-field, .textarea-field, .submit"
      );
      formFields.forEach((field, index) => {
        field.style.opacity = "0";
        field.style.transform = "translateY(20px)";
        setTimeout(() => {
          field.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
          field.style.opacity = "1";
          field.style.transform = "translateY(0)";
        }, 600 + index * 200);
      });
    };

    // Input focus / hover effects
    const inputs = document.querySelectorAll("input, textarea");
    const handleFocus = (e) => (e.target.style.transform = "translateY(-2px)");
    const handleBlur = (e) => (e.target.style.transform = "translateY(0)");
    const handleMouseEnter = (e) => (e.target.style.borderColor = "#016712");
    const handleMouseLeave = (e) => {
      if (!e.target.matches(":focus")) e.target.style.borderColor = "#ddd";
    };

    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
      input.addEventListener("mouseenter", handleMouseEnter);
      input.addEventListener("mouseleave", handleMouseLeave);
    });

    const timeoutId = setTimeout(() => {
      animateElements();
      animateFormFields();
    }, 300);

    // Cleanup listeners & timeout on unmount
    return () => {
      clearTimeout(timeoutId);
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
        input.removeEventListener("mouseenter", handleMouseEnter);
        input.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <section className="contact">
      <div className="contact-background-pattern">
        <div className="circle-pattern-large">
          <div className="main-circle-large" />
          <div className="concentric-circle-large circle-1-large" />
          <div className="concentric-circle-large circle-2-large" />
          <div
            className="radial-line-large"
            style={{ transform: "translate(-50%, -50%) rotate(0deg)" }}
          />
          {/* Add other rotated radial lines here if needed */}
          <div className="dots-pattern-large" />
        </div>
      </div>

      <div className="contact-container">
      <div className="contact-left">
  <h1>
    Get in <br />
    <span style={{ color: "#016712" }}> touch with us </span>
  </h1>
  <p>
    We're here to help! Whether you have a question about our services, need support, or
    want to share feedback — feel free to reach out.
  </p>
  <div className="info">
    <p>
      <strong>Email:</strong>
      <br />
      support@yourbrand.com
    </p>
    <p>
      <strong>Phone:</strong>
      <br />
      +92 300 1234567
    </p>
    <span>Available Mon – Fri, 9:00 AM – 6:00 PM</span>
  </div>
  <button className="btn" onClick={() => {
      const phone = "03165439691";
      const message = "Hello! I would like to chat with you.";
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
  }}>
    Live Chat<span>→</span>
  </button>
</div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="name-row">
              <div className="form-group name-field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group name-field">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group email-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group textarea-field">
              <label htmlFor="message">How can we help you?</label>
              <textarea
                id="message"
                placeholder="Tell us how we can assist you..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn submit">
              Send Message<span>→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}