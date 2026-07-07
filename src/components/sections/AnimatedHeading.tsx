"use client";
import { motion } from "motion/react";

/* ─── Animated Section Heading ─── */
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
export default AnimatedHeading;
