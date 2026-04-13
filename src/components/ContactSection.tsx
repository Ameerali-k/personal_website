"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { sendEmail } from "@/lib/actions";

function AnimatedHeading({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.h2
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-20px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {}
      }}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: '0.25em' }}>
          <motion.span
            className="inline-block origin-bottom-left"
            variants={{
              hidden: { y: "120%", rotateZ: 8, opacity: 0 },
              visible: { y: "0%", rotateZ: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

export function ContactSection() {
  const [isDark, setIsDark] = useState(true); // Default: dark to match home page default

  useEffect(() => {
    // Sync with initial HTML class set by page.tsx
    setIsDark(document.documentElement.classList.contains('site-dark'));

    const handler = (e: Event) => {
      setIsDark((e as CustomEvent).detail.isDark);
    };
    window.addEventListener('siteThemeChange', handler);
    return () => window.removeEventListener('siteThemeChange', handler);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", mobile: "", email: "", service: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(`Error: ${result.error || "Failed to send message. Please try again."}`);
      }
    } catch (err) {
      alert("Error: Something went wrong. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name.toLowerCase()]: value }));
  };

  const inputClass = `w-full px-5 py-4 border rounded-[10px] font-medium focus:outline-none focus:border-[#533fe7] focus:ring-1 focus:ring-[#533fe7] transition-all text-sm md:text-base placeholder:tracking-widest placeholder:text-sm ${
    isDark
      ? 'bg-[#1a2035] border-white/10 text-white placeholder:text-white/30'
      : 'bg-transparent border-[#B1AAE2] text-[#1d2431] placeholder:text-[#a0a0a0]'
  }`;

  return (
    <section
      id="contact"
      className={`w-full py-24 md:py-32 px-4 md:px-6 flex justify-center items-center overflow-x-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#0c0e1a]' : 'bg-white'
      }`}
    >
      <div className={`max-w-[1200px] w-full rounded-[32px] md:rounded-[40px] p-4 md:p-8 lg:p-12 flex flex-col md:flex-row gap-8 md:gap-14 lg:gap-20 items-stretch transition-colors duration-500 ${
        isDark
          ? 'bg-[#141827] shadow-[0_10px_60px_rgba(0,0,0,0.4)] border border-white/5'
          : 'bg-[#fdfdfd] shadow-[0_10px_60px_rgba(0,0,0,0.06)] border border-black/5'
      }`}>

        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[40%] flex-shrink-0"
        >
          <img src="/profile.png" alt="Profile" className="w-full h-auto min-h-[300px] md:h-full object-cover object-center rounded-[20px] md:rounded-[24px]" />
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-20px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full md:w-[60%] flex flex-col py-4 md:py-8 pr-0 md:pr-4"
        >
          <AnimatedHeading
            text="Let's Get in Touch"
            className={`font-semibold text-[2.4rem] md:text-[3.2rem] mb-10 md:mb-12 leading-none flex md:justify-start justify-center flex-wrap ${isDark ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          />

          <form className="flex flex-col gap-5 md:gap-6 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-5 md:gap-6 w-full">
              <input required name="NAME" type="text" placeholder="NAME" className={inputClass} style={{ fontFamily: "'Outfit', sans-serif" }} value={formData.name} onChange={handleChange} />
              <input required name="MOBILE" type="tel" placeholder="MOBILE NUMBER" className={inputClass} style={{ fontFamily: "'Outfit', sans-serif" }} value={formData.mobile} onChange={handleChange} />
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-6 w-full">
              <input required name="EMAIL" type="email" placeholder="EMAIL" className={inputClass} style={{ fontFamily: "'Outfit', sans-serif" }} value={formData.email} onChange={handleChange} />
              <div className="relative w-full md:w-1/2">
                <select
                  required
                  name="SERVICE"
                  className={`w-full px-5 py-4 border rounded-[10px] font-medium focus:outline-none focus:border-[#533fe7] focus:ring-1 focus:ring-[#533fe7] transition-all appearance-none text-sm md:text-base tracking-widest uppercase ${
                    isDark
                      ? 'bg-[#1a2035] border-white/10 text-white/40'
                      : 'bg-transparent border-[#B1AAE2] text-[#a0a0a0]'
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>SELECT SERVICE</option>
                  <option value="branding" className="text-black uppercase">Branding</option>
                  <option value="graphic" className="text-black uppercase">Graphic Design</option>
                  <option value="web" className="text-black uppercase">Web Design</option>
                  <option value="video" className="text-black uppercase">Video Editing</option>
                </select>
                <div className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'opacity-30' : 'opacity-40'}`}>
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 1 7 7 13 1"></polyline></svg>
                </div>
              </div>
            </div>

            <textarea
              required
              name="MESSAGE"
              placeholder="TELL ME ABOUT YOUR PROJECT"
              rows={7}
              className={inputClass}
              style={{ fontFamily: "'Outfit', sans-serif" }}
              value={formData.message}
              onChange={handleChange}
            />

            <div className="flex items-center gap-4 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-gradient-to-r from-[#00ff00] to-[#0ae58c] text-black font-bold text-sm md:text-[15px] tracking-wide rounded-[8px] flex items-center justify-center gap-2 active:scale-[0.98] shadow-md hover:shadow-lg transition-all btn-fill-bottom disabled:opacity-50 disabled:scale-100"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                )}
              </button>

              {isSuccess && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[#00ff00] font-bold text-sm md:text-base"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  ✓ Message Sent Successfully!
                </motion.span>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}


