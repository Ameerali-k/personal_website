"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProjectBySlug, hasWordPressEndpoint, type CmsProject } from "../../../lib/wordpress";
import { supabase } from "@/lib/supabase";

export default function ProjectPage() {
  const { slug } = useParams();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [dateStr, setDateStr] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [project, setProject] = useState<any | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);

  const rawSlug = Array.isArray(slug) ? slug[0] : String(slug || "");
  const fallbackTitle = rawSlug.split("-").join(" ").toUpperCase();

  // Ensure scroll is at top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProject() {
      if (!rawSlug) {
        setIsLoadingProject(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", rawSlug)
          .single();

        if (!isMounted) return;

        if (error || !data) {
          // If Supabase fails, try WordPress as fallback or just show empty
          setProject(null);
        } else {
          setProject(data);
          const sourceDate = data.created_at ? new Date(data.created_at) : new Date();
          setDateStr(`${sourceDate.getDate().toString().padStart(2, "0")}/${(sourceDate.getMonth() + 1).toString().padStart(2, "0")}/${sourceDate.getFullYear()}`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoadingProject(false);
      }
    }

    loadProject();
    return () => {
      isMounted = false;
    };
  }, [rawSlug]);

  const title = project?.title?.toUpperCase() || fallbackTitle;
  const displayTitle = title;
  const titleWords = displayTitle.split(" ");
  const overviewText = project?.description || "";

  return (
    <motion.main
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="min-h-screen bg-white w-full overflow-hidden flex flex-col items-center py-20 px-6 relative"
    >
      <Link
        href="/#projects"
        className="absolute top-8 left-8 z-50 flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-[#00ff00] transition-colors rounded-full text-black shadow-sm"
        onMouseEnter={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: { text: "Go back", shape: "circle" } }))}
        onMouseLeave={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: "" }))}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </Link>

      <div className="max-w-[1000px] w-full flex flex-col items-center mt-12">

        {/* Pills & Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          className="flex gap-4 mb-6"
        >
          {(project?.category || "Project").split(',').map((cat: string, i: number) => (
            <div key={i} className="px-5 py-2 bg-[#00ff00] text-black font-semibold rounded-[4px] text-xs md:text-sm shadow-sm tracking-wide">
              {cat.trim()}
            </div>
          ))}
          <button
            onClick={() => setIsShareOpen(true)}
            className="px-5 py-2 bg-white border border-gray-300 text-black font-semibold rounded-[4px] text-xs md:text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm tracking-wide"
            onMouseEnter={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: { text: "Share", shape: "circle" } }))}
            onMouseLeave={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: "" }))}
          >
            Share
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </button>
        </motion.div>

        {/* Title */}
        <h1 className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold text-center leading-[1.1] tracking-tight mb-4 text-black uppercase w-full flex justify-center flex-wrap" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0">
              <motion.span
                className="inline-block origin-bottom-left"
                initial={{ y: "120%", rotateZ: 8, opacity: 0 }}
                animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 1.2 + i * 0.15 }}
                onAnimationComplete={() => {
                  if (i === titleWords.length - 1) {
                    setShowContent(true);
                  }
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center w-full"
            >
              <p className="text-black font-bold tracking-wide mb-24 text-sm md:text-base">
                Published: <span className="font-medium text-gray-700">{dateStr || " "}</span>
              </p>

              {/* Project Overview */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="max-w-[900px] w-full mb-16 px-4"
              >
                <h2 className="text-[1.8rem] md:text-[2.5rem] font-bold text-center mb-6 text-black" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Project Overview
                </h2>
                <p className="text-center text-[#1d2431] leading-relaxed font-medium text-base md:text-[1.1rem]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {overviewText || "No description provided for this project."}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center"
          >
            {/* Portfolio Heading */}
            <h2 className="text-[2.5rem] md:text-[4rem] font-bold text-center leading-[1.1] tracking-tight mb-10 text-black uppercase w-full flex justify-center flex-wrap gap-[0.05em]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {"PORTFOLIO".split("").map((char, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block origin-bottom-left"
                    initial={{ y: "120%", rotateZ: 8, opacity: 0 }}
                    whileInView={{ y: "0%", rotateZ: 0, opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.05 }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Image Gallery / Mockup Wrapper */}
            <div className="w-full max-w-[1300px] flex flex-col gap-8 mb-32">
              {project?.images && Array.isArray(project.images) && project.images.length > 0 ? (
                project.images.map((img: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 * idx }}
                    className="w-full h-auto rounded-[30px] md:rounded-[40px] overflow-hidden border border-black/5 bg-gray-100 flex items-center justify-center p-0 shadow-lg"
                  >
                    <img src={img} alt={`${project?.title} - ${idx + 1}`} className="w-full h-auto object-cover" />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 50 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="w-full h-auto rounded-[30px] md:rounded-[40px] overflow-hidden border border-black/5 bg-gray-100 flex items-center justify-center p-0 shadow-lg"
                >
                  <img src={project?.image_url || "/portfolio.png"} alt={project?.title || "Portfolio"} className="w-full h-auto object-cover" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoadingProject && !project && (
        <p className="text-sm text-red-600 mb-10">Project not found.</p>
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {isShareOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#252525]/90 backdrop-blur-sm px-4"
            onClick={() => setIsShareOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[420px] relative flex flex-col items-center shadow-2xl"
            >
              <h3 className="text-[1.3rem] md:text-[1.4rem] font-bold text-black mb-1 mt-2 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Share Project</h3>
              <p className="text-[#1d2431] text-xs md:text-sm text-center mb-6 font-medium">You can share this project as an embed or via the URL.</p>

              <div className="w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-6 relative border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
                <img
                  src={(project?.images && project.images[0]) || project?.thumbnail_url || project?.image_url || "/portfolio.png"}
                  alt="Project preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-6 mb-8 mt-2">
                <button className="hover:text-gray-500 hover:-translate-y-1 transition-all duration-300">
                  <img src="/mdi_linkedin.svg" alt="LinkedIn" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                </button>
                <button className="hover:text-gray-500 hover:-translate-y-1 transition-all duration-300">
                  <img src="/prime_twitter.svg" alt="Twitter" className="w-5 h-5 grayscale hover:grayscale-0 transition-all" />
                </button>
                <button className="hover:text-gray-500 hover:-translate-y-1 transition-all duration-300">
                  <img src="/mdi_pinterest.svg" alt="Pinterest" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                </button>
                <button className="hover:text-gray-500 hover:-translate-y-1 transition-all duration-300">
                  <img src="/ri_whatsapp-fill.svg" alt="WhatsApp" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                </button>
                <button className="hover:text-gray-500 hover:-translate-y-1 transition-all duration-300">
                  <img src="/ic_baseline-facebook.svg" alt="Facebook" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                </button>
              </div>

              <div className="w-full flex justify-center">
                <button
                  className="w-full max-w-[90%] py-[10px] border border-gray-300 rounded-full font-semibold text-black text-[13px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  Copy Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
