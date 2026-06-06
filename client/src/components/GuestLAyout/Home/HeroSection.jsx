import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { THEME } from "./theme";
import { useState } from "react";
import GridBackground from "./GridBackground";
import HoliModal from "../../StyleComponents/HoliModal";
import MagneticButton from "./MagneticButton";
import { Carousel } from "react-3d-carousel-fullcontrol";

const ReactSVG = ({ hovered }) => (
  <svg viewBox="0 0 100 100" width="46" height="46" fill="none">
    {/* Use scale on a wrapping group instead of animating SVG `r` directly */}
    <motion.g
      style={{ transformOrigin: "50px 50px" }}
      animate={hovered ? { scale: [1, 1.5, 1] } : { scale: 1 }}
      transition={{ duration: 1, repeat: hovered ? Infinity : 0 }}
    >
      <circle cx="50" cy="50" r="6" fill="#61DAFB" />
    </motion.g>
    <motion.ellipse
      cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" fill="none"
      style={{ transformOrigin: "50px 50px" }}
      animate={hovered ? { rotate: 360 } : { rotate: 0 }}
      transition={{ duration: 2.5, repeat: hovered ? Infinity : 0, ease: "linear" }}
    />
    <motion.ellipse
      cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" fill="none"
      style={{ transformOrigin: "50px 50px" }}
      initial={{ rotate: 60 }}
      animate={hovered ? { rotate: 420 } : { rotate: 60 }}
      transition={{ duration: 2.5, repeat: hovered ? Infinity : 0, ease: "linear" }}
    />
    <motion.ellipse
      cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" fill="none"
      style={{ transformOrigin: "50px 50px" }}
      initial={{ rotate: 120 }}
      animate={hovered ? { rotate: 480 } : { rotate: 120 }}
      transition={{ duration: 2.5, repeat: hovered ? Infinity : 0, ease: "linear" }}
    />
  </svg>
);

