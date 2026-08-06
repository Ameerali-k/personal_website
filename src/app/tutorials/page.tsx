"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TUTORIALS } from "@/data/tutorials";

export default function TutorialsIndexPage() {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("site-dark"));

    const handler = (e: Event) => {
      setIsDark((e as CustomEvent).detail.isDark);
    };
    window.addEventListener("siteThemeChange", handler);
    return () => window.removeEventListener("siteThemeChange", handler);
  }, []);

  const filteredTutorials = TUTORIALS.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen py-16 px-4 sm:px-6 lg:px-12 transition-colors duration-500 ${
        isDark ? "bg-[#0c0e1a] text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500/10 text-blue-500 border border-blue-500/20">
            KNOWLEDGE BASE & GUIDES
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Tutorials & Setup Guides
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Step-by-step terminal guides, AI integrations, and modern web development walkthroughs.
          </p>

          {/* Search Input */}
          <div className="pt-4 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-5 py-3.5 pl-11 rounded-xl text-sm border outline-none transition-all ${
                isDark
                  ? "bg-[#141829] border-white/10 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              }`}
            />
            <svg
              className="w-5 h-5 absolute left-3.5 top-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </motion.div>

        {/* Tutorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial, idx) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Link
                href={`/tutorials/${tutorial.slug}`}
                className={`group flex flex-col h-full rounded-2xl p-7 border transition-all duration-300 relative overflow-hidden ${
                  isDark
                    ? "bg-[#121629]/90 border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
                    : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-500/40"
                }`}
              >
                {/* Category Badge & Time Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-blue-600/10 text-blue-500 border border-blue-500/20">
                    {tutorial.category}
                  </span>
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    ⏱️ {tutorial.estimatedTime}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors leading-snug"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {tutorial.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-6 flex-grow">
                  {tutorial.description}
                </p>

                {/* Card Footer Action */}
                <div className="pt-4 border-t border-white/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-gray-400">
                  <span>{tutorial.date}</span>
                  <span className="text-blue-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Tutorial
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tutorials found matching "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
}
