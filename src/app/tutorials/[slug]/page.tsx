"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getTutorialBySlug } from "@/data/tutorials";

export default function TutorialDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const tutorialMeta = getTutorialBySlug(slug);


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

  const overviewSteps = [
    { num: "01", label: "Install" },
    { num: "02", label: "Initialize" },
    { num: "03", label: "Add API Key" },
    { num: "04", label: "Select Model" },
  ];

  const part1Steps = [
    {
      num: 1,
      title: "Open the OpenCode website",
      text: "",
      node: (
        <>
          Visit{" "}
          <a
            href="https://opencode.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700 transition"
          >
            opencode.ai
          </a>{" "}
          and locate the installation command. You can also use the command shown below.
        </>
      ),
      code: "curl -fsSL https://opencode.ai/install | bash",
    },
    {
      num: 2,
      title: "Run the installation command",
      text: "Open Terminal, paste the command, and press Enter. The installer will download and configure OpenCode on your computer.",
    },
    {
      num: 3,
      title: "Initialize OpenCode",
      text: "After installation finishes, type the following command and press Enter. OpenCode will initialize in the terminal.",
      codeSnippet: "opencode",
    },
    {
      num: 4,
      title: "Open the model list",
      text: "Inside the OpenCode terminal chat, enter the slash command below. This displays the models and providers currently available.",
      codeSnippet: "/models",
    },
  ];

  const part2Steps = [
    {
      num: 5,
      title: "Create or sign in to your NVIDIA account",
      text: "",
      node: (
        <>
          Go to{" "}
          <a
            href="https://build.nvidia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700 transition"
          >
            build.nvidia.com
          </a>{" "}
          and sign up or sign in with your NVIDIA account.
        </>
      ),
    },
    {
      num: 6,
      title: "Filter for free endpoints",
      text: "Open the Models section. In the filters on the left, select Free Endpoint, then apply the filter to display eligible models.",
    },
    {
      num: 7,
      title: "Open your profile",
      text: "Go to your profile menu and select Generate API Key.",
    },
    {
      num: 8,
      title: "Generate the key",
      text: "Enter a recognizable name for the key, such as OpenCode, and generate it.",
    },
    {
      num: 9,
      title: "Copy and store the API key securely",
      text: "Copy the generated API key immediately. Store it in a password manager or another secure location. Do not include it in screenshots, public repositories, or shared documents.",
    },
  ];

  const part3Steps = [
    {
      num: 10,
      title: "Open the model menu again",
      text: "In the OpenCode terminal, type the model command.",
      codeSnippet: "/models",
    },
    {
      num: 11,
      title: "Open provider connections",
      text: "Use the provider connection shortcut shown in OpenCode. In the workflow described here, press Ctrl+A to open Connected Providers.",
    },
    {
      num: 12,
      title: "Find NVIDIA",
      text: "Search for NVIDIA in the provider list, then select NVIDIA.",
    },
    {
      num: 13,
      title: "Enter the API key",
      text: "When the API Key field appears, paste the NVIDIA API key and confirm.",
    },
    {
      num: 14,
      title: "Choose a free NVIDIA model",
      text: "Open /models again. The available NVIDIA models should now appear. Select the model you want to use.",
    },
    {
      num: 15,
      title: "Start using the model",
      text: "Begin a new prompt in OpenCode. Your selected NVIDIA model is now ready to use.",
    },
  ];

  const verificationChecklist = [
    "OpenCode launches when you run opencode.",
    "/models opens the model selection menu.",
    "NVIDIA appears as a connected provider.",
    "Your NVIDIA models are visible in the model list.",
    "A test prompt produces a response without an authentication error.",
  ];

  const commandReference = [
    { command: "curl -fsSL https://opencode.ai/install | bash", purpose: "Install OpenCode" },
    { command: "opencode", purpose: "Start or initialize OpenCode" },
    { command: "/models", purpose: "Open the model and provider menu" },
  ];

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
          <span className="text-blue-600 dark:text-blue-400 font-bold">OpenCode Setup Guide</span>
          <span>OpenCode + NVIDIA Free Models</span>
        </div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-md text-xs font-bold uppercase tracking-wider">
            {tutorialMeta?.category || "OPENCODE"}
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {tutorialMeta?.title || "Install OpenCode and Connect NVIDIA Free Models"}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            {tutorialMeta?.description || "A simple terminal-based setup guide for installing OpenCode, finding available models, and connecting NVIDIA free endpoints."}
          </p>
        </motion.div>

        {/* Overview Steps Grid (01 to 04) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden border bg-blue-50/70 border-blue-200"
        >
          {overviewSteps.map((step, idx) => (
            <div
              key={step.num}
              className={`p-5 text-center flex flex-col justify-center items-center ${
                idx !== overviewSteps.length - 1 ? "border-r border-b md:border-b-0 border-blue-200/60 dark:border-blue-900/40" : ""
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
          <p className="text-sm leading-relaxed">
            You need a terminal, an internet connection, and an NVIDIA account. Never publish or share your API key.
          </p>
        </motion.div>

        {/* Estimated Setup Time */}
        <div className="text-center">
          <span className="inline-block text-blue-600 dark:text-blue-400 font-bold text-base sm:text-lg">
            Estimated setup: {tutorialMeta?.estimatedTime || "5-10 minutes"}
          </span>
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* PART 1 */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Part 1 - Install and Start OpenCode
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
              Follow these steps in your terminal to install OpenCode and view the available models.
            </p>
          </div>

          <div className="space-y-6">
            {part1Steps.map((step) => (
              <div key={step.num} className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-lg sm:text-xl shadow-md">
                  {step.num}
                </div>
                <div className="space-y-2 flex-grow min-w-0">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {step.node ?? step.text}
                  </p>
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

          {/* Tip Callout Box */}
          <div
            className="p-5 rounded-r-lg border-l-4 bg-amber-50 border-amber-500 text-amber-900"
          >
            <h4 className="font-bold text-base text-amber-600 dark:text-amber-400 mb-1">Tip</h4>
            <p className="text-sm leading-relaxed">
              If the opencode command is not recognized, close and reopen Terminal, then run the command again.
            </p>
          </div>
        </section>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* PART 2 */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Part 2 - Create an NVIDIA API Key
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
              Use NVIDIA Build to access models that provide a free endpoint.
            </p>
          </div>

          <div className="space-y-6">
            {part2Steps.map((step) => (
              <div key={step.num} className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-lg sm:text-xl shadow-md">
                  {step.num}
                </div>
                <div className="space-y-1 flex-grow min-w-0">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {step.node ?? step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* PART 3 */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Part 3 - Connect NVIDIA to OpenCode
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
              Return to OpenCode and connect the NVIDIA provider using the API key you generated.
            </p>
          </div>

          <div className="space-y-6">
            {part3Steps.map((step) => (
              <div key={step.num} className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-lg sm:text-xl shadow-md">
                  {step.num}
                </div>
                <div className="space-y-2 flex-grow">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.text}
                  </p>
                  {step.codeSnippet && (
                    <div className="mt-2 inline-flex items-center gap-3 bg-slate-900/90 text-blue-400 px-3 py-1.5 rounded font-mono text-sm border border-slate-800">
                      <span>{step.codeSnippet}</span>
                      <button
                        onClick={() => copyToClipboard(step.codeSnippet!, 300 + step.num)}
                        className="text-xs text-slate-400 hover:text-slate-200 transition"
                      >
                        {copiedIndex === 300 + step.num ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Interface Note Callout Box */}
          <div
            className="p-5 rounded-r-lg border-l-4 bg-emerald-50 border-emerald-500 text-emerald-900"
          >
            <h4 className="font-bold text-base text-emerald-600 dark:text-emerald-400 mb-1">Interface note</h4>
            <p className="text-sm leading-relaxed">
              Keyboard shortcuts and menu labels may change between OpenCode versions. Follow the provider connection instructions displayed in your terminal if they differ from this guide.
            </p>
          </div>
        </section>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Quick Verification Checklist */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Quick Verification Checklist
          </h2>
          <div
            className="p-6 rounded-xl border space-y-3 bg-white border-gray-200 shadow-sm"
          >
            {verificationChecklist.map((item, i) => (
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

        {/* Command Reference Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Command Reference
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1e3a8a] text-white text-sm sm:text-base font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">Command</th>
                  <th className="py-3.5 px-4 sm:px-6">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm sm:text-base">
                {commandReference.map((ref, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-blue-600 dark:text-blue-400 font-medium">
                      {ref.command}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-gray-700 dark:text-gray-300">
                      {ref.purpose}
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
            Setup complete - OpenCode is ready with NVIDIA free models.
          </p>
        </motion.div>

        {/* Footer Document Tag */}
        <div className="pt-8 text-center text-xs text-gray-400 border-t border-gray-200 dark:border-gray-800 pb-12">
          OpenCode + NVIDIA Free Models | Quick Documentation
        </div>
      </div>
    </div>
  );
}