const NodeSVG = ({ hovered }) => (
  <svg viewBox="0 0 100 100" width="46" height="46" fill="none">
    <motion.path
      d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z"
      stroke="#5FA04E" strokeWidth="4.5" fill="none"
      animate={hovered ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      style={{ transformOrigin: "50px 50px" }}
      transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
    />
    <motion.text
      x="50" y="60" textAnchor="middle" fill="#5FA04E" fontSize="26" fontWeight="700"
      animate={hovered ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
      transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
    >
      js
    </motion.text>
  </svg>
);

const MongoSVG = ({ hovered }) => (
  <svg viewBox="0 0 100 100" width="46" height="46" fill="none">
    <motion.path
      d="M50 8 C50 8 28 28 28 55 C28 72 37 84 50 90 C63 84 72 72 72 55 C72 28 50 8 50 8 Z"
      fill="#4DB33D"
      animate={hovered ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      style={{ transformOrigin: "50px 50px" }}
      transition={{ duration: 1.4, repeat: hovered ? Infinity : 0 }}
    />
  </svg>
);

const ExpressSVG = ({ hovered }) => (
  <svg viewBox="0 0 100 60" width="68" height="40" fill="none">
    {/* fill cannot be keyframed directly on SVG text via Framer — use initial+animate */}
    <motion.text
      x="50" y="46" textAnchor="middle" fontSize="46" fontWeight="300"
      initial={{ fill: "#AAAAAA" }}
      animate={{ fill: hovered ? "#ffffff" : "#AAAAAA" }}
      transition={{ duration: 0.4 }}
    >
      ex
    </motion.text>
    {/* Use rect width instead of line x2 — Framer handles width reliably */}
    <motion.rect
      x="12" y="51" height="2" rx="1" fill="#888"
      initial={{ width: 0 }}
      animate={{ width: hovered ? 76 : 0 }}
      transition={{ duration: 0.4 }}
    />
  </svg>
);

const techStack = [
  { id: "react", label: "React", desc: "UI Library", color: "#61DAFB", glow: "rgba(97,218,251,0.2)", Icon: ReactSVG },
  { id: "node", label: "Node.js", desc: "Runtime", color: "#5FA04E", glow: "rgba(95,160,78,0.2)", Icon: NodeSVG },
  { id: "mongo", label: "MongoDB", desc: "Database", color: "#4DB33D", glow: "rgba(77,179,61,0.2)", Icon: MongoSVG },
  { id: "express", label: "Express", desc: "Framework", color: "#CCCCCC", glow: "rgba(200,200,200,0.14)", Icon: ExpressSVG },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

const TechCard = ({ Icon, label, color, desc, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.09, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
      }}
    >
      <motion.div
        animate={hovered ? { y: -6, scale: 1.06, boxShadow: `0 10px 30px ${color}33` } : { y: 0, scale: 1, boxShadow: "none" }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        style={{
          width: 80, height: 80, borderRadius: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#373737", border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Icon hovered={hovered} />
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: hovered ? color : "rgba(255,255,255,0.8)" }}>
          {label}
        </div>
        <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>
          {desc}
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const images = [
    { src: "./techstacks/react.png", label: "React" },
    { src: "./techstacks/express_upscaled.png", label: "Express" },
    { src: "./techstacks/mongodb_upscaled.png", label: "MongoDB" },
    { src: "./techstacks/node_upscaled.png", label: "Node.js" },
    { src: "./techstacks/aiml.png", label: "AI-ML" },
  ];

  return (
    <section className="hero-section">
      <GridBackground />
      <HoliModal />

      {/* Ambient glow blob */}
      <div className="hero-blob" />

      <div className="hero-container">
        {/* LEFT COLUMN */}
        <div className="hero-left">
          <motion.div {...fadeUp(0)} style={{ marginBottom: "1.25rem" }}>
            <span className="hero-badge">
              <Zap size={11} strokeWidth={2.5} />
              Ligand Learning Platform
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} className="hero-heading">
            Build the Future with {"<"} Code {"/>"}
            <br />
            <span className="hero-text">Ligand Developers</span>
          </motion.h1>

          <motion.p {...fadeUp(0.15)} className="hero-subtext">
            Industry-leading curriculum, hands-on projects, and mentorship from
            expert developers — built for Ligand students.
          </motion.p>

          <motion.div {...fadeUp(0.22)} className="hero-cta">
            <MagneticButton href="/login" variant="primary">
              Get Started <ArrowRight size={15} strokeWidth={2.5} />
            </MagneticButton>
            <MagneticButton href="#about" variant="secondary">
              Watch Demo
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Carousel (hidden on mobile, shown on desktop) */}
        <motion.div {...fadeUp(0.18)} className="hero-carousel-wrapper">
          <Carousel
            images={images}
            autoRotateSpeed={0.3}
            autoRotateAxes={{ x: false, y: true, z: false }}
            controlled={false}
            cardWidth={300}
            cardHeight={180}
            gap={5}
          />
        </motion.div>

        {/* Mobile-only: Tech stack cards instead of carousel */}
        <motion.div
          {...fadeUp(0.22)}
          className="hero-techstack-mobile"
        >
          {techStack.map((tech, i) => (
            <TechCard key={tech.id} {...tech} index={i} />
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="hero-scroll-cue"
      >
        <div className="hero-scroll-line" />
      </motion.div>

      <style>{`
        /* ── Hero section base ── */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          background: ${THEME.bgGradient};
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Ambient blob ── */
        .hero-blob {
          position: absolute;
          bottom: 10%;
          left: 0%;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, ${THEME.pink}06 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        /* ── Main grid container ── */
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(5rem, 10vw, 7rem) clamp(1.25rem, 5vw, 3rem) clamp(2rem, 5vw, 3rem);
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Left column ── */
        .hero-left {
          min-width: 0; /* prevent overflow in grid */
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: ${THEME.accent}0d;
          color: ${THEME.accent};
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid ${THEME.accent}1a;
        }

        /* ── Heading ── */
        .hero-heading {
          font-size: clamp(2.2rem, 5.5vw, 4.4rem);
          line-height: 1.08;
          font-weight: 600;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          font-family: DaughterOfFortune, cursive;
          color: #2B2B2B;
        }

        /* ── Gradient text span ── */
        .hero-text {
          font-weight: 600;
          font-family: roboto, sans-serif;
          font-size: clamp(1.8rem, 5vw, 4rem);
          background: linear-gradient(90deg, #4361ee 0%, #e879f9 50%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 100%;
          animation: gradient-shift 4s ease infinite;
        }

        /* ── Subtext ── */
        .hero-subtext {
          font-size: clamp(0.875rem, 2vw, 0.975rem);
          color: ${THEME.textLight};
          line-height: 1.7;
          max-width: 420px;
          margin-bottom: 2rem;
        }

        /* ── CTA row ── */
        .hero-cta {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
        }

        /* ── Carousel wrapper (desktop only) ── */
        .hero-carousel-wrapper {
          height: 400px;
          position: relative;
          display: block; /* shown on desktop */
        }

        /* ── Mobile tech cards (hidden on desktop) ── */
        .hero-techstack-mobile {
          display: none;
        }

        /* ── Scroll cue ── */
        .hero-scroll-cue {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
        }
        .hero-scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, ${THEME.accent}60);
        }

        /* ── Gradient animation ── */
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ════════════════════════════════════════
           TABLET  (≤ 900px)
           Collapse to single column, keep carousel
        ════════════════════════════════════════ */
        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-subtext {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-badge {
            margin: 0 auto;
          }

          .hero-cta {
            justify-content: center;
          }

          .hero-carousel-wrapper {
            height: 320px;
            width: 100%;
          }
        }

        /* ════════════════════════════════════════
           MOBILE  (≤ 560px)
           Swap carousel → tech card grid
        ════════════════════════════════════════ */
        @media (max-width: 560px) {
          .hero-container {
            padding-top: 5.5rem;
            padding-bottom: 4rem;
          }

          /* Hide 3D carousel on small screens — it's too cramped */
          .hero-carousel-wrapper {
            display: none;
          }

          /* Show the flat tech card row instead */
          .hero-techstack-mobile {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.5rem;
            width: 100%;
          }

          /* For very narrow phones, wrap to 2×2 */
          @media (max-width: 380px) {
            .hero-techstack-mobile {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;