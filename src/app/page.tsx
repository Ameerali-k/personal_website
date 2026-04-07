"use client";
import { useEffect, useState, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate, useMotionValue, useSpring } from "motion/react";
import imgWhatsApp from "figma:asset/2c5a6bc55984a9012693543c79e3a6248281632d.png";
import imgEllipse5 from "figma:asset/3a5b038a420d2522f2cc87574955419af25bf13c.png";
import imgEllipse6 from "figma:asset/438d2dc6e54ddcf05c803936cd7b8a7d8f1d9a0b.png";
import imgEllipse7 from "figma:asset/85314c3bcc3ccdce33317a4411ce06eacb7be7dd.png";
import imgEllipse8 from "figma:asset/0119b0c1a6625f13ae62461589cf4046baf417cd.png";
import imgClapping from "figma:asset/e80ce3c7e8b21c57c9d75d726b350ff4f9b5b9ce.png";
import imgLogoAvatar from "figma:asset/67b3b0749a2c1ad0580b543246a797b39269c8a6.png";

// ─── Theme Context ───
const ThemeContext = createContext<boolean>(true); // default dark
function useTheme() { return useContext(ThemeContext); }

// Roles that cycle every 3 seconds
const roles = [
  "Graphic Designer",
  "Video Editor",
  "UI/UX Designer",
  "Motion Graphist",
  "Web Developer",
  "Brand Strategist",
];

// Skill items for the marquee strip
const skills = [
  "Graphic Designer",
  "Web Development",
  "Ui/Ux Design",
  "Video Editing",
  "Motion Graphics",
  "Branding",
];

/* ─── Software Logos ─── */
function LogoPs() {
  return (
    <div className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-[0.7rem] overflow-hidden border-[2px] border-[#31A8FF] shadow-[0_0_20px_rgba(49,168,255,0.6)] bg-transparent">
      <img src="/photoshop.svg" alt="Photoshop" className="w-full h-full object-contain" />
    </div>
  );
}

function LogoAi() {
  return (
    <div className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-[0.7rem] overflow-hidden border-[2px] border-[#FF9A00] shadow-[0_0_20px_rgba(255,154,0,0.6)] bg-transparent">
      <img src="/illustrator.svg" alt="Illustrator" className="w-full h-full object-contain" />
    </div>
  );
}

function LogoPr() {
  return (
    <div className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-[0.7rem] overflow-hidden border-[2px] border-[#E983FF] shadow-[0_0_20px_rgba(233,131,255,0.6)] bg-transparent">
      <img src="/premier.svg" alt="Premiere" className="w-full h-full object-contain" />
    </div>
  );
}

function LogoAe() {
  return (
    <div className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-[0.7rem] overflow-hidden border-[2px] border-[#9999FF] shadow-[0_0_20px_rgba(153,153,255,0.6)] bg-transparent">
      <img src="/aftereffects.svg" alt="After Effects" className="w-full h-full object-contain" />
    </div>
  );
}

function LogoNext() {
  return (
    <div className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-full overflow-hidden border-[2px] border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.6)] bg-transparent">
      <img src="/nextjs.svg" alt="Next.js" className="w-full h-full object-contain" />
    </div>
  );
}

function LogoTailwind() {
  return (
    <div className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-full overflow-hidden border-[2px] border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.6)] bg-transparent">
      <img src="/tailwind.svg" alt="Tailwind CSS" className="w-full h-full object-contain" />
    </div>
  );
}

