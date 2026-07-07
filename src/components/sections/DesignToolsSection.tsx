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

/* ─── Design Tools Section ─── */

const toolsList = [
  { name: "Wordpress", icon: "/wordpress.svg", label: "Wordpress" },
  { name: "HTML", icon: "/HTML.svg", label: "HTML" },
  { name: "Java Script", icon: "/Javascript.svg", label: "Java Script" },
  { name: "Framer", icon: "/Framer.svg", label: "Framer" },
  { name: "postgres", icon: "/Postgres.svg", label: "postgres" },
  { name: "CSS", icon: "/CSS.svg", label: "CSS" },
  { name: "indesign", icon: "/indesign.svg", label: "indesign" },
  { name: "Photoshop", icon: "/photoshop.svg", label: "Photoshop" },
  { name: "illustrator", icon: "/illustrator.svg", label: "illustrator" },
  { name: "Premiere Pro", icon: "/premier.svg", label: "Premiere Pro" },
  { name: "Next Js", icon: "/nextjs.svg", label: "Next Js" },
  { name: "React Js", icon: "/react js.svg", label: "React Js" },
  { name: "My SQL", icon: "/mysql.svg", label: "My SQL" },
  { name: "Canva", icon: "/Canva.svg", label: "Canva" },
  { name: "Figma", icon: "/Figma.svg", label: "Figma" },
];

function DesignToolsSection() {
  const isDark = useTheme();
  return (
    <section id="tools" className={`w-full py-24 px-6 flex flex-col items-center overflow-hidden relative transition-colors duration-500 ${isDark ? 'bg-[#0c0e1a]' : 'bg-white'}`}>
      <AnimatedHeading
        text="Tools & Stacks"
        className={`font-semibold text-[2.8rem] md:text-[3.8rem] mb-12 text-center flex justify-center flex-wrap ${isDark ? 'text-white' : 'text-black'}`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      />

      <div className={`max-w-[1200px] w-full overflow-hidden ${isDark ? 'border border-white/20' : 'border border-black'}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {toolsList.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group aspect-square flex flex-col items-center justify-center border transition-colors duration-300 ${isDark ? 'border-white/20 hover:bg-white/5' : 'border-black hover:bg-gray-50'}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center transform active:scale-95 transition-transform duration-300">
                <img src={tool.icon} alt={tool.name} className="w-[85%] h-[85%] object-contain" />
              </div>
              <span className={`font-semibold text-sm md:text-base tracking-tight ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                {tool.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DesignToolsSection;
