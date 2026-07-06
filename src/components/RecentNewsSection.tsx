"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function AnimatedHeading({ text, className, style }: { text: string, className?: string, style?: any }) {
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
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: word ? '0.25em' : '0' }}>
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

export function RecentNewsSection() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (data && !error) {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-20 overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Background Line - Full Screen Width */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 pointer-events-none">
        <Image
          src="/line.png"
          alt="Decorative Line"
          fill
          sizes="100vw"
          className="object-cover opacity-100"
          priority
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <AnimatedHeading
          text="Recent News"
          className="font-semibold text-center mb-16 md:mb-24 flex justify-center flex-wrap text-black dark:text-white"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
        />

        <div className="relative w-full min-h-[400px] flex items-center justify-center">
          {loading ? (
            <div className="text-black dark:text-white opacity-50 flex items-center justify-center w-full h-full">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="text-black dark:text-white opacity-50 flex items-center justify-center w-full h-full">No recent news found.</div>
          ) : (
            <div className="relative z-10 w-full flex flex-row gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar justify-start">
              {blogs.map((item, index) => (
                <Link href={`/blog/${item.slug}`} key={item.id} className="block group">
                  <motion.div
                    className="relative shrink-0 w-[280px] md:w-[300px] h-[400px] snap-center rounded-[20px] overflow-hidden border-[5px] border-black dark:border-white flex flex-col justify-end p-6 bg-white dark:bg-black"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Full Background Image */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <Image
                        src={item.image_url || "/portfolio.png"}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 280px, 300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-black dark:via-black/80 dark:to-transparent"></div>

                    {/* Content */}
                    <div className="relative z-20 flex flex-col mt-auto pointer-events-none">
                      <h3 className="text-black dark:text-white text-lg font-bold leading-tight uppercase mb-3" title={item.title}>
                        {item.title?.length > 40 ? item.title.substring(0, 40) + '...' : item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-[#d0d0d0] text-xs leading-relaxed mb-6 drop-shadow-md line-clamp-3">
                        {item.description}
                      </p>

                      <div>
                        <div className="pointer-events-auto bg-[#00ff00] hover:bg-[#00cc00] transition-colors text-black text-xs font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-1 cursor-pointer shadow-sm">
                          Visit
                          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
