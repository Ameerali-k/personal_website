"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getTutorialBySlug } from "@/data/tutorials";
import { TUTORIAL_CONTENTS } from "@/data/tutorialContent";

export default function TutorialDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const tutorialMeta = getTutorialBySlug(slug);
  const content = TUTORIAL_CONTENTS[slug];

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!tutorialMeta || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
        <h1 className="text-2xl font-bold mb-4">Tutorial Not Found</h1>
        <Link
          href="/tutorials"
          className="text-blue-600 hover:underline inline-flex items-center gap-2 font-semibold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Tutorials
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-white text-gray-900"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Back Link */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Tutorials
        </Link>
      </div>

      {/* Main Standalone Document Container */}
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Document Header Tag & Top Meta */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 border-b pb-3 border-gray-200">
          <span className="text-blue-600 dark:text-blue-400 font-bold">{content.headerTag}</span>
          <span>{content.headerMeta}</span>
        </div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-md text-xs font-bold uppercase tracking-wider">
            {tutorialMeta.category}
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {tutorialMeta.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            {tutorialMeta.description}
          </p>
        </motion.div>

        {/* Overview Steps Grid (01 to 04) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden border bg-blue-50/70 border-blue-200"
        >
          {content.overviewSteps.map((step, idx) => (
            <div
              key={step.num}
              className={`p-5 text-center flex flex-col justify-center items-center ${
                idx !== content.overviewSteps.length - 1 ? "border-r border-b md:border-b-0 border-blue-200/60 dark:border-blue-900/40" : ""
              }`}
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {step.num}
              </span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-1">
                {step.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Before You Begin Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-5 rounded-r-lg border-l-4 bg-slate-100 border-slate-700 text-slate-900"
        >
          <h4 className="font-bold text-base mb-1">Before you begin</h4>
          <div className="text-sm leading-relaxed">
            {content.beforeYouBegin}
          </div>
        </motion.div>

        {/* Estimated Setup Time */}
        <div className="text-center">
          <span className="inline-block text-blue-600 dark:text-blue-400 font-bold text-base sm:text-lg">
            Estimated setup: {tutorialMeta.estimatedTime}
          </span>
        </div>

        {content.parts.map((part, partIdx) => (
          <React.Fragment key={partIdx}>
            <hr className="border-gray-200 dark:border-gray-800" />
            
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {part.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
                  {part.description}
                </p>
              </div>

              <div className="space-y-6">
                {part.steps.map((step) => (
                  <div key={step.num} className="flex gap-4 sm:gap-6 items-start">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-lg sm:text-xl shadow-md">
                      {step.num}
                    </div>
                    <div className="space-y-2 flex-grow min-w-0">
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      {(step.node || step.text) && (
                        <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {step.node ?? step.text}
                        </div>
                      )}
                      {step.code && (
                        <div className="relative mt-2">
                          <pre className="bg-[#0f172a] text-blue-400 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-slate-800 shadow-inner">
                            <code>{step.code}</code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(step.code!, 101)}
                            className="absolute right-3 top-3 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
                          >
                            {copiedIndex === 101 ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      )}
                      {step.codeSnippet && (
                        <div className="mt-2 inline-flex items-center gap-3 bg-slate-900/90 text-blue-400 px-3 py-1.5 rounded font-mono text-sm border border-slate-800">
                          <span>{step.codeSnippet}</span>
                          <button
                            onClick={() => copyToClipboard(step.codeSnippet!, 100 + step.num)}
                            className="text-xs text-slate-400 hover:text-slate-200 transition"
                          >
                            {copiedIndex === 100 + step.num ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips / Callouts based on index and presence */}
              {partIdx === 0 && content.tipCallout && (
                <div className="p-5 rounded-r-lg border-l-4 bg-amber-50 border-amber-500 text-amber-900">
                  <h4 className="font-bold text-base text-amber-600 dark:text-amber-400 mb-1">
                    {content.tipCallout.title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {content.tipCallout.text}
                  </p>
                </div>
              )}

              {partIdx === content.parts.length - 1 && content.interfaceNoteCallout && (
                <div className="p-5 rounded-r-lg border-l-4 bg-emerald-50 border-emerald-500 text-emerald-900">
                  <h4 className="font-bold text-base text-emerald-600 dark:text-emerald-400 mb-1">
                    {content.interfaceNoteCallout.title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {content.interfaceNoteCallout.text}
                  </p>
                </div>
              )}
            </section>
          </React.Fragment>
        ))}

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Quick Verification Checklist */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Quick Verification Checklist
          </h2>
          <div
            className="p-6 rounded-xl border space-y-3 bg-white border-gray-200 shadow-sm"
          >
            {content.verificationChecklist.map((item, i) => (
              <label
                key={i}
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => toggleCheck(i)}
              >
                <input
                  type="checkbox"
                  checked={!!checkedItems[i]}
                  onChange={() => {}}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span
                  className={`text-sm sm:text-base leading-relaxed ${
                    checkedItems[i]
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {item}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Reference Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {content.referenceTable.headers[0] === "Command" ? "Command Reference" : "Configuration Reference"}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1e3a8a] text-white text-sm sm:text-base font-semibold">
                  {content.referenceTable.headers.map((h, i) => (
                    <th key={i} className="py-3.5 px-4 sm:px-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm sm:text-base">
                {content.referenceTable.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-blue-600 dark:text-blue-400 font-medium">
                      {row.col1}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-gray-700 dark:text-gray-300">
                      {row.col2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Completion Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 text-center rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60"
        >
          <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            {content.completionText}
          </p>
        </motion.div>

        {/* Footer Document Tag */}
        <div className="pt-8 text-center text-xs text-gray-400 border-t border-gray-200 dark:border-gray-800 pb-12">
          {content.footerTag}
        </div>
      </div>
    </div>
  );
}
