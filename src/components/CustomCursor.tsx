"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "motion/react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 32, stiffness: 350, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorTextState] = useState("");
  const [cursorShape, setCursorShape] = useState<"circle" | "rounded">("circle");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    const handleSetText = (e: any) => {
      if (typeof e.detail === "object" && e.detail !== null) {
        setCursorTextState(e.detail.text || "");
        setCursorShape(e.detail.shape || "circle");
      } else {
        setCursorTextState(e.detail || "");
        setCursorShape("circle");
      }
    };
    const handleScroll = () => {
      setIsHovering(false);
      setCursorTextState("");
    };
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("setCursorText", handleSetText);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("setCursorText", handleSetText);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center bg-[#00ff00] pointer-events-none overflow-hidden z-[10000] whitespace-nowrap shadow-lg"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={false}
        animate={{
          width: cursorText ? "auto" : "16px",
          height: cursorText ? "auto" : "16px",
          minWidth: cursorText && cursorShape === "circle" ? "95px" : "auto",
          minHeight: cursorText && cursorShape === "circle" ? "95px" : "auto",
          padding: cursorText ? (cursorShape === "circle" ? "0px" : "13px 20px") : "0px",
          borderRadius: cursorText ? (cursorShape === "circle" ? "50%" : "12px") : "50%",
          scale: isHovering && !cursorText ? 1.5 : 1,
        }}
        transition={{ 
          duration: 0.25, 
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <AnimatePresence mode="wait">
          {cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="text-black font-extrabold text-[0.8rem] tracking-widest uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
