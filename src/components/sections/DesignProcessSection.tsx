"use client";
"use client";
import Image from "next/image";
import { useEffect, useState, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import imgWhatsApp from "figma:asset/2c5a6bc55984a9012693543c79e3a6248281632d.png";
import imgEllipse5 from "figma:asset/3a5b038a420d2522f2cc87574955419af25bf13c.png";
import imgEllipse6 from "figma:asset/438d2dc6e54ddcf05c803936cd7b8a7d8f1d9a0b.png";
import imgEllipse7 from "figma:asset/85314c3bcc3ccdce33317a4411ce06eacb7be7dd.png";
import imgEllipse8 from "figma:asset/0119b0c1a6625f13ae62461589cf4046baf417cd.png";
import imgClapping from "figma:asset/e80ce3c7e8b21c57c9d75d726b350ff4f9b5b9ce.png";
import imgLogoAvatar from "figma:asset/67b3b0749a2c1ad0580b543246a797b39269c8a6.png";
import { fetchProjects, hasWordPressEndpoint, type CmsProjectSummary } from "@/lib/wordpress";
import { supabase } from "@/lib/supabase";
import { useTheme } from "./ThemeContext";

import AnimatedHeading from "./AnimatedHeading";

/* ─── Design Process Section ─── */
const processSteps = [
  { num: "01", title: "Understand the brief" },
  { num: "02", title: "Research" },
  { num: "03", title: "Brainstorm & sketch" },
  { num: "04", title: "Create the design" },
  { num: "05", title: "Review & refine" },
  { num: "06", title: "Present to client" },
  { num: "07", title: "Final export & delivery" },
];

function DesignProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

  return (
    <section className="w-full bg-black py-24 md:py-32 px-4 md:px-6 flex flex-col items-center overflow-hidden transition-all duration-500 rounded-[50px] mb-10 mt-10">
      <AnimatedHeading
        text="The Design Process"
        className="text-white font-semibold text-[2.5rem] md:text-[3.5rem] mb-16 md:mb-24 text-center flex justify-center flex-wrap"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      />

      <div
        ref={containerRef}
        className="max-w-[1000px] w-full relative"
      >
        {/* Center line (Background) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-white/20 -translate-x-1/2" />

        {/* Animated fill line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-[#533fe7] origin-top -translate-x-1/2 z-10"
          style={{ scaleY }}
        />

        <div className="flex flex-col gap-12 md:gap-8 w-full relative z-20 py-4">
          {processSteps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`flex w-full ${isLeft ? "justify-start" : "justify-end"} items-center relative`}>

                {/* Center Dot */}
                <div className="absolute left-1/2 top-1/2 w-5 h-5 rounded-full bg-[#00ff00] shadow-[0_0_15px_rgba(0,255,0,0.5)] -translate-x-1/2 -translate-y-1/2 z-30" />

                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: "easeOut", type: "spring", bounce: 0.3 }}
                  className="w-[calc(50%-1.5rem)] md:w-[calc(50%-2.5rem)]"
                >
                  <div className="border border-white/20 rounded-[12px] md:rounded-[18px] p-5 md:p-6 bg-black shadow-lg">
                    <span className="block text-[#00ff00] text-xs md:text-sm mb-1 font-semibold tracking-widest uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {step.num}
                    </span>
                    <h3 className="text-white font-bold text-base md:text-[1.25rem] tracking-wide leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {step.title}
                    </h3>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default DesignProcessSection;
