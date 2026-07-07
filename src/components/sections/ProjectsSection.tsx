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

/* ─── Projects Section ─── */
interface SupabaseProject {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  slug: string;
}

const fallbackProjects: any[] = [
  { id: 1, slug: "branding", title: "Branding", category: "Branding", description: "", image_url: "/branding.svg" },
  { id: 2, slug: "web-design-development", title: "Web Design & Development", category: "Web Design", description: "", image_url: "/Web design.svg" },
  { id: 3, slug: "graphic-designing", title: "Graphic Designing", category: "Graphic Design", description: "", image_url: "/Graphic design.svg" },
  { id: 4, slug: "motion-graphics", title: "Motion Graphics", category: "Motion Graphics", description: "", image_url: "/motion graphics.svg" },
  { id: 5, slug: "presentation-design", title: "Presentation Design", category: "Presentation", description: "", image_url: "/presentation design.svg" },
  { id: 6, slug: "packaging", title: "Packaging", category: "Packaging", description: "", image_url: "/packaging.svg" },
  { id: 7, slug: "video-editing", title: "Video Editing", category: "Video Editing", description: "", image_url: "/video editing.svg" },
];

function ProjectCard({ project, index, scrollYProgress, totalProjects }: { project: any; index: number; scrollYProgress: any, totalProjects: number }) {
  const isDark = useTheme();
  const start = index / totalProjects;
  const end = (index + 1) / totalProjects;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Create a transform for each card's scale based on its position in the scroll
  // We want the card to scale down slightly as we scroll further past it
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.95]);

  return (
    <motion.div
      style={{
        scale,
        top: `calc(15vh + ${index * 40}px)`,
        zIndex: index
      }}
      onMouseMove={handleMouseMove}
      className="sticky w-full max-w-[1100px] mx-auto mb-[15vh] group"
    >
      <a
        href={`/projects/${project.slug}`}
        className={`block relative w-full lg:h-[450px] rounded-2xl overflow-hidden flex flex-col lg:flex-row border shadow-2xl transition-all duration-500 cursor-none ${isDark
          ? "bg-[#2D2D36] border-white/10"
          : "bg-[#f5f5f7] border-black/5"
          }`}
        data-cursor-text="Explore"
        data-cursor-shape="circle"
        onMouseEnter={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: { text: "Explore", shape: "circle" } }))}
        onMouseLeave={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: "" }))}
      >
        {/* Blob Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                ${isDark ? 'rgba(0, 255, 0, 0.15)' : 'rgba(83, 63, 231, 0.1)'},
                transparent 80%
              )
            `,
          }}
        />
        {/* Content Side */}
        <div className={`w-full lg:w-[50%] flex flex-col justify-center py-5 pl-5 pr-4 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative z-10`}>
          <div className="flex flex-wrap gap-3 mb-6">
            {(project.category || "Project").split(',').map((cat: string, i: number) => (
              <span key={i} className="bg-[#00ff00] text-black text-xs md:text-sm font-bold px-4 py-1.5 rounded-full">
                {cat.trim()}
              </span>
            ))}
          </div>

          <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
            {project.title}
          </h3>

          <p className={`text-base md:text-lg mb-8 leading-relaxed font-sans ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {(() => {
              const desc = project.description || "Portfolio project showcasing expertise in design and development.";
              const words = desc.split(/\s+/);
              if (words.length > 30) {
                return words.slice(0, 30).join(' ') + '...';
              }
              return desc;
            })()}
          </p>

          <div className="mt-auto">
            <div className={`inline-flex items-center gap-2 font-bold text-lg px-8 py-3 rounded-lg transition-all ${isDark
              ? "bg-gradient-to-r from-[#00ff22] to-[#00cc11] text-black shadow-[0_0_20px_rgba(0,255,0,0.3)] group-hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
              : "bg-black text-white shadow-lg group-hover:bg-[#533fe7]"
              }`}>
              View Project
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className={`w-full lg:w-[50%] lg:h-full flex items-center justify-center p-4 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} z-10`}>
          <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-0 rounded-2xl overflow-hidden">
            <Image
              src={project.image_url || "/branding.svg"}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </a>
    </motion.div>
  );
}

function ProjectsSection() {
  const isDark = useTheme();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true });

        if (!isMounted) return;

        if (error) {
          setProjects(fallbackProjects);
        } else if (!data || data.length === 0) {
          setProjects([]);
        } else {
          setProjects(data);
        }
      } catch (err) {
        if (isMounted) setProjects(fallbackProjects);
      } finally {
        if (isMounted) setIsLoadingProjects(false);
      }
    }

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className={`relative transition-colors duration-500 ${isDark ? 'bg-[#0c0e1a]' : 'bg-white'}`}
      style={{ minHeight: projects.length > 0 ? `${projects.length * 80}vh` : 'auto' }}
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 pt-16 md:pt-24 mb-16 text-center">
        <AnimatedHeading
          text="Handpicked Projects"
          className={`font-semibold text-[2.5rem] md:text-[3.2rem] mb-6 max-w-[800px] mx-auto flex justify-center flex-wrap ${isDark ? 'text-white' : 'text-black'}`}
          style={{ fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}
        />
        <p className={`font-medium text-[1.05rem] md:text-[1.2rem] leading-relaxed mx-auto max-w-[800px] ${isDark ? 'text-white/60' : 'text-[#1d2431]'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
          Explore my portfolio to see a blend of graphic design, motion, video editing, and web experiences. Each project reflects creativity, precision, and user-focused design.
        </p>
      </div>

      <div className="w-full relative px-6 md:px-10">
        {isLoadingProjects ? (
          <div className="flex flex-col items-center gap-6 mb-20 mt-4" aria-busy="true" aria-label="Loading projects">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`w-full max-w-[1200px] rounded-[32px] md:rounded-[40px] overflow-hidden animate-pulse ${isDark ? 'bg-white/5' : 'bg-black/5'}`} style={{ height: '420px' }} />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="flex flex-col items-center">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                scrollYProgress={scrollYProgress}
                totalProjects={projects.length}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 md:p-20 bg-white/5 border border-dashed border-white/10 rounded-[40px] mb-20 md:mb-32 mt-10"
          >
            <p className={`text-xl md:text-3xl font-medium tracking-tight opacity-50 ${isDark ? "text-white" : "text-black"}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
              Portfolio coming soon
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
export default ProjectsSection;
