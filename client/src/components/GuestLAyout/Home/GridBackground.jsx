import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { THEME } from "./theme";
/* ─────────────────────────────────────────────────────────────
   GRID CELL
───────────────────────────────────────────────────────────── */
const GridCell = ({ introActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [introOn, setIntroOn] = useState(false);

  useEffect(() => {
    if (introActive) {
      if (Math.random() > 0.85) {
        const delay = Math.random() * 800;
        const timer = setTimeout(() => {
          setIntroOn(true);
          setTimeout(() => setIntroOn(false), 500);
        }, delay);
        return () => clearTimeout(timer);
      }
    } else {
      setIntroOn(false);
    }
  }, [introActive]);

  const active = introActive ? introOn : isHovered;

  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${THEME.border}`,
        pointerEvents: "auto",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onMouseEnter={() => !introActive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, #ff6b6b, #ff8e53)",
        }}
      />
      <motion.div
        initial={false}
        animate={{ borderColor: active ? "#ff6b6b" : THEME.border }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   GRID BACKGROUND
───────────────────────────────────────────────────────────── */
const GridBackground = () => {
  const rows = 9;
  const cols = 17;
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIntroActive(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <GridCell key={i} introActive={introActive} />
      ))}
    </div>
  );
};

export default GridBackground;
