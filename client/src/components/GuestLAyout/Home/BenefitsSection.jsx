import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { THEME } from "./theme";
import SectionReveal from "./SectionReveal";
import RangeSlider from "../RangeSlider";

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

  .benefits-section {
    padding: 7rem 2rem;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* faint radial wash at top */
  .benefits-section::before {
    content: '';
    position: absolute;
    top: -200px; left: 50%;
    transform: translateX(-50%);
    width: 800px; height: 500px;
    background: radial-gradient(ellipse, rgba(67,97,238,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .benefits-inner {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── eyebrow ── */
  .benefits-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #4361ee;
    margin-bottom: 1rem;
  }
  .benefits-eyebrow-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #4361ee;
    animation: b-pulse 2.2s ease-in-out infinite;
  }
  @keyframes b-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.8); opacity: 0.35; }
  }

  .benefits-title {
    font-family:DaughterOfFortune ;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: #0f1117;
    line-height: 1.08;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
    
  }
  .benefits-title em {
    font-style: normal;
    font-family:roboto;
    background: linear-gradient(90deg, #4361ee 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-left:30px;
  }
  .benefits-subtitle {
    font-size: 1rem;
    color: #64748b;
    line-height: 1.75;
    max-width: 440px;
  }

  /* ── grid ── */
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
    margin-top: 3.5rem;
    margin-bottom: 4rem;
  }
  @media (max-width: 900px) { .benefits-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 500px) { .benefits-grid { grid-template-columns: 1fr; } }

  /* ── benefit card ── */
  .benefit-card {
    background: #ffffff;
    border: 1px solid #e8ecf4;
    border-radius: 20px;
    padding: 2rem 1.5rem;
    text-align: center;
    cursor: default;
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease,
      transform 0.32s cubic-bezier(0.34,1.4,0.64,1);
    position: relative;
    overflow: hidden;
  }

  /* top edge colour strip — hidden by default, reveals on hover */
  .benefit-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--bc-accent, #4361ee);
    border-radius: 20px 20px 0 0;
    opacity: 0;
    transform: scaleX(0.4);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .benefit-card:hover {
    border-color: var(--bc-border, rgba(67,97,238,0.22));
    box-shadow: 0 16px 40px -12px var(--bc-shadow, rgba(67,97,238,0.1));
    transform: translateY(-6px);
  }

  .benefit-card:hover::before {
    opacity: 1;
    transform: scaleX(1);
  }

  /* icon container */
  .benefit-icon-wrap {
    width: 64px; height: 64px;
    border-radius: 18px;
    background: var(--bc-icon-bg, rgba(67,97,238,0.06));
    border: 1px solid var(--bc-icon-border, rgba(67,97,238,0.1));
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.4rem;
    transition: transform 0.32s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease;
  }
  .benefit-card:hover .benefit-icon-wrap {
    transform: scale(1.1) rotate(-4deg);
    box-shadow: 0 6px 20px -4px var(--bc-shadow, rgba(67,97,238,0.18));
  }

  .benefit-card-title {
    font-family: 'roboto', sans-serif;
    font-size: 0.98rem;
    font-weight: 700;
    color: #0f1117;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }
  .benefit-card-desc {
    font-size: 0.845rem;
    color: #64748b;
    line-height: 1.65;
  }

  /* SVG animations */
  .b-draw {
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    transition: stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1) 0.05s;
  }
  .benefit-card:hover .b-draw { stroke-dashoffset: 0; }

  .b-fill {
    opacity: 0;
    transition: opacity 0.45s ease 0.35s;
  }
  .benefit-card:hover .b-fill { opacity: 1; }

  .b-spin {
    transform-origin: center;
    transition: transform 0.7s cubic-bezier(0.34,1.56,0.64,1);
  }
  .benefit-card:hover .b-spin { transform: rotate(180deg); }

  @keyframes b-float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  .benefit-card:hover .b-float { animation: b-float 1.8s ease-in-out infinite; }

  @keyframes b-ring {
    0%   { r:5;  opacity:0.6; }
    100% { r:15; opacity:0; }
  }
  .benefit-card:hover .b-ring { animation: b-ring 1.4s ease-out infinite; }

  /* ── divider ── */
  .benefits-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e8ecf4 20%, #e8ecf4 80%, transparent);
    margin-bottom: 4rem;
  }
