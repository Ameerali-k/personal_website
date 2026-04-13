"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const reviews = [
  "Absolutely impressed with the creativity and attention to detail. The website design was clean, modern, and exactly what we needed.",
  "Delivered beyond expectations! The graphics were visually stunning and perfectly aligned with our brand identity.",
  "Very professional and easy to work with. The presentation design helped us win a major client.",
  "Quick turnaround and high-quality work. The designs were both functional and beautiful.",
  "Exceptional creativity! The final output looked premium and really elevated our brand image.",
  "Great communication and understanding of requirements. The website design was smooth and user-friendly.",
  "The presentation slides were engaging and visually appealing. It made our pitch stand out.",
  "Highly skilled designer. Every detail in the graphics was thoughtfully crafted.",
  "Delivered a modern and responsive website that works perfectly across all devices.",
  "Very creative approach to design. The branding and visuals were fresh and unique.",
  "Reliable and professional. Completed the project on time with excellent quality.",
  "The designs were not only attractive but also strategic in terms of user experience.",
  "Loved the minimal and clean design style. Exactly what we were looking for.",
  "Transformed our ideas into beautiful visuals. The presentation design was top-notch.",
  "One of the best designers we’ve worked with. Highly recommended for web and graphic design projects."
];

const names = [
  "Sarah Jenkins", "Michael Chen", "Emma Watson", "David Rodriguez", "Jessica Smith",
  "Robert Johnson", "Sophia Lee", "William Turner", "Olivia Davis", "Daniel White",
  "Emily Harris", "James Martin", "Mia Thompson", "Alexander Garcia", "Charlotte Clark"
];

// Random country codes
const countryCodes = [
  "us", "gb", "ca", "au", "de", 
  "fr", "ae", "es", "ch", "in", 
  "jp", "sg", "it", "za", "mx"
];

// 3 to 5 stars mix
const starMix = [5, 5, 4, 5, 5, 4, 5, 4, 5, 3, 5, 4, 5, 5, 5];

const testimonialsData = reviews.map((text, i) => ({
  id: i,
  name: names[i],
  text: text,
  stars: starMix[i],
  image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 15}.jpg`,
  flag: `https://flagcdn.com/w40/${countryCodes[i]}.png`
}));

// Split into 3 rows and double them for longer scroll area without gaps
const row1Data = [...testimonialsData.slice(0, 5), ...testimonialsData.slice(0, 5)];
const row2Data = [...testimonialsData.slice(5, 10), ...testimonialsData.slice(5, 10)];
const row3Data = [...testimonialsData.slice(10, 15), ...testimonialsData.slice(10, 15)];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-4 h-4 md:w-5 md:h-5 ${s <= stars ? 'text-[#00ff00]' : 'text-gray-400/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ card, isDark }: { card: any, isDark: boolean }) {
  return (
    <div className={`p-6 md:p-8 rounded-[24px] border w-[320px] md:w-[480px] shrink-0 flex flex-col gap-4 ${isDark ? 'border-white/20 bg-transparent' : 'border-black/20 bg-transparent'}`}>
      <div className="flex items-center gap-4">
        <div className="relative isolate">
          <img src={card.image} alt={card.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover bg-gray-200" />
          <img 
            src={card.flag} 
            alt="Flag" 
            className={`absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] md:w-5 md:h-5 rounded-full object-cover border-[1.5px] shadow-sm z-10 ${isDark ? 'border-[#0c0e1a]' : 'border-white'}`} 
          />
        </div>
        <div>
          <h3 className={`font-bold text-xl md:text-[1.5rem] leading-tight ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>{card.name}</h3>
          <StarRating stars={card.stars} />
        </div>
      </div>
      <p className={`text-sm md:text-[1.1rem] leading-relaxed ${isDark ? 'text-white/80' : 'text-black/80'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
        "{card.text}"
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  const [isDark, setIsDark] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('site-dark'));
    const handler = (e: Event) => {
      setIsDark((e as CustomEvent).detail.isDark);
    };
    window.addEventListener('siteThemeChange', handler);
    return () => window.removeEventListener('siteThemeChange', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const row1X = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const row2X = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
  const row3X = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

  return (
    <section 
      ref={containerRef} 
      className={`relative w-full py-24 md:py-32 overflow-hidden transition-colors duration-500 border-t ${isDark ? 'bg-[#0c0e1a] border-white/10' : 'bg-white border-gray-100'}`}
    >
      <AnimatedHeading
        text="What My Clients Say"
        className={`font-semibold text-center mb-16 md:mb-24 flex justify-center flex-wrap ${isDark ? 'text-white' : 'text-black'}`}
        style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
      />

      <div className="flex flex-col gap-6 md:gap-8 overflow-hidden w-full relative z-10">
        
        {/* Row 1 */}
        <motion.div style={{ x: row1X }} className="flex gap-6 md:gap-8 w-max pl-[10vw]">
          {row1Data.map((card, i) => (
            <TestimonialCard key={`r1-${i}`} card={card} isDark={isDark} />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: row2X }} className="flex gap-6 md:gap-8 w-max pl-[5vw]">
          {row2Data.map((card, i) => (
            <TestimonialCard key={`r2-${i}`} card={card} isDark={isDark} />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div style={{ x: row3X }} className="flex gap-6 md:gap-8 w-max pl-[0vw]">
          {row3Data.map((card, i) => (
            <TestimonialCard key={`r3-${i}`} card={card} isDark={isDark} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
