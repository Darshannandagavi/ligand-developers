import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { THEME } from "./theme";
import SectionReveal from "./SectionReveal";

/* ─────────────────────────────────────────────────────────────
   INLINE STYLES / CSS VARIABLES
───────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

  .features-section {
    padding: 7rem 2rem;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── subtle grid dot background ── */
  .features-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    z-index: 0;
  }

  /* ── top diagonal stripe accent ── */
  .features-section::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4361ee 0%, #e879f9 50%, #f97316 100%);
    z-index: 2;
  }

  .features-inner {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── section header ── */
  .features-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4361ee;
    margin-bottom: 1.25rem;
  }

  .features-eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4361ee;
    animation: eyebrow-pulse 2s ease-in-out infinite;
  }

  @keyframes eyebrow-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.6); opacity: 0.4; }
  }

  .features-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 4.5vw, 3.5rem);
    font-weight: 800;
    color: #0f1117;
    line-height: 1.05;
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;
  }

  .features-title-accent {
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

  .features-subtitle {
    font-size: 1.05rem;
    color: #64748b;
    max-width: 480px;
    line-height: 1.75;
  }

  /* ── SVG animated underline ── */
  .features-underline {
    display: block;
    width: 120px;
    height: 6px;
    margin: 1.5rem 0 0;
    overflow: visible;
  }

  @keyframes draw-line {
    to { stroke-dashoffset: 0; }
  }

  /* ── grid ── */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 4rem;
  }

  @media (max-width: 900px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .features-grid { grid-template-columns: 1fr; }
  }

  /* ── card ── */
  .feat-card {
    position: relative;
    background: #ffffff;
    border: 1px solid #e8ecf4;
    border-radius: 20px;
    padding: 2rem;
    cursor: pointer;
    overflow: hidden;
    transition: border-color 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
  }

  .feat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    background: radial-gradient(
      ellipse at 50% 0%,
      var(--card-glow, rgba(67,97,238,0.06)) 0%,
      transparent 70%
    );
  }

  .feat-card:hover {
    transform: translateY(-8px) scale(1.015);
    border-color: var(--card-border, rgba(67,97,238,0.25));
    box-shadow:
      0 20px 48px -12px var(--card-shadow, rgba(67,97,238,0.14)),
      0 4px 16px -4px rgba(0,0,0,0.06);
  }

  .feat-card:hover::before {
    opacity: 1;
  }

  /* ── SVG illustration wrapper ── */
  .feat-svg-wrap {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: var(--card-icon-bg, rgba(67,97,238,0.07));
    border: 1px solid var(--card-icon-border, rgba(67,97,238,0.12));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.4rem;
    position: relative;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
  }

  .feat-card:hover .feat-svg-wrap {
    transform: scale(1.12) rotate(-3deg);
    box-shadow: 0 8px 24px var(--card-glow, rgba(67,97,238,0.2));
  }

  /* animated SVG paths in cards */
  .feat-card .anim-path {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    transition: stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1);
  }

  .feat-card:hover .anim-path {
    stroke-dashoffset: 0;
  }

  .feat-card .anim-fill {
    opacity: 0;
    transition: opacity 0.5s ease 0.3s;
  }

  .feat-card:hover .anim-fill {
    opacity: 1;
  }

  /* spin on hover */
  .feat-card .spin-on-hover {
    transform-origin: center;
    transition: transform 0.7s cubic-bezier(0.34,1.56,0.64,1);
  }
  .feat-card:hover .spin-on-hover {
    transform: rotate(360deg);
  }

  /* orbit animation */
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(10px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
  }

  .feat-card:hover .orbit-dot {
    animation: orbit 1.5s linear infinite;
  }

  /* pulse ring */
  @keyframes ring-pulse {
    0%   { r: 6; opacity: 0.6; }
    100% { r: 18; opacity: 0; }
  }

  .feat-card:hover .ring-pulse {
    animation: ring-pulse 1.2s ease-out infinite;
  }

  /* bar chart bars */
  .feat-card .bar {
    transform-origin: bottom;
    transform: scaleY(0);
    transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
  }

  .feat-card:hover .bar-1 { transform: scaleY(1); transition-delay: 0s; }
  .feat-card:hover .bar-2 { transform: scaleY(1); transition-delay: 0.07s; }
  .feat-card:hover .bar-3 { transform: scaleY(1); transition-delay: 0.14s; }
  .feat-card:hover .bar-4 { transform: scaleY(1); transition-delay: 0.21s; }

  /* typing cursor blink */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .feat-card:hover .cursor-blink {
    animation: blink 0.9s step-end infinite;
  }

  /* card text */
  .feat-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f1117;
    margin-bottom: 0.6rem;
    letter-spacing: -0.01em;
  }

  .feat-card-desc {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.7;
  }

  /* ── card bottom tag ── */
  .feat-card-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 1.25rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--card-accent, #4361ee);
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
  }

  .feat-card:hover .feat-card-tag {
    opacity: 1;
    transform: translateY(0);
  }

  .feat-card-tag svg {
    transition: transform 0.3s ease;
  }

  .feat-card:hover .feat-card-tag svg {
    transform: translateX(4px);
  }

  /* ── card index number ── */
  .feat-card-index {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 800;
    color: rgba(15,17,23,0.08);
    letter-spacing: 0.04em;
  }

  /* ── floating orb decoration ── */
  .features-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  /* ── bottom marquee strip ── */
  .features-marquee-wrap {
  margin-top: 4.5rem;
  overflow: hidden;
  border-top: 1px solid #e8ecf4;
  border-bottom: 1px solid #e8ecf4;
  padding: 1rem 0;
  position: relative;
  z-index: 1;
  background: #fafbff;

  /* fade edges */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 80px,
    black calc(100% - 80px),
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    black 80px,
    black calc(100% - 80px),
    transparent
  );
}

  .features-marquee-track {
    display: flex;
    gap: 3rem;
    animation: marquee 22s linear infinite;
    white-space: nowrap;
    width: max-content;
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .features-marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: color 0.2s ease;
  }

  .features-marquee-item:hover {
    color: #4361ee;
  }

  .features-marquee-item svg {
    opacity: 0.6;
  }