`;

/* ─────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────── */

/* Rocket — curriculum */
const RocketSVG = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    {/* body */}
    <path d="M15 4 C15 4 22 10 22 18 L15 24 L8 18 C8 10 15 4 15 4Z"
      stroke="#4361ee" strokeWidth="1.6" strokeLinejoin="round" fill="none" className="b-draw"/>
    {/* window */}
    <circle cx="15" cy="14" r="3" stroke="#4361ee" strokeWidth="1.4" fill="none" className="b-draw"/>
    <circle cx="15" cy="14" r="3" fill="#4361ee" className="b-fill" opacity="0.15"/>
    {/* fins */}
    <path d="M8 18 L4 22 L8 21" stroke="#4361ee" strokeWidth="1.4" strokeLinejoin="round" fill="none" className="b-draw"/>
    <path d="M22 18 L26 22 L22 21" stroke="#4361ee" strokeWidth="1.4" strokeLinejoin="round" fill="none" className="b-draw"/>
    {/* flame */}
    <path d="M12 24 Q15 29 18 24" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" className="b-fill"/>
    {/* trail dots */}
    <circle cx="13" cy="26" r="1" fill="#f97316" className="b-fill b-float" opacity="0.7"/>
    <circle cx="15" cy="28" r="1.5" fill="#f97316" className="b-fill b-float" style={{animationDelay:'0.2s'}} opacity="0.5"/>
    <circle cx="17" cy="26" r="1" fill="#f97316" className="b-fill b-float" style={{animationDelay:'0.4s'}} opacity="0.7"/>
  </svg>
);

/* Brain — personalised */
const BrainSVG = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    {/* left hemisphere */}
    <path d="M15 6 C10 6 6 9 6 13 C6 16 8 18 8 20 C8 23 10 25 13 25 L15 25"
      stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" fill="none" className="b-draw"/>
    {/* right hemisphere */}
    <path d="M15 6 C20 6 24 9 24 13 C24 16 22 18 22 20 C22 23 20 25 17 25 L15 25"
      stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" fill="none" className="b-draw"/>
    {/* centre divide */}
    <line x1="15" y1="6" x2="15" y2="25" stroke="#a855f7" strokeWidth="1" strokeDasharray="2.5 2" opacity="0.4" className="b-draw"/>
    {/* neural connection dots */}
    <circle cx="10" cy="13" r="2" fill="#a855f7" className="b-fill" opacity="0.7"/>
    <circle cx="20" cy="13" r="2" fill="#a855f7" className="b-fill" opacity="0.7"/>
    <circle cx="11" cy="19" r="1.5" fill="#a855f7" className="b-fill" opacity="0.5"/>
    <circle cx="19" cy="19" r="1.5" fill="#a855f7" className="b-fill" opacity="0.5"/>
    {/* pulse ring on hover */}
    <circle cx="15" cy="15" r="5" fill="none" stroke="#a855f7" strokeWidth="1" className="b-ring" opacity="0"/>
  </svg>
);

/* Target — placement */
const TargetSVG = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    {/* rings */}
    <circle cx="15" cy="15" r="12" stroke="#06d6a0" strokeWidth="1.5" fill="none" className="b-draw"/>
    <circle cx="15" cy="15" r="8"  stroke="#06d6a0" strokeWidth="1.5" fill="none" className="b-draw"/>
    <circle cx="15" cy="15" r="4"  stroke="#06d6a0" strokeWidth="1.5" fill="none" className="b-draw"/>
    {/* bullseye */}
    <circle cx="15" cy="15" r="2.5" fill="#06d6a0" className="b-fill"/>
    {/* crosshair lines */}
    <line x1="15" y1="2"  x2="15" y2="6"  stroke="#06d6a0" strokeWidth="1.4" strokeLinecap="round" className="b-draw"/>
    <line x1="15" y1="24" x2="15" y2="28" stroke="#06d6a0" strokeWidth="1.4" strokeLinecap="round" className="b-draw"/>
    <line x1="2"  y1="15" x2="6"  y2="15" stroke="#06d6a0" strokeWidth="1.4" strokeLinecap="round" className="b-draw"/>
    <line x1="24" y1="15" x2="28" y2="15" stroke="#06d6a0" strokeWidth="1.4" strokeLinecap="round" className="b-draw"/>
  </svg>
);

/* Award / ribbon — certification */
const AwardSVG = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    {/* medal circle */}
    <circle cx="15" cy="12" r="8" stroke="#f59e0b" strokeWidth="1.6" fill="none" className="b-draw"/>
    {/* star inside */}
    <path d="M15 7 L16.2 10.8 L20 10.8 L17 13.2 L18.2 17 L15 14.6 L11.8 17 L13 13.2 L10 10.8 L13.8 10.8Z"
      stroke="#f59e0b" strokeWidth="1.1" strokeLinejoin="round" fill="none" className="b-draw b-spin"/>
    <path d="M15 7 L16.2 10.8 L20 10.8 L17 13.2 L18.2 17 L15 14.6 L11.8 17 L13 13.2 L10 10.8 L13.8 10.8Z"
      fill="#f59e0b" className="b-fill" opacity="0.2"/>
    {/* ribbon left */}
    <path d="M11 19 L8 27 L12 24 L15 27" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="b-draw"/>
    {/* ribbon right */}
    <path d="M19 19 L22 27 L18 24 L15 27" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="b-draw"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   BENEFITS DATA
───────────────────────────────────────────────────────────── */
const benefits = [
  {
    SvgIcon: RocketSVG,
    title: "Industry-Ready Curriculum",
    description: "Learn what actually gets you hired — built in partnership with engineering leads at top companies.",
    accent: "#4361ee",
    iconBg: "rgba(67,97,238,0.06)",
    iconBorder: "rgba(67,97,238,0.1)",
    border: "rgba(67,97,238,0.22)",
    shadow: "rgba(67,97,238,0.1)",
  },
  {
    SvgIcon: BrainSVG,
    title: "Personalised Learning",
    description: "Adaptive paths that adjust to your pace, strengths, and career goals in real time.",
    accent: "#a855f7",
    iconBg: "rgba(168,85,247,0.06)",
    iconBorder: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.22)",
    shadow: "rgba(168,85,247,0.1)",
  },
  {
    SvgIcon: TargetSVG,
    title: "Placement Focused",
    description: "Dedicated placement support — resume reviews, referrals, and interview prep until you land the role.",
    accent: "#06d6a0",
    iconBg: "rgba(6,214,160,0.06)",
    iconBorder: "rgba(6,214,160,0.1)",
    border: "rgba(6,214,160,0.22)",
    shadow: "rgba(6,214,160,0.1)",
  },
  {
    SvgIcon: AwardSVG,
    title: "Certification",
    description: "Earn industry-recognised certificates that signal real skill to technical hiring managers.",
    accent: "#f59e0b",
    iconBg: "rgba(245,158,11,0.06)",
    iconBorder: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.22)",
    shadow: "rgba(245,158,11,0.1)",
  },
];

/* ─────────────────────────────────────────────────────────────
   BENEFIT CARD
───────────────────────────────────────────────────────────── */
const BenefitCard = ({ benefit, index }) => (
  <motion.div
    className="benefit-card"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    style={{
      "--bc-accent":       benefit.accent,
      "--bc-icon-bg":      benefit.iconBg,
      "--bc-icon-border":  benefit.iconBorder,
      "--bc-border":       benefit.border,
      "--bc-shadow":       benefit.shadow,
    }}
  >
    <div className="benefit-icon-wrap">
      <benefit.SvgIcon />
    </div>
    <h3 className="benefit-card-title">{benefit.title}</h3>
    <p className="benefit-card-desc">{benefit.description}</p>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   BENEFITS SECTION
───────────────────────────────────────────────────────────── */
const BenefitsSection = () => (
  <section className="benefits-section">
    <style>{styles}</style>

    <div className="benefits-inner">

      {/* ── header ── */}
      <SectionReveal>
        <div style={{ marginBottom: "0.25rem" }}>
          <div className="benefits-eyebrow">
            <span className="benefits-eyebrow-dot" />
            Why Choose Us
          </div>
          <h2 className="benefits-title">
            Why students <em>choose us</em>
          </h2>
          <p className="benefits-subtitle">
            Four pillars that turn motivated learners into confident,
            employed engineers — consistently.
          </p>
        </div>
      </SectionReveal>

      {/* ── cards ── */}
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <BenefitCard key={benefit.title} benefit={benefit} index={index} />
        ))}
      </div>

      {/* ── divider ── */}
      <div className="benefits-divider" />

      {/* ── range slider ── */}
      <RangeSlider />

    </div>
  </section>
);

export default BenefitsSection;