function LogoMysql() {
  return (
    <div className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-[0.7rem] overflow-hidden border-[2px] border-[#00758F] shadow-[0_0_20px_rgba(0,117,143,0.6)] bg-transparent">
      <img src="/mysql.svg" alt="MySQL" className="w-[85%] h-[85%] object-contain p-1" />
    </div>
  );
}

function LogoReact() {
  return (
    <div className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-[0.7rem] overflow-hidden border-[2px] border-[#61DAFB] shadow-[0_0_20px_rgba(97,218,251,0.6)] bg-transparent">
      <img src="/react js.svg" alt="React JSX" className="w-[85%] h-[85%] object-contain p-1" />
    </div>
  );
}

/* ─── Animated Role Heading ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  },
  exit: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 }
  }
};

const wordVariants = {
  hidden: { y: "110%", opacity: 0, rotateX: -30 },
  visible: {
    y: "0%", opacity: 1, rotateX: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }
  },
  exit: {
    y: "-110%", opacity: 0, rotateX: 30,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }
  }
};

function AnimatedRole() {
  const isDark = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative overflow-hidden flex justify-center items-center w-full"
      style={{ height: "clamp(3rem, 10.5vw, 9.5rem)" }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={roles[index]}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="uppercase absolute flex gap-[0.3em] transition-colors duration-500"
          style={{
            fontFamily: "'Nova Square', sans-serif",
            fontSize: "clamp(1.4rem, 7.5vw, 8rem)",
            letterSpacing: "0.02em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            color: isDark ? "rgba(235, 235, 240, 0.92)" : "#3b3b3b",
          }}
        >
          {roles[index].split(' ').map((word, i) => (
            <div key={i} className="overflow-hidden inline-flex">
              <motion.span variants={wordVariants} style={{ display: "inline-block" }}>
                {word}
              </motion.span>
            </div>
          ))}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

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

/* ─── Marquee Star ─── */
function SkillStar() {
  return (
    <svg width="26" height="32" viewBox="0 0 26 32" fill="none" className="shrink-0">
      <g clipPath="url(#clip-star)">
        <path
          d="M11.6999 19.0569V28.6667H14.2999V19.0589L21.2722 25.8523L23.1106 24.061L16.1375 17.2667H25.9986V14.7333H16.1373L23.1105 7.939L21.272 6.14765L14.2999 12.9409V3.33333H11.6999V12.9429L4.7259 6.14764L2.88742 7.939L9.86057 14.7333H-0.00133635V17.2667H9.86036L2.88722 24.061L4.7257 25.8523L11.6999 19.0569Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip-star">
          <rect width="26" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ─── Skills Marquee Strip ─── */
function SkillsStrip() {
  return (
    <div
      className="relative z-30 w-full overflow-hidden py-5"
      style={{ background: "linear-gradient(to right, #00ff00, #02ff8c)" }}
    >
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0 mx-8">
            <span
              className="shrink-0"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1.4rem", color: "#000" }}
            >
              {skill}
            </span>
            <SkillStar />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Circular "Create More" Badge ─── */
function CircularText() {
  return (
    <div className="relative w-[155px] h-[155px]">
      <motion.img
        src="/Round.png"
        alt="Create More Think Less"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[89px] h-[89px] rounded-full bg-transparent shadow-none" />
      </div>
    </div>
  );
}

/* ─── Purple Wave ─── */
function WaveShape() {
  return (
    <div className="absolute bottom-0 pointer-events-none" style={{ left: "-5%", right: "-5%", width: "110%", height: "300px" }}>
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1920 276"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M150.79 71.4654C80.2604 94.1568 0 276.374 0 276.374H1866.19C1866.19 276.374 1987.85 141.002 1866.19 44.8432C1680.1 -102.228 1456.82 159.744 1287.54 157.487C1160.52 155.794 1097.69 77.2237 970.803 83.3906C865.624 88.5028 746.898 149.381 608.815 157.487C412.787 168.996 270.88 32.8288 150.79 71.4654Z"
          fill="#533FE7"
        />
      </svg>
      <svg
        className="absolute bottom-[18px] w-full h-full"
        viewBox="0 0 1921 277"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M151.556 71.9658C81.027 94.6572 0.766587 276.874 0.766587 276.874H1866.95C1866.95 276.874 1988.62 141.502 1866.95 45.3436C1680.87 -101.728 1457.59 160.244 1288.3 157.988C1161.28 156.295 1098.45 77.7241 971.57 83.891C866.39 89.0032 747.665 149.881 609.581 157.988C413.553 169.496 271.647 33.3291 151.556 71.9658Z"
          stroke="#533FE7"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const isDark = useTheme();
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 200]);
  const yLeft = useTransform(scrollY, [0, 800], [0, -150]);
  const yRight = useTransform(scrollY, [0, 800], [0, -250]);

  return (
    <section
      id="home"
      className={`relative w-screen max-w-[1728px] mx-auto overflow-x-visible transition-all duration-500 ${isDark
        ? 'bg-gradient-to-br from-[#002a11] via-[#001709] to-[#000a04]'
        : 'bg-[#f7f7f7]'
        }`}
      style={{ minHeight: "calc(100vh - 50px)", marginTop: "-80px", paddingTop: "80px" }}
    >
      {/* Grid Background Overlay */}
      {isDark && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      )}

      {/* Hero content */}
      <motion.div style={{ y: yText }} className="relative z-10 flex flex-col items-center pt-14 pb-[50px] px-4 text-center">
        {/* Subtitle */}
        <div className="flex items-center gap-2 mb-4">
          <img src={String((imgClapping as any).src || imgClapping)} alt="clapping" className="w-7 h-7 md:w-10 md:h-10 object-contain" />
          <p
            className={isDark ? "text-white/80" : "text-[#1d2431]"}
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "clamp(1.1rem, 2.5vw, 1.9rem)", letterSpacing: "-0.02em" }}
          >
            My name is Ameerali, I am a
          </p>
        </div>

        {/* ✦ Animated role heading ✦ */}
        <AnimatedRole />
      </motion.div>

      {/* Person photo with Hover Hover-Logos */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20 cursor-pointer overflow-visible"
        style={{
          bottom: 0,
          width: "clamp(260px, 28vw, 500px)",
          height: "clamp(320px, 38vw, 580px)",
        }}
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Animated Logos Behind Profile Photo (90 degree horizontal arrangement) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {(() => {
            const icons = [LogoPs, LogoAi, LogoPr, LogoAe, LogoNext, LogoReact, LogoTailwind, LogoMysql];
            return icons.map((Icon, i) => {
              // Arrange in two sides (left and right) to leave a gap in the middle
              let hoverLeft;
              if (i < 4) {
                // Left group, space by 15%
                hoverLeft = -25 + (i * 15);
              } else {
                // Right group, space by 15% starting at 80%
                hoverLeft = 80 + ((i - 4) * 15);
              }
              const hoverTop = "calc(15% + 200px)"; // Shifted 200px down as requested

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ x: "-50%", y: "-50%" }}
                  variants={{
                    rest: { opacity: 0, left: "50%", top: "80%", scale: 0.2 },
                    hover: { opacity: 1, left: `${hoverLeft}%`, top: hoverTop, scale: 0.75 }
                  }}
                  transition={{ type: "spring", stiffness: 80, damping: 10, delay: i * 0.1 }}
                >
                  <Icon />
                </motion.div>
              );
            });
          })()}
        </div>

        {/* Foreground Photo */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" style={{ bottom: 0 }}>
          <img
            src={String((imgWhatsApp as any).src || imgWhatsApp)}
            alt="Ameerali"
            className="w-full h-full object-cover object-top"
            style={{ filter: "grayscale(100%)" }}
          />
        </div>
      </motion.div>

      {/* Circular text badge */}
      <motion.div style={{ y: yLeft }} className="absolute left-[5%] top-[calc(40%+80px)] -translate-y-1/2 z-10 hidden md:block">
        <CircularText />
      </motion.div>

      {/* 100+ Clients */}
      <motion.div style={{ y: yRight }} className="absolute right-[5%] top-[calc(42%+80px)] -translate-y-1/2 z-10 hidden md:flex items-center gap-4">
        <div className="text-right">
          <p
            className={isDark ? "text-white" : "text-black"}
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: "2.1rem", letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            100<span style={{ fontSize: "1.25rem" }}>+</span>
          </p>
          <p
            className={isDark ? "text-white/70" : "text-black"}
            style={{ fontFamily: "'Sora', sans-serif", fontSize: "0.875rem", letterSpacing: "-0.035em" }}
          >
            Clients
          </p>
        </div>
        <div className="flex items-center">
          {[imgEllipse5, imgEllipse6, imgEllipse7, imgEllipse8].map((src, i) => (
            <img
              key={i}
              src={String((src as any).src || src)}
              alt={`Client ${i + 1}`}
              className="w-14 h-14 rounded-full border-2 border-white object-cover"
              style={{ marginLeft: i === 0 ? 0 : "-18px" }}
            />
          ))}
        </div>
      </motion.div>

      <WaveShape />
    </section>
  );
}

/* ─── Stats Section ─── */
const statsData = [
  { num: 200, suffix: "+", label: "Projects Completed" },
  { num: 100, suffix: "+", label: "Happy Clients" },
  { num: 7, suffix: "+", label: "Years of Experience" },
  { num: 15, suffix: "+", label: "Countries Served" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = Math.round(val).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [to, isInView]);

  return <span ref={ref}>0</span>;
}

function StatsSection() {
  const isDark = useTheme();
  return (
    <section className={`w-full py-24 md:py-32 px-6 relative z-10 border-t transition-colors duration-500 ${isDark ? 'bg-[#0c0e1a] border-white/10' : 'bg-white border-gray-100'}`}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
          >
            <h3
              className="font-medium bg-gradient-to-b from-[#533FE7] to-[#00ff00] bg-clip-text text-transparent"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(3.5rem, 6vw, 5rem)", lineHeight: 1, letterSpacing: "-0.03em", width: "fit-content", margin: "0 auto", fontWeight: 600 }}
            >
              <Counter to={stat.num} />
              {stat.suffix}
            </h3>
            <p
              className={isDark ? "text-white/70 mt-3" : "text-[#1d2431] mt-3"}
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── About Section ─── */
const aboutText = "Multidisciplinary Senior Multimedia Graphic Designer with seven years of experience in brand identity, exhibition design, and front-end web development across UAE and India. Successfully delivered on-site branding for major government events, led packaging design for medical products meeting regulatory standards, and optimized eCommerce platforms to enhance performance. Holds an MBA in Marketing and Finance, combining creative expertise with commercial strategy to deliver efficient business solutions.";

function ScrollWord({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) {
  const isDark = useTheme();
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className={isDark ? "text-white" : "text-black"}>
      {children}
    </motion.span>
  );
}

function AboutSection() {
  const isDark = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const words = aboutText.split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      className={`w-full py-24 md:py-32 px-6 flex flex-col items-center justify-center relative border-t transition-colors duration-500 ${isDark ? 'bg-[#111827] border-white/10' : 'bg-[#fcfcfc] border-gray-100'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1100px] mx-auto"
      >
        <AnimatedHeading
          text="About me"
          className={`mb-10 font-semibold text-center flex justify-center ${isDark ? 'text-white' : 'text-black'}`}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
        />
        <p
          className="text-center"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.2rem, 2vw, 1.8rem)", lineHeight: 1.8, fontWeight: 500 }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <span key={i}>
                <ScrollWord progress={scrollYProgress} range={[start, end]}>
                  {word}
                </ScrollWord>
                {i < words.length - 1 && " "}
              </span>
            );
          })}
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Services Section ─── */
const servicesData = [
  { num: "01", title: "Branding", desc: "Brand strategy + identity" },
  { num: "02", title: "Web design & development", desc: "WordPress + HTML + Next & React JS" },
  { num: "03", title: "Graphic designing", desc: "Photoshop + Illustrator + InDesign" },
  { num: "04", title: "Motion graphics", desc: "After Effects" },
  { num: "05", title: "Presentation design", desc: "PowerPoint + Google Slides" },
  { num: "06", title: "Packaging", desc: "Product" },
];

function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]); // Fades in naturally with scroll

  return (
    <motion.section
      id="services"
      ref={containerRef}
      className="w-full bg-black py-24 md:py-32 flex justify-center relative overflow-hidden mb-10 mt-10"
      style={{ scale, borderRadius, opacity }}
    >
      <div
        className="max-w-[1200px] w-full relative px-8 py-16 md:px-24 md:py-10"
      >
        {/* Green glow effect */}
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[550px] bg-[#00ff00] rounded-full opacity-30 blur-[130px] pointer-events-none" />

        <AnimatedHeading
          text="Services"
          className="text-white text-center font-semibold mb-14 md:mb-20 relative z-10 flex justify-center"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        />

        <div className="flex flex-col relative z-10 w-full max-w-[900px] mx-auto">
          {servicesData.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col py-8 border-b border-white/20 last:border-b-0 cursor-none"
              data-cursor-text={service.title}
              data-cursor-shape="rounded"
              onMouseEnter={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: { text: service.title, shape: "rounded" } }))}
              onMouseLeave={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: "" }))}
            >
              <span className="text-[#00ff00] font-medium mb-1.5 md:mb-2 text-sm md:text-base tracking-[0.05em]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {service.num}
              </span>
              <h3 className="text-white font-bold tracking-wide text-[1.4rem] md:text-[2rem] leading-tight mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {service.title}
              </h3>
              <p className="text-white text-[0.65rem] md:text-xs tracking-[0.1em]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ─── Projects Section ─── */
const projectsList = [
  { num: "01", title: "Branding", icon: "/branding.svg" },
  { num: "02", title: "Web design &\ndevelopment", icon: "/Web design.svg" },
  { num: "03", title: "Graphic\ndesigning", icon: "/Graphic design.svg" },
  { num: "04", title: "Motion\ngraphics", icon: "/motion graphics.svg" },
  { num: "05", title: "Presentation\ndesign", icon: "/presentation design.svg" },
  { num: "06", title: "Packaging", icon: "/packaging.svg" },
  { num: "07", title: "Video editing", icon: "/video editing.svg" },
];

function ProjectCard({ project, index }: any) {
  const isDark = useTheme();
  return (
    <a
      href={`/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      className={`block relative w-[280px] sm:w-[340px] md:w-[420px] h-[38vh] md:h-[55vh] min-h-[280px] md:min-h-[440px] max-h-[600px] flex-shrink-0 rounded-[28px] md:rounded-[32px] overflow-hidden p-6 sm:p-10 border-[1.5px] border-[#00ff00] text-left shadow-[0_10px_40px_rgba(0,0,0,0.12)] group cursor-none transition-all duration-500 ${isDark ? 'bg-[#141827]' : 'bg-white'}`}
      data-cursor-text="Explore"
      data-cursor-shape="circle"
      onMouseEnter={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: { text: "Explore", shape: "circle" } }))}
      onMouseLeave={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("setCursorText", { detail: "" }))}
    >
      {/* Top linear green gradient */}
      <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-[#00ff00]/30 via-[#00ff00]/5 to-transparent pointer-events-none" />
      {/* Lines image starting from bottom */}
      <img src="/card line.png" alt="Lines" className={`absolute bottom-0 left-0 w-full h-[75%] object-cover object-bottom pointer-events-none opacity-40 ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`} />
      {/* Number & Title */}
      <div className="relative z-10 flex items-baseline gap-3 mt-2">
        <span className="font-bold text-xl md:text-[1.7rem] leading-none tracking-tight" style={{ fontFamily: "'Outfit', sans-serif", color: "#00dd00" }}>
          {project.num}
        </span>
        <h3 className={`font-bold text-xl md:text-[1.9rem] whitespace-pre-line leading-[1.1] tracking-tight ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
          {project.title}
        </h3>
      </div>
      {/* Hero Icon at bottom right */}
      <img src={project.icon} alt={project.title} className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-[100px] sm:w-[130px] md:w-[180px] h-auto object-contain z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03] drop-shadow-xl" />
    </a>
  );
}

function ProjectsSection() {
  const isDark = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100, mass: 0.1 });
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={containerRef} id="projects" className={`relative h-[400vh] mb-10 md:mb-20 transition-colors duration-500 ${isDark ? 'bg-[#0c0e1a]' : 'bg-white'}`}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-between overflow-hidden pt-16 pb-32 md:pt-24 md:pb-48">
        <div className="max-w-[1200px] w-full mx-auto px-6 mb-8 md:mb-16 text-center">
          <AnimatedHeading
            text="Handpicked projects"
            className={`font-semibold text-[2.5rem] md:text-[3.2rem] mb-6 max-w-[800px] mx-auto flex justify-center flex-wrap ${isDark ? 'text-white' : 'text-black'}`}
            style={{ fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}
          />
          <p className={`font-medium text-[1.05rem] md:text-[1.2rem] leading-relaxed mx-auto max-w-[800px] ${isDark ? 'text-white/60' : 'text-[#1d2431]'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
            Explore my portfolio to see a blend of graphic design, motion, video editing, and web experiences. Each project reflects creativity, precision, and user-focused design.
          </p>
        </div>
        <div className="w-full h-full flex flex-1 items-center justify-start z-20">
          <motion.div style={{ x }} className="flex gap-4 md:gap-7 px-[5vw] pb-12 md:pb-0">
            {projectsList.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Design Process Section ─── */
const processSteps = [
  { num: "01", title: "Understand the brief" },
  { num: "02", title: "Research" },
  { num: "03", title: "Brainstorm & sketch" },
  { num: "04", title: "Create the design" },
  { num: "05", title: "Review & refine" },
  { num: "06", title: "Present to client" },
  { num: "07", title: "Final export & delivery" },
];

function DesignProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

  return (
    <section className="w-full bg-black py-24 md:py-32 px-4 md:px-6 flex flex-col items-center overflow-hidden transition-all duration-500 rounded-[50px] mb-10 mt-10">
      <AnimatedHeading
        text="The design process"
        className="text-white font-semibold text-[2.5rem] md:text-[3.5rem] mb-16 md:mb-24 text-center flex justify-center flex-wrap"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      />

      <div
        ref={containerRef}
        className="max-w-[1000px] w-full relative"
      >
        {/* Center line (Background) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-white/20 -translate-x-1/2" />

        {/* Animated fill line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-[#533fe7] origin-top -translate-x-1/2 z-10"
          style={{ scaleY }}
        />

        <div className="flex flex-col gap-12 md:gap-8 w-full relative z-20 py-4">
          {processSteps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`flex w-full ${isLeft ? "justify-start" : "justify-end"} items-center relative`}>

                {/* Center Dot */}
                <div className="absolute left-1/2 top-1/2 w-5 h-5 rounded-full bg-[#00ff00] shadow-[0_0_15px_rgba(0,255,0,0.5)] -translate-x-1/2 -translate-y-1/2 z-30" />

                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: "easeOut", type: "spring", bounce: 0.3 }}
                  className="w-[calc(50%-1.5rem)] md:w-[calc(50%-2.5rem)]"
                >
                  <div className="border border-white/20 rounded-[12px] md:rounded-[18px] p-5 md:p-6 bg-black shadow-lg">
                    <span className="block text-[#00ff00] text-xs md:text-sm mb-1 font-semibold tracking-widest uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {step.num}
                    </span>
                    <h3 className="text-white font-bold text-base md:text-[1.25rem] tracking-wide leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {step.title}
                    </h3>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Design Tools Section ─── */

const toolsList = [
  { name: "Wordpress", icon: "/wordpress.svg", label: "Wordpress" },
  { name: "HTML", icon: "/HTML.svg", label: "HTML" },
  { name: "Java Script", icon: "/Javascript.svg", label: "Java Script" },
  { name: "Framer", icon: "/Framer.svg", label: "Framer" },
  { name: "postgres", icon: "/Postgres.svg", label: "postgres" },
  { name: "CSS", icon: "/CSS.svg", label: "CSS" },
  { name: "indesign", icon: "/indesign.svg", label: "indesign" },
  { name: "Photoshop", icon: "/photoshop.svg", label: "Photoshop" },
  { name: "illustrator", icon: "/illustrator.svg", label: "illustrator" },
  { name: "Premiere Pro", icon: "/premier.svg", label: "Premiere Pro" },
  { name: "Next Js", icon: "/nextjs.svg", label: "Next Js" },
  { name: "React Js", icon: "/react js.svg", label: "React Js" },
  { name: "My SQL", icon: "/mysql.svg", label: "My SQL" },
  { name: "Canva", icon: "/Canva.svg", label: "Canva" },
  { name: "Figma", icon: "/Figma.svg", label: "Figma" },
];

function DesignToolsSection() {
  const isDark = useTheme();
  return (
    <section id="tools" className={`w-full py-24 px-6 flex flex-col items-center overflow-hidden relative transition-colors duration-500 ${isDark ? 'bg-[#0c0e1a]' : 'bg-white'}`}>
      <AnimatedHeading
        text="Tools & stacks"
        className={`font-semibold text-[2.8rem] md:text-[3.8rem] mb-12 text-center flex justify-center flex-wrap ${isDark ? 'text-white' : 'text-black'}`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      />

      <div className={`max-w-[1200px] w-full overflow-hidden ${isDark ? 'border border-white/20' : 'border border-black'}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {toolsList.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group aspect-square flex flex-col items-center justify-center border transition-colors duration-300 ${isDark ? 'border-white/20 hover:bg-white/5' : 'border-black hover:bg-gray-50'}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center transform active:scale-95 transition-transform duration-300">
                <img src={tool.icon} alt={tool.name} className="w-[85%] h-[85%] object-contain" />
              </div>
              <span className={`font-semibold text-sm md:text-base tracking-tight ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                {tool.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ─── */


/* ─── Preloader ─── */
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 15) + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setIsOpening(true), 500);
        setTimeout(() => {
          setIsDone(true);
          onComplete();
        }, 1500);
      }
      setProgress(p);
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (!isDone) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDone]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Left half screen */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpening ? "-100%" : 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 w-1/2 h-full bg-[#fdfdfd] pointer-events-auto"
      />
      {/* Right half screen */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpening ? "100%" : 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute right-0 top-0 w-1/2 h-full bg-[#fdfdfd] pointer-events-auto"
      />

      {/* Loader Container */}
      <motion.div
        animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.8 : 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-[120px] h-[120px] rounded-[24px] bg-[#ededed] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-center pointer-events-auto isolate"
      >
        <span className="relative z-20 text-[1.4rem] font-bold text-black" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {progress}%
        </span>

        {/* Water Level Container */}
        <div
          className="absolute bottom-0 left-0 w-full transition-all duration-[200ms] ease-out flex flex-col justify-end"
          style={{ height: `${progress}%` }}
        >
          {/* Back wave */}
          <div className="absolute left-0 bottom-full w-[200%] flex animate-wave-slow pointer-events-none" style={{ height: '20px', marginBottom: '-1px' }}>
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-1/2 h-full fill-[#3DE0FF] opacity-40">
              <path d="M 0 20 V 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10 V 20 Z" />
            </svg>
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-1/2 h-full fill-[#3DE0FF] opacity-40">
              <path d="M 0 20 V 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10 V 20 Z" />
            </svg>
          </div>
          {/* Front wave */}
          <div className="absolute left-0 bottom-full w-[200%] flex animate-wave pointer-events-none" style={{ height: '14px', marginBottom: '-1px' }}>
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-1/2 h-full fill-[#3DE0FF]">
              <path d="M 0 20 V 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10 V 20 Z" />
            </svg>
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-1/2 h-full fill-[#3DE0FF]">
              <path d="M 0 20 V 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10 V 20 Z" />
            </svg>
          </div>
          {/* Solid fill */}
          <div className="w-full h-full bg-[#3DE0FF]" />
        </div>
      </motion.div>
    </div>
  );
}



/* ─── Theme Toggle Button ─── */
function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.92 }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="fixed z-[45] bottom-8 right-8 flex items-center justify-center w-12 h-12 rounded-full shadow-xl border transition-all duration-500"
      style={{
        background: isDark ? "#ffffff" : "#000000",
        borderColor: isDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
        boxShadow: isDark
          ? "0 4px 20px rgba(255,255,255,0.2)"
          : "0 4px 20px rgba(0,0,0,0.4)",
        color: isDark ? "#000000" : "#ffffff",
      }}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0.8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-[1.4rem]"
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </motion.button>
  );
}

/* ─── App ─── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default: dark mode

  // Broadcast theme to global components (ContactSection, etc.) via HTML class + custom event
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('site-dark');
    } else {
      document.documentElement.classList.remove('site-dark');
    }
    window.dispatchEvent(new CustomEvent('siteThemeChange', { detail: { isDark } }));
  }, [isDark]);

  // Set initial dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('site-dark');
  }, []);

  return (
    <ThemeContext.Provider value={isDark}>
      <div className={`min-h-screen w-full overflow-x-clip transition-colors duration-500 ${isDark ? 'bg-[#0c0e1a]' : 'bg-white'}`}>
        <div className="w-full max-w-[1728px] mx-auto overflow-x-clip">
          <Preloader onComplete={() => setLoaded(true)} />
          <style>{`
            html { scroll-behavior: smooth; }
          `}</style>
          <HeroSection />
          <SkillsStrip />
          <StatsSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <DesignProcessSection />
          <DesignToolsSection />
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}