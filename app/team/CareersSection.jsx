"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CareersSection() {
  const [roles, setRoles] = useState([]);
  const [availability, setAvailability] = useState("");
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    email: "",
    portfolio: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      alert("Full name and Email are required!");
      return;
    }

    try {
      await addDoc(collection(db, "careers"), {
        ...formData,
        roles,
        availability,
        createdAt: serverTimestamp(),
      });

      alert("Application submitted successfully!");
      setFormData({
        fullName: "",
        location: "",
        email: "",
        portfolio: "",
        message: "",
      });
      setRoles([]);
      setAvailability("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit application. Please try again.");
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controls.start({ y: 50, opacity: 0 });
    }
  }, [isInView, controls]);

  const toggleRole = (value) => {
    setRoles((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <section ref={ref} style={{ background: "#fff", padding: "120px 20px", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: "32px", padding: "72px", boxShadow: "0 30px 80px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "flex-start" }}>
            
            {/* LEFT - ANIMATED CONTENT */}
            <motion.div initial={{ y: 50, opacity: 0 }} animate={controls} style={{ position: "relative" }}>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                style={{ fontSize: "13px", fontWeight: 500, color: "#000", letterSpacing: "0.04em", textTransform: "uppercase", display: "block" }}
              >
                Careers
              </motion.span>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                style={{ fontSize: "48px", lineHeight: "1.15", fontWeight: 600, margin: "16px 0 20px", letterSpacing: "-0.02em" }}
              >
                Join our <span style={{ color: "#016712" }}>creative team</span>
              </motion.h2>

              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ fontSize: "17px", lineHeight: "1.7", color: "#6b7280", maxWidth: "420px" }}
              >
                We're always looking for curious minds who want to build meaningful digital experiences.
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ position: "absolute", top: -10, left: -10, width: "80px", height: "80px", borderRadius: "50%", opacity: 0.1, zIndex: 0 }}
              />
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ background: "#fafafa", borderRadius: "24px", padding: "40px", border: "1px solid #e5e7eb", position: "relative", zIndex: 1 }}
            >
              <form style={{ display: "flex", flexDirection: "column", gap: "26px" }} onSubmit={handleSubmit}>
                {/* INPUTS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  {[
                    { label: "Full name", name: "fullName", placeholder: "Evan Johnson" },
                    { label: "Location", name: "location", placeholder: "Berlin, Germany" },
                    { label: "Email", name: "email", placeholder: "evan@email.com" },
                    { label: "Portfolio / LinkedIn", name: "portfolio", placeholder: "https://linkedin.com/in/..." },
                  ].map((input, index) => (
                    <motion.div
                      key={input.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                    >
                      <Label>{input.label}</Label>
                      <input
                        name={input.name}
                        value={formData[input.name]}
                        onChange={handleChange}
                        placeholder={input.placeholder}
                        style={{ padding: "14px 16px", borderRadius: "14px", border: "1px solid #e5e7eb", fontSize: "15px", background: "#fff", outline: "none", transition: "border-color 0.3s ease" }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* ROLES */}
                <Label>Role you're interested in</Label>
                <div style={chipWrap}>
                  {["Product Designer","UX/UI Designer","Graphic Designer","Motion Designer","Web Designer","Frontend Developer","Webflow Developer"].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: 0.9 + index*0.05 }}
                    >
                      <Chip active={roles.includes(item)} onClick={() => toggleRole(item)}>{item}</Chip>
                    </motion.div>
                  ))}
                </div>

                {/* AVAILABILITY */}
                <Label>Availability</Label>
                <div style={chipWrap}>
                  {["Full-time","Part-time","Freelance","Internship"].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: 1.2 + index*0.05 }}
                    >
                      <Chip active={availability===item} onClick={()=>setAvailability(item)}>{item}</Chip>
                    </motion.div>
                  ))}
                </div>

                {/* MESSAGE */}
                <motion.div style={{ marginBottom: "20px" }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.4 }}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write something concise..."
                    style={textareaStyle}
                  />
                </motion.div>

                {/* SUBMIT BUTTON */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 1.5 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button type="submit" style={{ marginTop: "10px", background: "#111", color: "#fff", padding: "16px", borderRadius: "999px", border: "none", fontSize: "15px", fontWeight: 500, cursor: "pointer", transition: "all .25s ease", width: "50%" }}>
                    Apply now
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- COMPONENTS ---------- */

function Label({ children }) {
  return (
    <label style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>{children}</label>
  );
}

function Chip({ active, children, onClick }) {
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      style={{ padding: "10px 16px", borderRadius: "999px", border: active?"1px solid #111":"1px solid #e5e7eb", background: active?"#111":"#fff", color: active?"#fff":"#111", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all .2s ease" }}
    >
      {children}
    </motion.button>
  );
}

/* ---------- STYLES ---------- */

const chipWrap = { display: "flex", flexWrap: "wrap", gap: "12px" };
const textareaStyle = { width: "100%", padding: "14px 16px", borderRadius: "16px", border: "1px solid #e5e7eb", fontSize: "15px", fontFamily: "inherit", transition: "border-color 0.3s ease" };