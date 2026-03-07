import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { THEME } from "./theme";
import SectionReveal from "./SectionReveal";

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

  .courses-section {
    padding: 7rem 2rem;
    background: #f8faff;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* subtle cross-hatch grid */
  .courses-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(67,97,238,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(67,97,238,0.04) 1px, transparent 1px);
    background-size: 44px 44px;
    pointer-events: none;
    z-index: 0;
  }

  /* top accent bar */
  .courses-section::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #f97316 0%, #4361ee 50%, #06d6a0 100%);
    z-index: 2;
  }

  .courses-inner {
    max-width: 1240px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── eyebrow ── */
  .courses-eyebrow {
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
  .courses-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4361ee;
    animation: c-dot-pulse 2s ease-in-out infinite;
  }
  @keyframes c-dot-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.7); opacity: 0.4; }
  }

  .courses-title {
    font-family: DaughterOfFortune;
    font-size: clamp(2.2rem, 4.5vw, 3.5rem);
    font-weight: 800;
    color: #0f1117;
    line-height: 1.05;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }
  .courses-title-accent {
    background: linear-gradient(90deg, #4361ee 0%, #e879f9 50%, #f97316 100%);
    -webkit-background-clip: text;
    font-family: roboto;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 100%;
    animation: c-grad-shift 5s ease infinite;
  }
  @keyframes c-grad-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .courses-subtitle {
    font-size: 1.05rem;
    color: #64748b;
    max-width: 500px;
    line-height: 1.75;
  }

  /* ── grid ── */
  .courses-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.4rem;
    margin-top: 4rem;
  }
  @media (max-width: 980px)  { .courses-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 600px)  { .courses-grid { grid-template-columns: 1fr; } }

  /* ── card ── */
  .course-card {
    position: relative;
    background: #ffffff;
    border: 1px solid #e4e9f5;
    border-radius: 22px;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    transition:
      border-color 0.35s ease,
      transform 0.38s cubic-bezier(0.34,1.56,0.64,1),
      box-shadow 0.35s ease;
    display: flex;
    flex-direction: column;
  }

  .course-card:hover {
    transform: translateY(-10px) scale(1.015);
    border-color: var(--cc-border, rgba(67,97,238,0.3));
    box-shadow:
      0 24px 56px -12px var(--cc-shadow, rgba(67,97,238,0.13)),
      0 4px 16px -4px rgba(0,0,0,0.05);
  }

  /* ── card top banner ── */
  .course-card-banner {
    position: relative;
    height: 96px;
    background: var(--cc-banner-bg, #eef1ff);
    overflow: hidden;
    flex-shrink: 0;
    transition: background 0.4s ease;
  }

  .course-card:hover .course-card-banner {
    background: var(--cc-banner-hover, #e0e6ff);
  }

  /* animated SVG in banner */
  .course-card-banner svg {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
  }

  /* banner watermark icon (large) */
  .course-card-watermark {
    position: absolute;
    bottom: -8px; right: 16px;
    font-size: 4.5rem;
    color: var(--cc-accent, #4361ee);
    opacity: 0.08;
    transform: rotate(10deg);
    transition: opacity 0.4s ease, transform 0.4s ease;
    line-height: 1;
    pointer-events: none;
  }
  .course-card:hover .course-card-watermark {
    opacity: 0.14;
    transform: rotate(6deg) scale(1.08);
  }

  /* icon badge floating over banner/body boundary */
  .course-card-icon-badge {
    position: absolute;
    left: 1.5rem;
    bottom: -22px;
    width: 52px; height: 52px;
    border-radius: 14px;
    background: #ffffff;
    border: 2px solid var(--cc-border, rgba(67,97,238,0.2));
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem;
    box-shadow: 0 4px 16px -4px var(--cc-shadow, rgba(67,97,238,0.18));
    z-index: 2;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
  }
  .course-card:hover .course-card-icon-badge {
    transform: scale(1.12) rotate(-4deg);
    box-shadow: 0 8px 24px -4px var(--cc-shadow, rgba(67,97,238,0.25));
  }

  /* ── card body ── */
  .course-card-body {
    padding: 2.2rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .course-card-tags {
    display: flex;
    gap: 0.45rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .course-tag {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    letter-spacing: 0.04em;
  }
  .course-tag-duration {
    background: #f1f4fd;
    color: #4a5568;
  }
  .course-tag-level {
    background: var(--cc-tag-bg, rgba(67,97,238,0.08));
    color: var(--cc-accent, #4361ee);
    border: 1px solid var(--cc-tag-border, rgba(67,97,238,0.15));
  }

  .course-card-title {
    font-family: 'roboto', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f1117;
    margin-bottom: 0.55rem;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  .course-card-desc {
    font-size: 0.855rem;
    color: #64748b;
    line-height: 1.7;
    flex: 1;
  }

  /* ── card footer ── */
  .course-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-top: 1px solid #f0f3fa;
    margin-top: 1rem;
  }

  .course-enrolled {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 500;
  }

  .course-enrolled-avatars {
    display: flex;
  }

  .course-avatar {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-left: -6px;
    font-size: 0.55rem;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700;
    color: white;
  }
  .course-avatar:first-child { margin-left: 0; }

  /* ── CTA button ── */
  .course-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    color: var(--cc-accent, #4361ee);
    background: var(--cc-tag-bg, rgba(67,97,238,0.07));
    border: 1px solid var(--cc-tag-border, rgba(67,97,238,0.15));
    padding: 7px 14px;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    white-space: nowrap;
  }
  .course-cta:hover {
    background: var(--cc-accent, #4361ee);
    color: #fff;
    transform: translateX(2px);
    box-shadow: 0 4px 14px -4px var(--cc-shadow, rgba(67,97,238,0.3));
  }
  .course-cta svg {
    transition: transform 0.25s ease;
  }
  .course-cta:hover svg {
    transform: translateX(3px);
  }

  /* ── progress bar ── */
  .course-progress-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 1rem;
  }
  .course-progress-track {
    flex: 1;
    height: 4px;
    background: #f0f3fa;
    border-radius: 100px;
    overflow: hidden;
  }
  .course-progress-fill {
    height: 100%;
    border-radius: 100px;
    background: var(--cc-accent, #4361ee);
    width: 0%;
    transition: width 1s cubic-bezier(0.4,0,0.2,1) var(--cc-progress-delay, 0s);
  }
  .course-card.in-view .course-progress-fill {
    width: var(--cc-progress, 70%);
  }
  .course-progress-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--cc-accent, #4361ee);
    min-width: 32px;
    text-align: right;
  }

  /* animated SVG path drawing */
  .cc-anim-path {
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    transition: stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1) 0.2s;
  }
  .course-card:hover .cc-anim-path { stroke-dashoffset: 0; }

  .cc-anim-fill {
    opacity: 0;
    transition: opacity 0.5s ease 0.5s;
  }
  .course-card:hover .cc-anim-fill { opacity: 1; }

  /* floating dot animation */
  @keyframes cc-float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
  }
  .course-card:hover .cc-float { animation: cc-float 2s ease-in-out infinite; }

  /* spin */
  .cc-spin { transition: transform 0.8s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
  .course-card:hover .cc-spin { transform: rotate(360deg); }

  /* bar grow */
  .cc-bar { transform-origin: bottom; transform: scaleY(0); transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1); }
  .course-card:hover .cc-bar-1 { transform: scaleY(1); transition-delay: 0s; }
  .course-card:hover .cc-bar-2 { transform: scaleY(1); transition-delay: 0.08s; }
  .course-card:hover .cc-bar-3 { transform: scaleY(1); transition-delay: 0.16s; }
  .course-card:hover .cc-bar-4 { transform: scaleY(1); transition-delay: 0.24s; }

  /* pulse ring */
  @keyframes cc-ring { 0% { r:4; opacity:.7; } 100% { r:16; opacity:0; } }
  .course-card:hover .cc-ring { animation: cc-ring 1.3s ease-out infinite; }

  /* orbit */
  @keyframes cc-orbit {
    from { transform: rotate(0deg) translateX(14px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(14px) rotate(-360deg); }
  }
  .course-card:hover .cc-orbit { animation: cc-orbit 2s linear infinite; }

  /* dash flow */
  @keyframes cc-dash { to { stroke-dashoffset: -20; } }
  .course-card:hover .cc-dash-flow { animation: cc-dash 0.6s linear infinite; }

  /* orbs */
  .courses-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
`;

/* ─────────────────────────────────────────────────────────────
   BANNER SVG ILLUSTRATIONS
───────────────────────────────────────────────────────────── */

const MernBannerSVG = () => (
  <svg viewBox="0 0 400 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="96" fill="#eef6ff"/>
    {/* flowing circuit lines */}
    <path d="M0 48 Q50 20 100 48 Q150 76 200 48 Q250 20 300 48 Q350 76 400 48" stroke="#61dafb" strokeWidth="1.5" fill="none" className="cc-anim-path" opacity="0.5"/>
    <path d="M0 68 Q60 40 120 68 Q180 96 240 68 Q300 40 360 68 L400 68" stroke="#3b82f6" strokeWidth="1" fill="none" className="cc-anim-path" strokeDasharray="6 3" opacity="0.3"/>
    {/* React atom */}
    <g transform="translate(320,48)">
      <circle cx="0" cy="0" r="4" fill="#61dafb"/>
      <ellipse cx="0" cy="0" rx="18" ry="6" stroke="#61dafb" strokeWidth="1.2" fill="none" className="cc-spin" opacity="0.7"/>
      <ellipse cx="0" cy="0" rx="18" ry="6" stroke="#61dafb" strokeWidth="1.2" fill="none" className="cc-spin" style={{animationDelay:'0.3s'}} transform="rotate(60)" opacity="0.5"/>
      <ellipse cx="0" cy="0" rx="18" ry="6" stroke="#61dafb" strokeWidth="1.2" fill="none" className="cc-spin" style={{animationDelay:'0.6s'}} transform="rotate(120)" opacity="0.5"/>
    </g>
    {/* node hexagon */}
    <g transform="translate(60,46)">
      <path d="M0-16 L14-8 L14 8 L0 16 L-14 8 L-14-8Z" stroke="#68a063" strokeWidth="1.3" fill="none" className="cc-anim-path" opacity="0.6"/>
      <circle cx="0" cy="0" r="3" fill="#68a063" className="cc-float"/>
    </g>
    {/* MongoDB leaf */}
    <g transform="translate(190,50)">
      <path d="M0-14 C4-8 6 2 0 14 C-6 2-4-8 0-14Z" stroke="#47a248" strokeWidth="1.3" fill="none" className="cc-anim-path" opacity="0.6"/>
      <line x1="0" y1="14" x2="0" y2="20" stroke="#47a248" strokeWidth="1.3" opacity="0.4"/>
    </g>
    {/* dots */}
    {[40,80,140,240,280,360].map((x,i)=>(
      <circle key={i} cx={x} cy={20 + (i%2)*56} r="2.5" fill="#4361ee" opacity="0.12" className="cc-anim-fill"/>
    ))}
  </svg>
);

const DsaBannerSVG = () => (
  <svg viewBox="0 0 400 96" fill="none">
    <rect width="400" height="96" fill="#fffbeb"/>
    {/* binary tree */}
    <g opacity="0.7">
      <circle cx="200" cy="20" r="8" stroke="#f59e0b" strokeWidth="1.5" fill="none" className="cc-anim-path"/>
      <circle cx="140" cy="52" r="8" stroke="#f59e0b" strokeWidth="1.5" fill="none" className="cc-anim-path"/>
      <circle cx="260" cy="52" r="8" stroke="#f59e0b" strokeWidth="1.5" fill="none" className="cc-anim-path"/>
      <circle cx="110" cy="80" r="6" fill="#f59e0b" className="cc-anim-fill" opacity="0.5"/>
      <circle cx="168" cy="80" r="6" fill="#f59e0b" className="cc-anim-fill" opacity="0.5"/>
      <circle cx="232" cy="80" r="6" fill="#f59e0b" className="cc-anim-fill" opacity="0.5"/>
      <circle cx="290" cy="80" r="6" fill="#f59e0b" className="cc-anim-fill" opacity="0.5"/>
      <line x1="192" y1="26" x2="148" y2="45" stroke="#f59e0b" strokeWidth="1.2"/>
      <line x1="208" y1="26" x2="252" y2="45" stroke="#f59e0b" strokeWidth="1.2"/>
      <line x1="133" y1="58" x2="114" y2="75" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
      <line x1="147" y1="58" x2="165" y2="75" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
      <line x1="253" y1="58" x2="235" y2="75" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
      <line x1="267" y1="58" x2="287" y2="75" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
    </g>
    {/* scanning beam */}
    <line x1="60" y1="48" x2="340" y2="48" stroke="#f59e0b" strokeWidth="1" strokeDasharray="8 4" className="cc-dash-flow" opacity="0.3"/>
  </svg>
);

const SystemDesignBannerSVG = () => (
  <svg viewBox="0 0 400 96" fill="none">
    <rect width="400" height="96" fill="#eef2ff"/>
    {/* server boxes */}
    {[[60,30],[180,30],[300,30],[60,62],[180,62],[300,62]].map(([x,y],i)=>(
      <rect key={i} x={x-18} y={y-12} width="36" height="24" rx="4" stroke="#4361ee" strokeWidth="1.3" fill="none" className="cc-anim-path" opacity="0.5"/>
    ))}
    {/* connection lines */}
    <line x1="78" y1="36" x2="162" y2="36" stroke="#4361ee" strokeWidth="1" strokeDasharray="5 3" className="cc-dash-flow" opacity="0.4"/>
    <line x1="198" y1="36" x2="282" y2="36" stroke="#4361ee" strokeWidth="1" strokeDasharray="5 3" className="cc-dash-flow" opacity="0.4"/>
    <line x1="78" y1="68" x2="162" y2="68" stroke="#4361ee" strokeWidth="1" strokeDasharray="5 3" className="cc-dash-flow" opacity="0.4"/>
    <line x1="198" y1="68" x2="282" y2="68" stroke="#4361ee" strokeWidth="1" strokeDasharray="5 3" className="cc-dash-flow" opacity="0.4"/>
    <line x1="60" y1="42" x2="60" y2="50" stroke="#4361ee" strokeWidth="1" opacity="0.3"/>
    <line x1="180" y1="42" x2="180" y2="50" stroke="#4361ee" strokeWidth="1" opacity="0.3"/>
    <line x1="300" y1="42" x2="300" y2="50" stroke="#4361ee" strokeWidth="1" opacity="0.3"/>
    {/* orbit dot */}
    <circle cx="180" cy="48" r="4" fill="#4361ee" className="cc-orbit" opacity="0.6"/>
    {/* load balancer label */}
    <rect x="155" y="44" width="50" height="8" rx="4" fill="#4361ee" opacity="0.08" className="cc-anim-fill"/>
  </svg>
);

const DevOpsBannerSVG = () => (
  <svg viewBox="0 0 400 96" fill="none">
    <rect width="400" height="96" fill="#eff8ff"/>
    {/* Docker whale */}
    <g transform="translate(80,48)" opacity="0.7">
      <rect x="-24" y="-8" width="48" height="20" rx="10" stroke="#2496ed" strokeWidth="1.5" fill="none" className="cc-anim-path"/>
      {[[-12,-18],[-4,-18],[4,-18],[12,-18],[-8,-8],[0,-8],[8,-8]].map(([cx,cy],i)=>(
        <rect key={i} x={cx-3} y={cy-3} width="6" height="6" rx="1" stroke="#2496ed" strokeWidth="1" fill="none" className="cc-anim-path"/>
      ))}
      <circle cx="28" cy="-12" r="5" fill="none" stroke="#2496ed" strokeWidth="1.5" className="cc-ring"/>
    </g>
    {/* CI/CD pipeline */}
    <g transform="translate(220,48)">
      {[0,40,80].map((x,i)=>(
        <g key={i}>
          <circle cx={x} cy="0" r="10" stroke="#2496ed" strokeWidth="1.3" fill="none" className="cc-anim-path"/>
          <circle cx={x} cy="0" r="3" fill="#2496ed" className="cc-anim-fill" opacity="0.7"/>
          {i<2 && <path d={`M${x+10} 0 L${x+30} 0`} stroke="#2496ed" strokeWidth="1" strokeDasharray="4 2" className="cc-dash-flow"/>}
        </g>
      ))}
    </g>
    {/* cloud */}
    <path d="M160 32 Q165 20 178 24 Q180 14 192 18 Q204 14 206 24 Q218 20 216 32 Z" stroke="#2496ed" strokeWidth="1.3" fill="none" className="cc-anim-path" opacity="0.5"/>
    <line x1="180" y1="32" x2="180" y2="44" stroke="#2496ed" strokeWidth="1" strokeDasharray="3 2" opacity="0.4"/>
  </svg>
);

const PythonBannerSVG = () => (
  <svg viewBox="0 0 400 96" fill="none">
    <rect width="400" height="96" fill="#eff6ff"/>
    {/* Python snake */}
    <path d="M40 70 Q60 40 100 48 Q140 56 160 30 Q180 10 220 24 Q260 38 280 20 Q300 8 340 30 Q360 42 380 28"
      stroke="#3776ab" strokeWidth="2" fill="none" strokeLinecap="round" className="cc-anim-path" opacity="0.6"/>
    {/* snake head */}
    <circle cx="380" cy="28" r="6" fill="#ffd43b" className="cc-anim-fill" opacity="0.8"/>
    <circle cx="383" cy="26" r="1.5" fill="#3776ab"/>
    {/* grid / data frames */}
    {[[60,48],[140,55],[220,42],[300,52]].map(([x,y],i)=>(
      <g key={i}>
        <rect x={x-10} y={y-8} width="20" height="16" rx="2" stroke="#3776ab" strokeWidth="1" fill="none" opacity="0.3"/>
        <line x1={x-10} y1={y} x2={x+10} y2={y} stroke="#3776ab" strokeWidth="0.8" opacity="0.2"/>
        <line x1={x} y1={y-8} x2={x} y2={y+8} stroke="#3776ab" strokeWidth="0.8" opacity="0.2"/>
      </g>
    ))}
    {/* floating asterisks (stars) */}
    {[80,200,320].map((x,i)=>(
      <text key={i} x={x} y={20+i*10} fontSize="14" fill="#ffd43b" opacity="0.3" className="cc-float">✦</text>
    ))}
  </svg>
);

const MobileBannerSVG = () => (
  <svg viewBox="0 0 400 96" fill="none">
    <rect width="400" height="96" fill="#f0fdf4"/>
    {/* phone silhouette */}
    <g transform="translate(190,48)">
      <rect x="-16" y="-32" width="32" height="64" rx="6" stroke="#06d6a0" strokeWidth="1.5" fill="none" className="cc-anim-path"/>
      <line x1="-6" y1="-26" x2="6" y2="-26" stroke="#06d6a0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <circle cx="0" cy="27" r="3" stroke="#06d6a0" strokeWidth="1" fill="none" opacity="0.5"/>
      {/* screen content */}
      <rect x="-10" y="-18" width="20" height="12" rx="2" fill="#06d6a0" opacity="0.1" className="cc-anim-fill"/>
      <line x1="-8" y1="-4" x2="8" y2="-4" stroke="#06d6a0" strokeWidth="1" strokeLinecap="round" opacity="0.4" className="cc-anim-fill"/>
      <line x1="-8" y1="0" x2="4" y2="0" stroke="#06d6a0" strokeWidth="1" strokeLinecap="round" opacity="0.3" className="cc-anim-fill"/>
    </g>
    {/* wifi rings */}
    {[14,22,30].map((r,i)=>(
      <circle key={i} cx="190" cy="48" r={r} stroke="#06d6a0" strokeWidth="1" fill="none" opacity={0.08+i*0.05} className="cc-ring" style={{animationDelay:`${i*0.3}s`}}/>
    ))}
    {/* React Native logo elements */}
    <g transform="translate(80,48)" opacity="0.6">
      <circle cx="0" cy="0" r="5" fill="#61dafb"/>
      <ellipse cx="0" cy="0" rx="22" ry="7" stroke="#61dafb" strokeWidth="1.2" fill="none" className="cc-spin"/>
      <ellipse cx="0" cy="0" rx="22" ry="7" stroke="#61dafb" strokeWidth="1.2" fill="none" style={{transform:'rotate(60deg)'}} className="cc-spin"/>
    </g>
    <g transform="translate(310,48)" opacity="0.6">
      <circle cx="0" cy="0" r="5" fill="#61dafb"/>
      <ellipse cx="0" cy="0" rx="22" ry="7" stroke="#61dafb" strokeWidth="1.2" fill="none" className="cc-spin"/>
    </g>
    {/* zigzag path */}
    <path d="M0 80 L60 60 L120 80 L180 60 L240 80 L300 60 L360 80 L400 60"
      stroke="#06d6a0" strokeWidth="1" fill="none" className="cc-anim-path" opacity="0.25"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   COURSES DATA
───────────────────────────────────────────────────────────── */
const courses = [
  {
    title: "MERN Stack Development",
    description: "Master MongoDB, Express.js, React, and Node.js to build full-stack web applications from scratch.",
    BannerSVG: MernBannerSVG,
    iconChar: "⚛️",
    accent: "#2563eb",
    bannerBg: "#eef6ff",
    bannerHover: "#dbeafe",
    border: "rgba(37,99,235,0.25)",
    shadow: "rgba(37,99,235,0.12)",
    tagBg: "rgba(37,99,235,0.07)",
    tagBorder: "rgba(37,99,235,0.14)",
    duration: "16 weeks",
    level: "Intermediate",
    levelColor: "#f97316",
    students: "2.5k+",
    avatarColors: ["#4361ee","#7209b7","#06d6a0"],
  },
  {
    title: "Data Structures & Algorithms",
    description: "Crack FAANG interviews with a deep mastery of DSA, patterns, and time-complexity analysis.",
    BannerSVG: DsaBannerSVG,
    iconChar: "🧩",
    accent: "#d97706",
    bannerBg: "#fffbeb",
    bannerHover: "#fef3c7",
    border: "rgba(217,119,6,0.25)",
    shadow: "rgba(217,119,6,0.12)",
    tagBg: "rgba(217,119,6,0.07)",
    tagBorder: "rgba(217,119,6,0.14)",
    duration: "12 weeks",
    level: "Beginner",
    levelColor: "#16a34a",
    students: "3k+",
    
    avatarColors: ["#f59e0b","#ef4444","#4361ee"],
  },
  {
    title: "System Design",
    description: "Design distributed, fault-tolerant systems at scale. Ideal for mid–senior engineers levelling up.",
    BannerSVG: SystemDesignBannerSVG,
    iconChar: "🏗️",
    accent: "#4361ee",
    bannerBg: "#eef2ff",
    bannerHover: "#e0e7ff",
    border: "rgba(67,97,238,0.25)",
    shadow: "rgba(67,97,238,0.12)",
    tagBg: "rgba(67,97,238,0.07)",
    tagBorder: "rgba(67,97,238,0.14)",
    duration: "10 weeks",
    level: "Advanced",
    levelColor: "#dc2626",
    students: "1.2k+",
    
    avatarColors: ["#4361ee","#06d6a0","#f72585"],
  },
  {
    title: "DevOps & Cloud",
    description: "Master Docker, Kubernetes, CI/CD pipelines, and deploy at scale on AWS, GCP, and Azure.",
    BannerSVG: DevOpsBannerSVG,
    iconChar: "☁️",
    accent: "#0284c7",
    bannerBg: "#eff8ff",
    bannerHover: "#dbeafe",
    border: "rgba(2,132,199,0.25)",
    shadow: "rgba(2,132,199,0.12)",
    tagBg: "rgba(2,132,199,0.07)",
    tagBorder: "rgba(2,132,199,0.14)",
    duration: "14 weeks",
    level: "Intermediate",
    levelColor: "#f97316",
    students: "1.8k+",
    
    avatarColors: ["#0284c7","#7209b7","#ffd166"],
  },
  {
    title: "Python Full Stack",
    description: "Build end-to-end web apps with Python, Django REST Framework, and a React front-end.",
    BannerSVG: PythonBannerSVG,
    iconChar: "🐍",
    accent: "#1d4ed8",
    bannerBg: "#eff6ff",
    bannerHover: "#dbeafe",
    border: "rgba(29,78,216,0.25)",
    shadow: "rgba(29,78,216,0.12)",
    tagBg: "rgba(29,78,216,0.07)",
    tagBorder: "rgba(29,78,216,0.14)",
    duration: "16 weeks",
    level: "Beginner",
    levelColor: "#16a34a",
    students: "2.2k+",
    avatarColors: ["#1d4ed8","#f59e0b","#06d6a0"],
  },
  {
    title: "Mobile Development",
    description: "Ship polished iOS & Android apps using React Native, Expo, and modern mobile patterns.",
    BannerSVG: MobileBannerSVG,
    iconChar: "📱",
    accent: "#059669",
    bannerBg: "#f0fdf4",
    bannerHover: "#dcfce7",
    border: "rgba(5,150,105,0.25)",
    shadow: "rgba(5,150,105,0.12)",
    tagBg: "rgba(5,150,105,0.07)",
    tagBorder: "rgba(5,150,105,0.14)",
    duration: "12 weeks",
    level: "Intermediate",
    levelColor: "#f97316",
    students: "1.5k+",
    
    avatarColors: ["#059669","#4361ee","#f72585"],
  },
];

/* ─────────────────────────────────────────────────────────────
   COURSE CARD
───────────────────────────────────────────────────────────── */
const CourseCard = ({ course, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`course-card${inView ? " in-view" : ""}`}
      initial={{ opacity: 0, y: 52, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        "--cc-banner-bg":      course.bannerBg,
        "--cc-banner-hover":   course.bannerHover,
        "--cc-accent":         course.accent,
        "--cc-border":         course.border,
        "--cc-shadow":         course.shadow,
        "--cc-tag-bg":         course.tagBg,
        "--cc-tag-border":     course.tagBorder,
        "--cc-progress":       `${course.progress}%`,
        "--cc-progress-delay": `${index * 0.1 + 0.4}s`,
      }}
    >
      {/* ── banner ── */}
      <div className="course-card-banner">
        <course.BannerSVG />
        <span className="course-card-watermark">{course.iconChar}</span>
      </div>

      {/* ── floating icon badge ── */}
      <div className="course-card-icon-badge">
        {course.iconChar}
      </div>

      {/* ── body ── */}
      <div className="course-card-body">
        <div className="course-card-tags">
          <span className="course-tag course-tag-duration">{course.duration}</span>
          <span
            className="course-tag course-tag-level"
            style={{ background: `${course.levelColor}12`, color: course.levelColor, border: `1px solid ${course.levelColor}20` }}
          >
            {course.level}
          </span>
        </div>

        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-desc">{course.description}</p>
      </div>

      {/* ── footer ── */}
      <div className="course-card-footer">
        <div className="course-enrolled">
          <div className="course-enrolled-avatars">
            {course.avatarColors.map((c, i) => (
              <div key={i} className="course-avatar" style={{ background: c }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span>{course.students} enrolled</span>
        </div>

        <a className="course-cta" href="/register">
          Register now
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   COURSES SECTION
───────────────────────────────────────────────────────────── */
const CoursesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="courses-section" ref={sectionRef}>
      <style>{styles}</style>

      {/* bg orbs */}
      <div className="courses-orb" style={{ width:520, height:520, background:"radial-gradient(circle, rgba(67,97,238,0.05) 0%, transparent 70%)", top:"-12%", right:"-8%" }} />
      <div className="courses-orb" style={{ width:380, height:380, background:"radial-gradient(circle, rgba(6,214,160,0.05) 0%, transparent 70%)", bottom:"0%", left:"-5%" }} />

      <div className="courses-inner">

        {/* ── header ── */}
        <SectionReveal>
          <div style={{ maxWidth: 600 }}>
            <div className="courses-eyebrow">
              <span className="courses-eyebrow-dot" />
              Our Programs
            </div>

            <h2 className="courses-title">
              Comprehensive{" "}
              <span className="courses-title-accent">course catalog</span>
            </h2>

            <p className="courses-subtitle">
              Production-grade curricula built with hiring managers — every course
              ships you closer to your first or next role.
            </p>

            {/* animated underline */}
            <svg width="130" height="8" viewBox="0 0 130 8" fill="none" style={{ display:"block", marginTop:"1.4rem" }}>
              <defs>
                <linearGradient id="cu-ul" x1="0" y1="0" x2="130" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#f97316"/>
                  <stop offset="50%"  stopColor="#4361ee"/>
                  <stop offset="100%" stopColor="#06d6a0"/>
                </linearGradient>
              </defs>
              <path
                d="M2 5 Q32 2 65 5 Q98 8 128 5"
                stroke="url(#cu-ul)"
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
          </div>
        </SectionReveal>

        {/* ── grid ── */}
        <div className="courses-grid">
          {courses.map((course, index) => (
            <CourseCard key={course.title} course={course} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoursesSection;