"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BlogShareButton({ 
  blog 
}: { 
  blog: { title: string; image_url: string; slug: string } 
}) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog.title);

  return (
    <>
      <button
        onClick={() => setIsShareOpen(true)}
        className="w-12 h-12 bg-[#f2f2f2] dark:bg-white/10 hover:bg-[#00ff00] hover:text-black dark:hover:bg-[#00ff00] dark:hover:text-black rounded-full flex items-center justify-center transition-colors text-black dark:text-white"
        aria-label="Share"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      </button>

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
              <h3 className="text-[1.3rem] md:text-[1.4rem] font-bold text-black mb-1 mt-2 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Share Blog Post</h3>
              <p className="text-[#1d2431] text-xs md:text-sm text-center mb-6 font-medium">You can share this post as an embed or via the URL.</p>

              <div className="w-full aspect-[16/10] rounded-[16px] overflow-hidden mb-6 relative border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
                <img
                  src={blog.image_url || "/portfolio.png"}
                  alt="Blog preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-6 mb-8 mt-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="hover:-translate-y-1 transition-all duration-300"
                >
                  <img src="/mdi_linkedin.svg" alt="" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="hover:-translate-y-1 transition-all duration-300"
                >
                  <img src="/prime_twitter.svg" alt="" className="w-5 h-5 grayscale hover:grayscale-0 transition-all" />
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Pinterest"
                  className="hover:-translate-y-1 transition-all duration-300"
                >
                  <img src="/mdi_pinterest.svg" alt="" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodedTitle}%20${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="hover:-translate-y-1 transition-all duration-300"
                >
                  <img src="/ri_whatsapp-fill.svg" alt="" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="hover:-translate-y-1 transition-all duration-300"
                >
                  <img src="/ic_baseline-facebook.svg" alt="" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
                </a>
              </div>

              <div className="w-full flex justify-center">
                <button
                  className={`w-full max-w-[90%] py-[10px] border rounded-full font-semibold text-[13px] flex items-center justify-center gap-2 transition-all duration-300 ${
                    isCopied
                      ? "border-[#00ff00] bg-[#00ff00]/10 text-[#00a800]"
                      : "border-gray-300 text-black hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 10000);
                  }}
                >
                  {isCopied ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Link copied
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
