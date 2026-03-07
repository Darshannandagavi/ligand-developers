import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   STYLES
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

  .features-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    z-index: 0;
  }

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

  .features-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4361ee;
    margin-bottom: 1.25rem;
  }

  .features-eyebrow-dot {
    width: 6px; height: 6px;
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

  .features-underline {
    display: block;
    width: 120px;
    height: 6px;
    margin: 1.5rem 0 0;
    overflow: visible;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 4rem;
  }

  @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .features-grid { grid-template-columns: 1fr; } }

  /* ── CARD ── */
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
    background: radial-gradient(ellipse at 50% 0%, var(--card-glow, rgba(67,97,238,0.06)) 0%, transparent 70%);
  }

  .feat-card:hover {
    transform: translateY(-8px) scale(1.015);
    border-color: var(--card-border, rgba(67,97,238,0.25));
    box-shadow: 0 20px 48px -12px var(--card-shadow, rgba(67,97,238,0.14)), 0 4px 16px -4px rgba(0,0,0,0.06);
  }

  .feat-card:hover::before { opacity: 1; }

  /* ── ICON WRAP ── */
  .feat-svg-wrap {
    width: 64px; height: 64px;
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

  /* ── HOVER-TRIGGERED SVG ANIMATIONS ── */

  /* Paths draw on hover (start visible, re-draw on hover) */
  .feat-card svg .draw-path {
    stroke-dasharray: 200;
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 0s;
  }
  .feat-card:hover svg .draw-path {
    stroke-dashoffset: 200;
    animation: draw-in 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  @keyframes draw-in {
    from { stroke-dashoffset: 200; }
    to   { stroke-dashoffset: 0; }
  }

  /* Spin on hover */
  .feat-card svg .spin-on-hover {
    transform-origin: center;
    transition: transform 0.7s cubic-bezier(0.34,1.56,0.64,1);
  }
  .feat-card:hover svg .spin-on-hover {
    transform: rotate(360deg);
  }

  /* Pulse ring — hidden at rest, pulses on hover */
  .feat-card svg .ring-pulse {
    opacity: 0;
  }
  .feat-card:hover svg .ring-pulse {
    animation: ring-pulse 1.2s ease-out infinite;
  }
  @keyframes ring-pulse {
    0%   { r: 6px; opacity: 0.7; }
    100% { r: 20px; opacity: 0; }
  }

  /* Bars — visible at rest small, grow on hover */
  .feat-card svg .bar {
    transform-origin: bottom;
    transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
  }
  /* Bars shown at resting height by default */
  .feat-card svg .bar-1 { transform: scaleY(0.5); }
  .feat-card svg .bar-2 { transform: scaleY(0.5); }
  .feat-card svg .bar-3 { transform: scaleY(0.5); }
  .feat-card svg .bar-4 { transform: scaleY(0.5); }

  .feat-card:hover svg .bar-1 { transform: scaleY(1); transition-delay: 0s; }
  .feat-card:hover svg .bar-2 { transform: scaleY(1); transition-delay: 0.07s; }
  .feat-card:hover svg .bar-3 { transform: scaleY(1); transition-delay: 0.14s; }
  .feat-card:hover svg .bar-4 { transform: scaleY(1); transition-delay: 0.21s; }

  /* Cursor blink — only on hover */
  .feat-card svg .cursor-blink { opacity: 1; }
  .feat-card:hover svg .cursor-blink {
    animation: blink 0.9s step-end infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* Orbit dot — shown at rest as static dot, orbits on hover */
  .feat-card svg .orbit-dot {
    opacity: 0.5;
  }
  .feat-card:hover svg .orbit-dot {
    opacity: 1;
    animation: orbit 1.5s linear infinite;
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(10px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
  }

  /* Clock hands wiggle on hover */
  .feat-card svg .clock-hand-min {
    transform-origin: 18px 18px;
    transition: transform 0.5s ease;
  }
  .feat-card:hover svg .clock-hand-min {
    animation: tick-min 2s linear infinite;
  }
  @keyframes tick-min {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .feat-card svg .clock-hand-hr {
    transform-origin: 18px 18px;
    transition: transform 0.5s ease;
  }
  .feat-card:hover svg .clock-hand-hr {
    animation: tick-hr 12s linear infinite;
  }
  @keyframes tick-hr {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Trend line draw on hover */
  .feat-card svg .trend-line {
    stroke-dasharray: 80;
    stroke-dashoffset: 0;
  }
  .feat-card:hover svg .trend-line {
    animation: draw-trend 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  @keyframes draw-trend {
    from { stroke-dashoffset: 80; }
    to   { stroke-dashoffset: 0; }
  }

  /* Glow pulse on icon dots */
  .feat-card svg .glow-dot {
    opacity: 1;
    transition: r 0.3s ease;
  }
  .feat-card:hover svg .glow-dot {
    animation: dot-pulse 1s ease-in-out infinite alternate;
  }
  @keyframes dot-pulse {
    from { opacity: 0.6; }
    to   { opacity: 1; transform: scale(1.4); }
  }

  /* Card text */
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

  .feat-card-tag svg { transition: transform 0.3s ease; }
  .feat-card:hover .feat-card-tag svg { transform: translateX(4px); }

  .feat-card-index {
    position: absolute;
    top: 1.5rem; right: 1.5rem;
    font-size: 0.7rem;
    font-weight: 800;
    color: rgba(15,17,23,0.08);
    letter-spacing: 0.04em;
  }

  .features-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  /* Marquee */
  .features-marquee-wrap {
    margin-top: 4.5rem;
    overflow: hidden;
    border-top: 1px solid #e8ecf4;
    border-bottom: 1px solid #e8ecf4;
    padding: 1rem 0;
    position: relative;
    z-index: 1;
    background: #fafbff;
    -webkit-mask-image: linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent);
    mask-image: linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent);
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
    cursor: default;
  }
  .features-marquee-item:hover { color: #4361ee; }
`;

/* ─────────────────────────────────────────────────────────────
   SVG ICONS — fully visible at rest, animated on card hover
───────────────────────────────────────────────────────────── */

/* 1. Assessment — clock face */
const AssessmentSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="13" stroke="#7c8cf8" strokeWidth="1.5" />
    {/* Pulse ring — invisible at rest, pulses on hover via CSS */}
    <circle cx="18" cy="18" r="6" fill="none" stroke="#7c8cf8" strokeWidth="1.2" className="ring-pulse" />
    {/* Tick marks */}
    {[0,60,120,180,240,300].map((deg, i) => (
      <line key={i}
        x1={18 + 10 * Math.cos((deg - 90) * Math.PI / 180)}
        y1={18 + 10 * Math.sin((deg - 90) * Math.PI / 180)}
        x2={18 + 13 * Math.cos((deg - 90) * Math.PI / 180)}
        y2={18 + 13 * Math.sin((deg - 90) * Math.PI / 180)}
        stroke="#7c8cf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.45"
      />
    ))}
    {/* Hour hand */}
    <line x1="18" y1="18" x2="18" y2="11"
      stroke="#7c8cf8" strokeWidth="2" strokeLinecap="round"
      className="clock-hand-hr"
    />
    {/* Minute hand */}
    <line x1="18" y1="18" x2="23" y2="21"
      stroke="#e879f9" strokeWidth="2" strokeLinecap="round"
      className="clock-hand-min"
    />
    <circle cx="18" cy="18" r="2" fill="#7c8cf8" />
    {/* Checkmark — always visible, re-draws on hover */}
    <path d="M12 18l4 4 8-8"
      stroke="#06d6a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="draw-path"
    />
  </svg>
);

/* 2. Notes — open book */
const NotesSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Left page */}
    <path d="M8 8h8a2 2 0 0 1 2 2v18a2 2 0 0 0-2-2H8V8z"
      stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(249,115,22,0.07)"
    />
    {/* Right page */}
    <path d="M28 8h-8a2 2 0 0 0-2 2v18a2 2 0 0 1 2-2h8V8z"
      stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(249,115,22,0.07)"
    />
    {/* Spine */}
    <line x1="18" y1="10" x2="18" y2="26" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2" />
    {/* Lines on left page — re-draw on hover */}
    <line x1="11" y1="14" x2="16" y2="14" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="draw-path" />
    <line x1="11" y1="17" x2="16" y2="17" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="draw-path" />
    <line x1="11" y1="20" x2="14" y2="20" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="draw-path" />
    {/* Star — spins on hover */}
    <path d="M24 10l1 3h3l-2.5 2 1 3L24 16.5 21.5 18l1-3L20 13h3z"
      fill="#f97316" className="spin-on-hover" style={{ transformOrigin: "24px 14px" }}
    />
  </svg>
);

/* 3. Video — screen + camera */
const VideoSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Screen */}
    <rect x="4" y="8" width="22" height="16" rx="3"
      stroke="#e879f9" strokeWidth="1.5" fill="rgba(232,121,249,0.07)"
    />
    {/* Camera arm */}
    <path d="M26 13l6-3v12l-6-3v-6z"
      stroke="#e879f9" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(232,121,249,0.07)"
    />
    {/* Play triangle — re-draws on hover */}
    <path d="M12 13l8 4-8 4v-8z"
      fill="#e879f9" className="draw-path"
    />
    {/* Live dot */}
    <circle cx="8" cy="28" r="3" fill="#f72585" />
    {/* Pulse ring around live dot */}
    <circle cx="8" cy="28" r="3" fill="none" stroke="#f72585" strokeWidth="1.2" className="ring-pulse" />
    <line x1="14" y1="28" x2="28" y2="28"
      stroke="rgba(232,121,249,0.4)" strokeWidth="1.5" strokeLinecap="round"
    />
  </svg>
);

/* 4. Code — terminal window */
const CodeSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Window */}
    <rect x="3" y="5" width="30" height="26" rx="4"
      stroke="#06d6a0" strokeWidth="1.5" fill="rgba(6,214,160,0.05)"
    />
    <line x1="3" y1="12" x2="33" y2="12" stroke="#06d6a0" strokeWidth="1.5" opacity="0.35" />
    {/* Traffic lights */}
    <circle cx="8"  cy="8.5" r="1.5" fill="#ff6b6b" />
    <circle cx="13" cy="8.5" r="1.5" fill="#ffd93d" />
    <circle cx="18" cy="8.5" r="1.5" fill="#6bcf7f" />
    {/* Brackets — re-draw on hover */}
    <path d="M10 19l-4 3 4 3"
      stroke="#06d6a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="draw-path"
    />
    <path d="M26 19l4 3-4 3"
      stroke="#06d6a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="draw-path"
    />
    <line x1="20" y1="17" x2="16" y2="27"
      stroke="#7c8cf8" strokeWidth="1.5" strokeLinecap="round"
      className="draw-path"
    />
    {/* Blinking cursor */}
    <rect x="22" y="23" width="2" height="4" rx="1" fill="#06d6a0" className="cursor-blink" />
  </svg>
);

/* 5. Interview — two people */
const InterviewSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Person 1 */}
    <circle cx="11" cy="11" r="5" stroke="#ffd166" strokeWidth="1.5" fill="rgba(255,209,102,0.1)" />
    <path d="M3 28c0-4.4 3.6-8 8-8s8 3.6 8 8"
      stroke="#ffd166" strokeWidth="1.5" strokeLinecap="round"
    />
    {/* Person 2 */}
    <circle cx="25" cy="11" r="5" stroke="#f97316" strokeWidth="1.5" fill="rgba(249,115,22,0.1)" />
    <path d="M17 28c0-4.4 3.6-8 8-8s8 3.6 8 8"
      stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"
    />
    {/* Connection bridge */}
    <line x1="16" y1="11" x2="20" y2="11"
      stroke="rgba(255,209,102,0.4)" strokeWidth="1" strokeDasharray="2 2"
    />
    {/* Orbiting dot */}
    <circle cx="18" cy="11" r="2.5" fill="#ffd166"
      className="orbit-dot" style={{ transformOrigin: "18px 11px" }}
    />
    {/* Star — spins on hover */}
    <path d="M18 3l.6 1.8H20.4l-1.5 1.1.6 1.8L18 6.6l-1.5 1.1.6-1.8-1.5-1.1h1.8z"
      fill="#ffd166" className="spin-on-hover" style={{ transformOrigin: "18px 5px" }}
    />
  </svg>
);

/* 6. Analytics — bar chart + trend line */
const AnalyticsSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Axes */}
    <line x1="6" y1="30" x2="30" y2="30" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="6"  x2="6"  y2="30" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
    {/* Bars — half-height at rest, full on hover */}
    <rect x="9"  y="25" width="4" height="5"  rx="2" fill="#3b82f6"  className="bar bar-1" />
    <rect x="15" y="22" width="4" height="8"  rx="2" fill="#7c8cf8"  className="bar bar-2" />
    <rect x="21" y="24" width="4" height="6"  rx="2" fill="#3b82f6"  className="bar bar-3" />
    <rect x="27" y="20" width="4" height="10" rx="2" fill="#e879f9"  className="bar bar-4" />
    {/* Trend line — re-draws on hover */}
    <path d="M9 22 15 16 21 20 27 12"
      stroke="#06d6a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      fill="none" className="trend-line"
    />
    {/* Trend dots */}
    {[[9,22],[15,16],[21,20],[27,12]].map(([x,y], i) => (
      <circle key={i} cx={x} cy={y} r="2.5" fill="#06d6a0" className="glow-dot" />
    ))}
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   DATA
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

const marqueeItems = [
  { label: "React" }, { label: "Node.js" }, { label: "MongoDB" },
  { label: "TypeScript" }, { label: "Docker" }, { label: "Python" },
  { label: "AWS" }, { label: "Kubernetes" },
];

/* ─────────────────────────────────────────────────────────────
   CARD COMPONENT
───────────────────────────────────────────────────────────── */
const FeatureCard = ({ feature, index }) => {
  const { SvgIcon, title, description, tag, accent, glow, iconBg, iconBorder, border, shadow } = feature;
  return (
    <motion.div
      className="feat-card"
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        "--card-glow": glow,
        "--card-border": border,
        "--card-shadow": shadow,
        "--card-icon-bg": iconBg,
        "--card-icon-border": iconBorder,
        "--card-accent": accent,
      }}
    >
      {/* Top-right glow */}
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 100, height: 100,
        borderRadius: "50%",
        background: glow,
        filter: "blur(24px)",
        pointerEvents: "none",
      }} />

      <div className="feat-svg-wrap">
        <SvgIcon />
      </div>

      <div className="feat-card-index">0{index + 1}</div>
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
   SECTION
───────────────────────────────────────────────────────────── */
const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="features-section" ref={sectionRef}>
      <style>{styles}</style>

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 580 }}
        >
          <div className="features-eyebrow">
            <span className="features-eyebrow-dot" />
            Why Choose Us
          </div>

          <h2 className="features-title">
            <h2 style={{fontFamily:"DaughterOfFortune"}
            }>Everything</h2> you need to{" "}
            <span className="features-title-accent">succeed</span>
          </h2>

          <p className="features-subtitle">
            A complete learning operating system — from first principles to
            production-ready code and your first offer letter.
          </p>

          <svg className="features-underline" viewBox="0 0 120 6" fill="none">
            <defs>
              <linearGradient id="ul-grad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#7c8cf8" />
                <stop offset="50%"  stopColor="#e879f9" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <path
              d="M2 4 Q30 1 60 4 Q90 7 118 4"
              stroke="url(#ul-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: isInView ? 0 : 300,
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s",
              }}
            />
          </svg>
        </motion.div>

        {/* Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Marquee */}
        <div className="features-marquee-wrap">
          <div className="features-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="features-marquee-item">
                ✦ {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;