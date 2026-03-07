import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { THEME } from "./theme";
import { useState } from "react";
import GridBackground from "./GridBackground";
import HoliModal from "../../StyleComponents/HoliModal";
import MagneticButton from "./MagneticButton";

const ReactSVG = ({ hovered }) => (
  <svg viewBox="0 0 100 100" width="46" height="46" fill="none">
    <motion.circle
      cx="50"
      cy="50"
      r="6"
      fill="#61DAFB"
      animate={hovered ? { r: [6, 9, 6] } : { r: 6 }}
      transition={{ duration: 1, repeat: hovered ? Infinity : 0 }}
    />

    <motion.ellipse
      cx="50"
      cy="50"
      rx="38"
      ry="14"
      stroke="#61DAFB"
      strokeWidth="3"
      fill="none"
      style={{ transformOrigin: "50px 50px" }}
      animate={hovered ? { rotate: [0, 360] } : { rotate: 0 }}
      transition={{
        duration: 2.5,
        repeat: hovered ? Infinity : 0,
        ease: "linear",
      }}
    />

    <motion.ellipse
      cx="50"
      cy="50"
      rx="38"
      ry="14"
      stroke="#61DAFB"
      strokeWidth="3"
      fill="none"
      style={{ transformOrigin: "50px 50px", rotate: "60deg" }}
      animate={hovered ? { rotate: ["60deg", "420deg"] } : { rotate: "60deg" }}
      transition={{ duration: 2.5, repeat: hovered ? Infinity : 0 }}
    />

    <motion.ellipse
      cx="50"
      cy="50"
      rx="38"
      ry="14"
      stroke="#61DAFB"
      strokeWidth="3"
      fill="none"
      style={{ transformOrigin: "50px 50px", rotate: "120deg" }}
      animate={
        hovered ? { rotate: ["120deg", "480deg"] } : { rotate: "120deg" }
      }
      transition={{ duration: 2.5, repeat: hovered ? Infinity : 0 }}
    />
  </svg>
);

const NodeSVG = ({ hovered }) => (
  <svg viewBox="0 0 100 100" width="46" height="46" fill="none">
    <motion.path
      d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z"
      stroke="#5FA04E"
      strokeWidth="4.5"
      fill="none"
      animate={hovered ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      style={{ transformOrigin: "50px 50px" }}
      transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
    />

    <motion.text
      x="50"
      y="60"
      textAnchor="middle"
      fill="#5FA04E"
      fontSize="26"
      fontWeight="700"
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
    <motion.text
      x="50"
      y="46"
      textAnchor="middle"
      fill="#AAAAAA"
      fontSize="46"
      fontWeight="300"
      animate={
        hovered
          ? { fill: ["#AAAAAA", "#ffffff", "#AAAAAA"] }
          : { fill: "#AAAAAA" }
      }
      transition={{ duration: 1.2, repeat: hovered ? Infinity : 0 }}
    >
      ex
    </motion.text>

    <motion.line
      x1="12"
      y1="52"
      y2="52"
      stroke="#888"
      strokeWidth="2"
      x2={12}
      animate={hovered ? { x2: 88 } : { x2: 12 }}
      transition={{ duration: 0.4 }}
    />
  </svg>
);
const techStack = [
  {
    id: "react",
    label: "React",
    desc: "UI Library",
    color: "#61DAFB",
    glow: "rgba(97,218,251,0.2)",
    Icon: ReactSVG,
  },
  {
    id: "node",
    label: "Node.js",
    desc: "Runtime",
    color: "#5FA04E",
    glow: "rgba(95,160,78,0.2)",
    Icon: NodeSVG,
  },
  {
    id: "mongo",
    label: "MongoDB",
    desc: "Database",
    color: "#4DB33D",
    glow: "rgba(77,179,61,0.2)",
    Icon: MongoSVG,
  },
  {
    id: "express",
    label: "Express",
    desc: "Framework",
    color: "#CCCCCC",
    glow: "rgba(200,200,200,0.14)",
    Icon: ExpressSVG,
  },
];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

const TechCard = ({ Icon, label, color, desc, glow, index }) => {
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
        animate={
          hovered
            ? { y: -6, scale: 1.06, boxShadow: `0 10px 30px ${color}33` }
            : { y: 0, scale: 1, boxShadow: "none" }
        }
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#373737",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Icon hovered={hovered} />
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: hovered ? color : "rgba(255,255,255,0.8)",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {desc}
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: THEME.bgGradient,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <GridBackground />
      <HoliModal />

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "0%",
          width: 360,
          height: 360,
          background: `radial-gradient(circle, ${THEME.pink}06 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "5rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div>
          <motion.div {...fadeUp(0)} style={{ marginBottom: "1.25rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                background: `${THEME.accent}0d`,
                color: THEME.accent,
                borderRadius: 6,
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: `1px solid ${THEME.accent}1a`,
              }}
            >
              <Zap size={11} strokeWidth={2.5} />
              Ligand Learning Platform
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            style={{
              fontSize: "4.4rem",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              fontFamily: "DaughterOfFortune, cursive",
              color: "#2B2B2B",
            }}
          >
            Build the Future with {"<"} Code {"/>"}
            <br />
            <span
              style={{
                fontWeight: "600",
                fontFamily: "roboto",
                fontSize: "4rem",
              }}
              className="hero-text"
            >
              Ligand Developers
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            style={{
              fontSize: "0.975rem",
              color: THEME.textLight,
              lineHeight: 1.7,
              maxWidth: 420,
              marginBottom: "2rem",
            }}
          >
            Industry-leading curriculum, hands-on projects, and mentorship from
            expert developers — built for Ligand students.
          </motion.p>

          <motion.div
            {...fadeUp(0.22)}
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <MagneticButton href="/login" variant="primary">
              Get Started <ArrowRight size={15} strokeWidth={2.5} />
            </MagneticButton>
            <MagneticButton href="#about" variant="secondary">
              Watch Demo
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — Dashboard Card ── */}
        <motion.div {...fadeUp(0.18)}>
          <div
            style={{
              borderRadius: 20,
              background: "#1e1e24",
              overflow: "hidden",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* Gradient header bar */}
            <div
              style={{
                height: 44,
                background: "#373737",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: 7,
              }}
            >
              {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
            </div>

            {/* Icon grid */}
            <div
              style={{
                padding: "30px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem",
              }}
            >
              {techStack.map((tech, i) => (
                <TechCard key={tech.label} {...tech} index={i} />
              ))}
            </div>

            {/* Bottom badge */}
            <div
              style={{
                padding: "0 2rem 2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.35 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "9px 18px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 100,
                }}
              >
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#a78bfa",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  A Dedicated Learning Platform for Ligand Students
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            width: 1,
            height: 36,
            background: `linear-gradient(to bottom, transparent, ${THEME.accent}60)`,
          }}
        />
      </motion.div>
      <style>
        {`
          .hero-text {
    background: linear-gradient(90deg, #4361ee 0%, #e879f9 50%, #f97316 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: gradient-shift 4s ease infinite;
  }

  @keyframes gradient-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
        
        `}
      </style>
    </section>
  );
};

export default HeroSection;
