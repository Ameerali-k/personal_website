"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Tutorial } from "@/data/tutorials";
import type { TutorialContent } from "@/data/tutorialContent";

export default function TutorialShareButton({
  tutorialMeta,
  content,
}: {
  tutorialMeta: Tutorial;
  content: TutorialContent;
}) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const firstPartDesc = content?.parts?.[0]?.description || "";
  const shareText = `${tutorialMeta.title}: ${tutorialMeta.description} ${firstPartDesc}`.trim();
  
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(tutorialMeta.title);
  const encodedText = encodeURIComponent(`${shareText}\n\n${shareUrl}`);

  return (
    <>
      <button
        onClick={() => setIsShareOpen(true)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition"
        aria-label="Share Tutorial"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        Share
      </button>

      <AnimatePresence>
        {isShareOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setIsShareOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#121827] text-gray-900 dark:text-white rounded-[24px] p-6 md:p-8 w-full max-w-[440px] relative flex flex-col items-center shadow-2xl border border-gray-100 dark:border-gray-800"
            >
              <button
                onClick={() => setIsShareOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <h3 className="text-xl md:text-2xl font-bold mb-1 tracking-tight text-center" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Share Tutorial
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center mb-5 font-medium">
                Share this tutorial link along with preview content
              </p>

              {/* Preview Box showing tutorial title & first lines */}
              <div className="w-full p-4 rounded-xl mb-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                  {tutorialMeta.category}
                </span>
                <h4 className="text-sm font-bold leading-snug text-gray-900 dark:text-gray-100">
                  {tutorialMeta.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {shareText}
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-5 mb-6">
                <a
                  href={`https://wa.me/?text=${encodedText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="p-2.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 hover:scale-110 transition-transform"
                >
                  <img src="/ri_whatsapp-fill.svg" alt="WhatsApp" className="w-6 h-6" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter / X"
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-110 transition-transform"
                >
                  <img src="/prime_twitter.svg" alt="Twitter" className="w-5 h-5 dark:invert" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-950/50 hover:scale-110 transition-transform"
                >
                  <img src="/mdi_linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-950/50 hover:scale-110 transition-transform"
                >
                  <img src="/ic_baseline-facebook.svg" alt="Facebook" className="w-6 h-6" />
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodedShareUrl}&description=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Pinterest"
                  className="p-2.5 rounded-full bg-red-50 dark:bg-red-950/50 hover:scale-110 transition-transform"
                >
                  <img src="/mdi_pinterest.svg" alt="Pinterest" className="w-6 h-6" />
                </a>
              </div>

              {/* Copy Link Button */}
              <div className="w-full flex justify-center">
                <button
                  className={`w-full py-2.5 border rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    isCopied
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 4000);
                  }}
                >
                  {isCopied ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Link copied to clipboard!
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
