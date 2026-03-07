import { useRef } from "react";
import { THEME } from "./theme";

/* ─────────────────────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────────────────────── */
const MagneticButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  style: extraStyle = {},
}) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate(0, 0)";
    }
  };

  const baseStyles = {
    padding: "14px 32px",
    borderRadius: "14px",
    fontWeight: "600",
    fontSize: "1rem",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "none",
    position: "relative",
    overflow: "hidden",
    letterSpacing: "0.3px",
  };

  const variantStyles = {
    primary: {
      background: THEME.accentGradient,
      color: "white",
      boxShadow: `0 10px 25px ${THEME.accent}30`,
    },
    secondary: {
      background: "transparent",
      color: THEME.text,
      border: `2px solid ${THEME.border}`,
    },
    outline: {
      background: "transparent",
      color: THEME.accent,
      border: `1px solid ${THEME.accent}40`,
      padding: "8px 16px",
      fontSize: "0.875rem",
    },
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`interactive ${className}`}
      style={{ ...baseStyles, ...(variantStyles[variant] || {}), ...extraStyle }}
    >
      {children}
    </Component>
  );
};

export default MagneticButton;
