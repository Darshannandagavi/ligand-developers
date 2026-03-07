import { useEffect, useRef, useState } from "react";
import { THEME } from "../GuestLAyout/Home/theme";

/* ─────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────── */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleHoverStart = (e) => {
      if (e.target.closest("a, button, [data-cursor], .interactive")) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          width: isHovering ? "45px" : "30px",
          height: isHovering ? "45px" : "30px",
          backgroundColor: isHovering ? "white" : THEME.accent,
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          mixBlendMode: isHovering ? "normal" : "difference",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          transition: "width 0.3s, height 0.3s, background-color 0.3s",
        }}
      >
        {isHovering && "👆"}
      </div>
    </>
  );
};

export default CustomCursor;