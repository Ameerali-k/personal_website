"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const navLinks = ["Home", "Projects", "Services", "About"];

  useEffect(() => {
    // Initial sync
    setIsDark(document.documentElement.classList.contains('site-dark'));

    const handler = (e: Event) => {
      setIsDark((e as CustomEvent).detail.isDark);
    };
    window.addEventListener('siteThemeChange', handler);
    return () => window.removeEventListener('siteThemeChange', handler);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-500 border-b ${isDark
        ? "bg-[#0c0e1a]/70 backdrop-blur-md border-white/10"
        : "bg-white/70 backdrop-blur-md border-gray-100 shadow-sm"
        }`}
    >
      <div className="max-w-[1728px] mx-auto px-6 md:px-12 h-[80px] flex items-center justify-between">
        {/* Logo */}
        <a href="/#home" className="flex items-center">
          <img
            src={isDark ? "/logo.png" : "/logo_black.png"}
            alt="Ameerali"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link}
              href={link === "Home" ? "/#home" : `/#${link.toLowerCase()}`}
              className={`transition-colors ${isDark ? "text-white/80 hover:text-[#00ff00]" : "text-black hover:text-[#533FE7]"}`}
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1.2rem" }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="/Ameerali_resume_Graphic _designer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className={`rounded-[10px] px-6 py-2.5 border-2 font-semibold transition-all duration-300 flex items-center gap-2 ${isDark
              ? "border-white/20 text-white hover:border-[#00ff00] hover:text-[#00ff00]"
              : "border-black/10 text-black hover:border-[#533FE7] hover:text-[#533FE7]"
              }`}
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Resume
          </motion.a>

          <motion.a
            href="/#contact"
            whileTap={{ scale: 0.97 }}
            className={`rounded-[10px] px-8 py-3 text-black btn-fill-bottom font-semibold inline-block`}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.1rem",
              background: "linear-gradient(135deg, #00ff00 0%, #02ff8c 100%)",
              boxShadow: isDark
                ? "0 0 20px rgba(0,255,140,0.3), 0 0 40px rgba(0,255,0,0.1)"
                : "0 0 20px rgba(0,255,140,0.4), 0 0 40px rgba(0,255,0,0.2)",
            }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-black'} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-black'} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-black'} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 95% 40px)", opacity: 0 }}
            animate={{
              clipPath: "circle(150% at 95% 40px)",
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 40,
                damping: 15,
                restDelta: 2,
                opacity: { duration: 0.2 }
              }
            }}
            exit={{
              clipPath: "circle(0% at 95% 40px)",
              opacity: 0,
              transition: { duration: 0.4, ease: "easeInOut" }
            }}
            className={`absolute top-full left-0 w-full z-50 md:hidden flex flex-col items-center justify-center min-h-[calc(100vh-80px)] border-t ${isDark ? "bg-[#0c0e1a]/95 backdrop-blur-xl border-white/10" : "bg-white/95 backdrop-blur-xl border-gray-100 shadow-2xl"
              }`}
          >
            <div className="flex flex-col gap-10 text-center w-full px-12 py-12">
              <motion.nav
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="flex flex-col gap-8"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link}
                    variants={{
                      closed: { y: 60, opacity: 0, rotate: 5 },
                      open: { y: 0, opacity: 1, rotate: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    <a
                      href={link === "Home" ? "/#home" : `/#${link.toLowerCase()}`}
                      className={`text-4xl sm:text-5xl font-bold uppercase tracking-tighter ${isDark ? "text-white hover:text-[#00ff00]" : "text-black hover:text-[#533FE7]"}`}
                      style={{ fontFamily: "'Nova Square', sans-serif" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link}
                    </a>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.6 } }}
                className="flex flex-col gap-4"
              >
                <a
                  href="/Ameerali_resume_Graphic _designer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-[12px] px-10 py-4 border-2 font-bold text-lg tracking-wider uppercase transition-all ${isDark ? "border-white/20 text-white" : "border-black/20 text-black"
                    }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  onClick={() => setMenuOpen(false)}
                >
                  View Resume
                </a>
                <a
                  href="/#contact"
                  className="rounded-[12px] px-10 py-5 text-black font-extrabold text-xl tracking-wider uppercase shadow-xl inline-block"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg, #00ff00 0%, #02ff8c 100%)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  Hire Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