`;

/* ─────────────────────────────────────────────────────────────
   PROFESSIONAL SVG ICONS (Google-grade illustration style)
───────────────────────────────────────────────────────────── */

const AssessmentSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Clock ring */}
    <circle cx="18" cy="18" r="13" stroke="#7c8cf8" strokeWidth="1.5" className="anim-path" />
    {/* Pulse ring */}
    <circle cx="18" cy="18" r="6" fill="none" stroke="#7c8cf8" strokeWidth="1" className="ring-pulse" style={{opacity:0}} />
    {/* Clock hands */}
    <line x1="18" y1="18" x2="18" y2="10" stroke="#7c8cf8" strokeWidth="2" strokeLinecap="round" className="anim-path" />
    <line x1="18" y1="18" x2="23" y2="21" stroke="#e879f9" strokeWidth="2" strokeLinecap="round" className="anim-path" />
    {/* Center dot */}
    <circle cx="18" cy="18" r="2" fill="#7c8cf8" />
    {/* Tick marks */}
    {[0,60,120,180,240,300].map((deg,i) => (
      <line
        key={i}
        x1={18 + 11 * Math.cos((deg - 90) * Math.PI/180)}
        y1={18 + 11 * Math.sin((deg - 90) * Math.PI/180)}
        x2={18 + 13 * Math.cos((deg - 90) * Math.PI/180)}
        y2={18 + 13 * Math.sin((deg - 90) * Math.PI/180)}
        stroke="#7c8cf8"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    ))}
    {/* Checkmark fill */}
    <path d="M12 18l4 4 8-8" stroke="#06d6a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="anim-fill" />
  </svg>
);

const NotesSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Book outline */}
    <path d="M8 8h8a2 2 0 0 1 2 2v18a2 2 0 0 0-2-2H8V8z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round" className="anim-path" />
    <path d="M28 8h-8a2 2 0 0 0-2 2v18a2 2 0 0 1 2-2h8V8z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round" className="anim-path" />
    {/* Spine */}
    <line x1="18" y1="10" x2="18" y2="26" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2" className="anim-path" />
    {/* Lines on pages */}
    <line x1="11" y1="14" x2="16" y2="14" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="anim-fill" />
    <line x1="11" y1="17" x2="16" y2="17" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="anim-fill" />
    <line x1="11" y1="20" x2="14" y2="20" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="anim-fill" />
    {/* Star bookmark */}
    <path d="M24 10l1 3h3l-2.5 2 1 3L24 16.5 21.5 18l1-3L20 13h3z" fill="#f97316" className="anim-fill spin-on-hover" style={{transformOrigin:'24px 14px'}} />
  </svg>
);

const VideoSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Screen */}
    <rect x="4" y="8" width="22" height="16" rx="3" stroke="#e879f9" strokeWidth="1.5" className="anim-path" />
    {/* Camera */}
    <path d="M26 13l6-3v12l-6-3v-6z" stroke="#e879f9" strokeWidth="1.5" strokeLinejoin="round" className="anim-path" />
    {/* Play triangle inside screen */}
    <path d="M12 13l8 4-8 4v-8z" fill="#e879f9" className="anim-fill" />
    {/* Live dot with pulse */}
    <circle cx="8" cy="28" r="3" fill="#f72585" className="anim-fill" />
    <circle cx="8" cy="28" r="3" fill="none" stroke="#f72585" strokeWidth="1" className="ring-pulse" style={{opacity:0}} />
    <line x1="14" y1="28" x2="28" y2="28" stroke="rgba(232,121,249,0.3)" strokeWidth="1.5" strokeLinecap="round" className="anim-fill" />
  </svg>
);

const CodeSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Terminal window */}
    <rect x="3" y="5" width="30" height="26" rx="4" stroke="#06d6a0" strokeWidth="1.5" className="anim-path" />
    <line x1="3" y1="12" x2="33" y2="12" stroke="#06d6a0" strokeWidth="1.5" opacity="0.4" className="anim-path" />
    {/* Traffic lights */}
    <circle cx="8"  cy="8.5" r="1.5" fill="#ff6b6b" className="anim-fill" />
    <circle cx="13" cy="8.5" r="1.5" fill="#ffd93d" className="anim-fill" />
    <circle cx="18" cy="8.5" r="1.5" fill="#6bcf7f" className="anim-fill" />
    {/* Code brackets */}
    <path d="M10 19l-4 3 4 3" stroke="#06d6a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="anim-path" />
    <path d="M26 19l4 3-4 3" stroke="#06d6a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="anim-path" />
    <line x1="20" y1="17" x2="16" y2="27" stroke="#7c8cf8" strokeWidth="1.5" strokeLinecap="round" className="anim-path" />
    {/* Cursor blink */}
    <rect x="22" y="23" width="2" height="4" rx="1" fill="#06d6a0" className="cursor-blink" style={{opacity:0}} />
  </svg>
);

const InterviewSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Person 1 */}
    <circle cx="11" cy="11" r="5" stroke="#ffd166" strokeWidth="1.5" className="anim-path" />
    <path d="M3 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#ffd166" strokeWidth="1.5" strokeLinecap="round" className="anim-path" />
    {/* Person 2 */}
    <circle cx="25" cy="11" r="5" stroke="#f97316" strokeWidth="1.5" className="anim-path" />
    <path d="M17 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="anim-path" />
    {/* Connection line with orbiting dot */}
    <line x1="16" y1="11" x2="20" y2="11" stroke="rgba(255,209,102,0.3)" strokeWidth="1" strokeDasharray="2 2" className="anim-fill" />
    <circle cx="18" cy="11" r="2.5" fill="#ffd166" className="orbit-dot anim-fill" style={{opacity:0}} />
    {/* Stars/sparks */}
    <path d="M18 3l.6 1.8H20.4l-1.5 1.1.6 1.8L18 6.6l-1.5 1.1.6-1.8-1.5-1.1h1.8z" fill="#ffd166" className="anim-fill spin-on-hover" style={{transformOrigin:'18px 5px'}} />
  </svg>
);

const AnalyticsSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Axes */}
    <line x1="6" y1="30" x2="30" y2="30" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" className="anim-path" />
    <line x1="6" y1="6"  x2="6"  y2="30" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" className="anim-path" />
    {/* Bars */}
    <rect x="9"  y="20" width="4" height="10" rx="2" fill="#3b82f6"  className="bar bar-1" />
    <rect x="15" y="14" width="4" height="16" rx="2" fill="#7c8cf8"  className="bar bar-2" />
    <rect x="21" y="18" width="4" height="12" rx="2" fill="#3b82f6"  className="bar bar-3" />
    <rect x="27" y="10" width="4" height="20" rx="2" fill="#e879f9"  className="bar bar-4" />
    {/* Trend line */}
    <path d="M9 22 15 16 21 20 27 12" stroke="#06d6a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="anim-path" fill="none" />
    {/* Trend dots */}
    {[[9,22],[15,16],[21,20],[27,12]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="2.5" fill="#06d6a0" className="anim-fill" />
    ))}
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   FEATURES DATA
───────────────────────────────────────────────────────────── */
const features = [
  {
    SvgIcon: AssessmentSVG,
    title: "Daily Assessments",
    description: "Adaptive coding challenges and timed quizzes calibrated to your skill level — every single day.",
    tag: "Track progress",
    accent: "#4361ee",
    glow: "rgba(67,97,238,0.08)",
    iconBg: "rgba(67,97,238,0.07)",
    iconBorder: "rgba(67,97,238,0.14)",
    border: "rgba(67,97,238,0.28)",
    shadow: "rgba(67,97,238,0.12)",
  },
  {
    SvgIcon: NotesSVG,
    title: "Comprehensive Notes",
    description: "Structured reference docs, curated cheat-sheets, and concept maps — beautifully organized.",
    tag: "Study smarter",
    accent: "#ea580c",
    glow: "rgba(234,88,12,0.07)",
    iconBg: "rgba(249,115,22,0.07)",
    iconBorder: "rgba(249,115,22,0.14)",
    border: "rgba(234,88,12,0.28)",
    shadow: "rgba(234,88,12,0.1)",
  },
  {
    SvgIcon: VideoSVG,
    title: "Live & Recorded Classes",
    description: "High-definition sessions with industry experts — attend live or catch up at your own pace.",
    tag: "Watch on demand",
    accent: "#a21caf",
    glow: "rgba(162,28,175,0.07)",
    iconBg: "rgba(232,121,249,0.07)",
    iconBorder: "rgba(232,121,249,0.16)",
    border: "rgba(162,28,175,0.26)",
    shadow: "rgba(162,28,175,0.1)",
  },
  {
    SvgIcon: CodeSVG,
    title: "Code Repository",
    description: "Production-quality project templates, starter kits, and annotated real-world code examples.",
    tag: "Start building",
    accent: "#0d9488",
    glow: "rgba(6,214,160,0.07)",
    iconBg: "rgba(6,214,160,0.07)",
    iconBorder: "rgba(6,214,160,0.15)",
    border: "rgba(13,148,136,0.26)",
    shadow: "rgba(13,148,136,0.1)",
  },
  {
    SvgIcon: InterviewSVG,
    title: "Mock Interviews",
    description: "Simulated FAANG-style technical rounds with live feedback from senior engineers.",
    tag: "Get hired",
    accent: "#b45309",
    glow: "rgba(255,209,102,0.08)",
    iconBg: "rgba(255,209,102,0.08)",
    iconBorder: "rgba(255,209,102,0.2)",
    border: "rgba(180,83,9,0.26)",
    shadow: "rgba(180,83,9,0.1)",
  },
  {
    SvgIcon: AnalyticsSVG,
    title: "Performance Analytics",
    description: "Granular dashboards that surface your weak spots and map a personalised path to mastery.",
    tag: "Visualise growth",
    accent: "#1d4ed8",
    glow: "rgba(59,130,246,0.08)",
    iconBg: "rgba(59,130,246,0.07)",
    iconBorder: "rgba(59,130,246,0.14)",
    border: "rgba(29,78,216,0.28)",
    shadow: "rgba(29,78,216,0.12)",
  },
];

/* marquee items */
const marqueeItems = [
  { label: "React", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.4" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg> },
  { label: "Node.js", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#68a063" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
  { label: "MongoDB", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2c0 0-6 8-6 13a6 6 0 0 0 12 0C18 10 12 2 12 2z" stroke="#47a248" strokeWidth="1.5"/><line x1="12" y1="19" x2="12" y2="22" stroke="#47a248" strokeWidth="1.5"/></svg> },
  { label: "TypeScript", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#3178c6"/><path d="M14 12h4M16 12v6M8 18v-6H5v-1.5h7.5V12H10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: "Docker", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="10" width="20" height="8" rx="2" stroke="#2496ed" strokeWidth="1.5"/><path d="M6 10V7M10 10V7M14 10V7M6 7H14" stroke="#2496ed" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: "Python", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 6 4 6 7v3h6v1H4s-3 0-3 5 2.5 5 2.5 5H6v-3c0-3 2-4 6-4s6 1 6 4v3h2.5S23 21 23 16s-3-5-3-5H13v-1h6V7c0-3-2-5-6-5z" stroke="#3776ab" strokeWidth="1.3"/><circle cx="9" cy="5.5" r="1" fill="#3776ab"/><circle cx="15" cy="18.5" r="1" fill="#ffd43b"/></svg> },
  { label: "AWS", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 15s-3-1-3-4 3-4 3-4" stroke="#f90" strokeWidth="1.5" strokeLinecap="round"/><path d="M18 15s3-1 3-4-3-4-3-4" stroke="#f90" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 11c0-3.3 2.7-6 6-6s6 2.7 6 6v4a6 6 0 01-12 0v-4z" stroke="#f90" strokeWidth="1.5"/><line x1="9" y1="20" x2="15" y2="20" stroke="#f90" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: "Kubernetes", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#326ce5" strokeWidth="1.5"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" stroke="#326ce5" strokeWidth="1" opacity="0.5"/></svg> },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATED CARD COMPONENT
───────────────────────────────────────────────────────────── */
const FeatureCard = ({ feature, index }) => {
  const { SvgIcon, title, description, tag, accent, glow, iconBg, iconBorder, border, shadow } = feature;

  return (
    <motion.div
      className="feat-card"
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        "--card-glow": glow,
        "--card-border": border,
        "--card-shadow": shadow,
        "--card-icon-bg": iconBg,
        "--card-icon-border": iconBorder,
        "--card-accent": accent,
      }}
    >
      {/* Shimmer sweep on hover */}
      <div
        style={{
          position: "absolute",
          top: 0, left: "-100%",
          width: "60%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          transform: "skewX(-15deg)",
          transition: "left 0.6s ease",
          pointerEvents: "none",
        }}
        className="card-shimmer"
      />

      {/* Top-right corner accent glow */}
      <div style={{
        position: "absolute",
        top: -20, right: -20,
        width: 100, height: 100,
        borderRadius: "50%",
        background: glow,
        filter: "blur(24px)",
        pointerEvents: "none",
      }} />

      {/* SVG Icon */}
      <div className="feat-svg-wrap">
        <SvgIcon />
      </div>

      {/* Card number */}
      <div className="feat-card-index">
        0{index + 1}
      </div>

      <h3 className="feat-card-title">{title}</h3>
      <p className="feat-card-desc">{description}</p>

      <div className="feat-card-tag">
        {tag}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────────────────────────── */
const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="features-section" ref={sectionRef}>
      <style>{styles}</style>

      {/* Decorative background orbs */}
      <div className="features-orb" style={{
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(67,97,238,0.05) 0%, transparent 70%)",
        top: "-10%", left: "-10%",
      }} />
      <div className="features-orb" style={{
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(162,28,175,0.04) 0%, transparent 70%)",
        bottom: "5%", right: "-5%",
      }} />

      <div className="features-inner">
        {/* ── Header ── */}
        <SectionReveal>
          <div style={{ maxWidth: 580 }}>
            <div className="features-eyebrow">
              <span className="features-eyebrow-dot" />
              Why Choose Us
            </div>

            <h2 className="features-title">
              <h2 style={{fontFamily:"DaughterOfFortune"}}>Everything</h2> you need<br />
              to <span className="features-title-accent">succeed</span>
            </h2>

            <p className="features-subtitle">
              A complete learning operating system — from first principles to
              production-ready code and your first offer letter.
            </p>

            {/* Animated SVG underline */}
            <svg className="features-underline" viewBox="0 0 120 6" fill="none">
              <defs>
                <linearGradient id="ul-grad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c8cf8" />
                  <stop offset="50%" stopColor="#e879f9" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <path
                d="M2 4 Q30 1 60 4 Q90 7 118 4"
                stroke="url(#ul-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                className="features-underline path"
                style={{
                  strokeDasharray: 300,
                  strokeDashoffset: isInView ? 0 : 300,
                  transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s",
                }}
              />
            </svg>
          </div>
        </SectionReveal>

        {/* ── Grid ── */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* ── Marquee strip ── */}
        <div className="features-marquee-wrap">
          <div className="features-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="features-marquee-item">
                {item.icon}
                {item.label}
                <span style={{ color: "rgba(255,255,255,0.1)", marginLeft: 4 }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;