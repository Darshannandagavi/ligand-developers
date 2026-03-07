import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { SiReact, SiNodedotjs, SiMongodb, SiExpress } from "react-icons/si";
import { THEME } from "./theme";

import GridBackground from "./GridBackground";
import HoliModal from "../../StyleComponents/HoliModal";
import MagneticButton from "./MagneticButton";

const techStack = [
  { icon: <SiReact />, label: "React", url: "https://react.dev", color: "#61DAFB", desc: "UI Library" },
  { icon: <SiNodedotjs />, label: "Node.js", url: "https://nodejs.org", color: "#68A063", desc: "Runtime" },
  { icon: <SiMongodb />, label: "MongoDB", url: "https://www.mongodb.com", color: "#4DB33D", desc: "Database" },
  { icon: <SiExpress />, label: "Express", url: "https://expressjs.com", color: "#AAAAAA", desc: "Framework" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

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
              fontFamily: "DaughterOfFortune, cursive" ,
              color:"#2B2B2B"
            }}
            
          >
            Build the Future with {"<"} Code {"/>"}
            <br />
            <span
              style={{
                
                fontFamily: "syne", 
                fontSize:"2rem"
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
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
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
                  style={{ width: 11, height: 11, borderRadius: "50%", background: c }}
                />
              ))}
            </div>

            {/* Icon grid */}
            <div
              style={{
                padding:"30px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem",
              }}
            >
              {techStack.map((tech, i) => (
                <motion.a
                  key={tech.label}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#373737",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: tech.color,
                      fontSize: "1.75rem",
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    {tech.icon}
                  </div>
                  {/* Label */}
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.75)",
                      fontFamily: "'Sora', sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {tech.label}
                  </span>
                </motion.a>
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