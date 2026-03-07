import React, { useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   LEVEL SVG ILLUSTRATIONS
───────────────────────────────────────────────────────────── */

/* Beginner — seedling sprouting */
const BeginnerSVG = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    {/* pot */}
    <path d="M16 38 L18 44 L34 44 L36 38Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.4" strokeLinejoin="round"/>
    <line x1="14" y1="38" x2="38" y2="38" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    {/* stem */}
    <path d="M26 38 L26 26" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round"/>
    {/* left leaf */}
    <path d="M26 32 Q18 28 18 20 Q24 20 26 28" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.3"/>
    {/* right leaf */}
    <path d="M26 28 Q34 24 34 16 Q28 16 26 24" fill="#86efac" stroke="#16a34a" strokeWidth="1.3"/>
    {/* top sprout */}
    <path d="M26 26 Q26 20 26 16" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="26" cy="14" r="3" fill="#4ade80" stroke="#16a34a" strokeWidth="1.2"/>
    {/* sparkles */}
    <circle cx="12" cy="20" r="1.5" fill="#86efac" opacity="0.7"/>
    <circle cx="40" cy="24" r="1.5" fill="#86efac" opacity="0.7"/>
    <circle cx="14" cy="30" r="1" fill="#4ade80" opacity="0.5"/>
  </svg>
);

/* Intermediate — gear with progress bars */
const IntermediateSVG = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    {/* outer gear */}
    <path d="M26 8 L28.5 8 L29.5 12 C31.2 12.6 32.8 13.5 34.2 14.6 L38 13 L39.5 15 L37 18.5 C37.7 20 38.1 21.6 38.2 23.3 L42 25 L42 27 L38.2 28.7 C38 30.4 37.6 32 37 33.5 L39.5 37 L38 39 L34.2 37.4 C32.8 38.5 31.2 39.4 29.5 40 L28.5 44 L23.5 44 L22.5 40 C20.8 39.4 19.2 38.5 17.8 37.4 L14 39 L12.5 37 L15 33.5 C14.3 32 13.9 30.4 13.8 28.7 L10 27 L10 25 L13.8 23.3 C13.9 21.6 14.3 20 15 18.5 L12.5 15 L14 13 L17.8 14.6 C19.2 13.5 20.8 12.6 22.5 12 L23.5 8Z"
      fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.4" strokeLinejoin="round"/>
    {/* inner circle */}
    <circle cx="26" cy="26" r="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.4"/>
    {/* lightning bolt */}
    <path d="M28 19 L24 26 L27 26 L24 33 L30 24 L27 24Z" fill="#3b82f6"/>
  </svg>
);

/* Advanced — layered architecture stack */
const AdvancedSVG = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    {/* bottom layer */}
    <ellipse cx="26" cy="40" rx="18" ry="5" fill="#e0e7ff" stroke="#4361ee" strokeWidth="1.4"/>
    {/* mid layer */}
    <ellipse cx="26" cy="32" rx="18" ry="5" fill="#c7d2fe" stroke="#4361ee" strokeWidth="1.4"/>
    <path d="M8 32 L8 40" stroke="#4361ee" strokeWidth="1.4"/>
    <path d="M44 32 L44 40" stroke="#4361ee" strokeWidth="1.4"/>
    {/* top layer */}
    <ellipse cx="26" cy="24" rx="18" ry="5" fill="#818cf8" stroke="#4361ee" strokeWidth="1.4"/>
    <path d="M8 24 L8 32" stroke="#4361ee" strokeWidth="1.4"/>
    <path d="M44 24 L44 32" stroke="#4361ee" strokeWidth="1.4"/>
    {/* top cap */}
    <ellipse cx="26" cy="24" rx="18" ry="5" fill="#6366f1" stroke="#4361ee" strokeWidth="1.4"/>
    {/* data flow dots */}
    <circle cx="20" cy="24" r="2" fill="white" opacity="0.9"/>
    <circle cx="26" cy="24" r="2" fill="white" opacity="0.9"/>
    <circle cx="32" cy="24" r="2" fill="white" opacity="0.9"/>
    {/* upward arrow */}
    <path d="M26 22 L26 12 M22 16 L26 12 L30 16" stroke="#4361ee" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Expert — satellite / FAANG orbit */
const ExpertSVG = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    {/* orbit rings */}
    <ellipse cx="26" cy="26" rx="20" ry="8" stroke="#f59e0b" strokeWidth="1.3" fill="none" strokeDasharray="4 3" opacity="0.5"/>
    <ellipse cx="26" cy="26" rx="20" ry="8" stroke="#f59e0b" strokeWidth="1.3" fill="none" transform="rotate(60 26 26)" opacity="0.4"/>
    <ellipse cx="26" cy="26" rx="20" ry="8" stroke="#f59e0b" strokeWidth="1.3" fill="none" transform="rotate(120 26 26)" opacity="0.4"/>
    {/* central star */}
    <path d="M26 12 L28 20 L36 20 L30 25 L32 33 L26 28 L20 33 L22 25 L16 20 L24 20Z"
      fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M26 15 L27.2 19 L31 19 L28 21.5 L29 25 L26 22.8 L23 25 L24 21.5 L21 19 L24.8 19Z"
      fill="#f59e0b"/>
    {/* orbiting dots */}
    <circle cx="46" cy="26" r="3" fill="#f59e0b"/>
    <circle cx="12" cy="16" r="2.5" fill="#fcd34d" opacity="0.8"/>
    <circle cx="38" cy="38" r="2" fill="#fbbf24" opacity="0.7"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const salaryData = [
  {
    salary: '8 LPA',
    range: [0, 8],
    companies: 'Small Startups & Service Companies',
    companiesShort: 'Startups & SaaS',
    difficulty: 'Beginner',
    SvgIllustration: BeginnerSVG,
    accent: '#16a34a',
    accentLight: 'rgba(22,163,74,0.08)',
    accentBorder: 'rgba(22,163,74,0.2)',
    trackColor: 'linear-gradient(90deg, #4ade80, #16a34a)',
    effort: 4,
    skills: [
      'Basic DSA — arrays, strings, sorting',
      'Programming language fundamentals',
      'Simple CRUD applications',
      'Basic database knowledge (SQL/NoSQL)',
      'HTML, CSS & vanilla JavaScript',
    ],
    badge: '🟢 Entry Level',
  },
  {
    salary: '12 LPA',
    range: [9, 12],
    companies: 'Mid-size Companies & Product Startups',
    companiesShort: 'Product Startups',
    difficulty: 'Intermediate',
    SvgIllustration: IntermediateSVG,
    accent: '#3b82f6',
    accentLight: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.2)',
    trackColor: 'linear-gradient(90deg, #93c5fd, #3b82f6)',
    effort: 6,
    skills: [
      'Intermediate DSA — graphs, recursion, DP basics',
      'React + Node.js or Spring Boot',
      'Database design & query optimisation',
      'REST APIs, JWT authentication',
      'Basic system design concepts',
    ],
    badge: '🔵 Mid Level',
  },
  {
    salary: '17 LPA',
    range: [13, 17],
    companies: 'Top Indian MNCs & Global Startups',
    companiesShort: 'MNCs & Global Startups',
    difficulty: 'Advanced',
    SvgIllustration: AdvancedSVG,
    accent: '#4361ee',
    accentLight: 'rgba(67,97,238,0.08)',
    accentBorder: 'rgba(67,97,238,0.2)',
    trackColor: 'linear-gradient(90deg, #818cf8, #4361ee)',
    effort: 8,
    skills: [
      'Advanced DSA — trees, heaps, sliding window',
      'System design fundamentals',
      'Cloud basics (AWS / GCP / Azure)',
      'Full-stack project with real users',
      'CI/CD, Agile workflow & code review',
      'Algorithmic complexity & micro-optimisations',
    ],
    badge: '🟣 Senior Level',
  },
  {
    salary: '25 LPA',
    range: [18, 25],
    companies: 'FAANG & Top Product Companies',
    companiesShort: 'FAANG & Big Tech',
    difficulty: 'Expert',
    SvgIllustration: ExpertSVG,
    accent: '#d97706',
    accentLight: 'rgba(217,119,6,0.08)',
    accentBorder: 'rgba(217,119,6,0.2)',
    trackColor: 'linear-gradient(90deg, #fcd34d, #f59e0b)',
    effort: 10,
    skills: [
      'Expert DSA & competitive programming mindset',
      'Large-scale distributed system design',
      'Microservices, event-driven architecture',
      'Cloud expertise & production DevOps',
      'Low-level optimisation & performance tuning',
      'Technical leadership & cross-team mentorship',
      'Open-source contributions or impactful projects',
    ],
    badge: '🌟 Staff / L5+',
  },
];

const SLIDER_MAX = 25;

const getDataForValue = (val) => {
  if (val <= 8)  return salaryData[0];
  if (val <= 12) return salaryData[1];
  if (val <= 17) return salaryData[2];
  return salaryData[3];
};

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
const RangeSlider = () => {
  const [value, setValue] = useState(17);
  const data = getDataForValue(value);
  const pct = (value / SLIDER_MAX) * 100;

  /* effort dots */
  const dots = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="rs-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        .rs-wrap {
          font-family: 'DM Sans', sans-serif;
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── header ── */
        .rs-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .rs-header h2 {
          font-family: 'roboto', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: #0f1117;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .rs-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        /* ── slider card ── */
        .rs-slider-card {
          background: #f8faff;
          border: 1px solid #e8ecf4;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 1.25rem;
        }

        .rs-salary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .rs-salary-num {
          font-family: 'roboto', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--rs-accent, #4361ee);
          line-height: 1;
          transition: color 0.3s ease;
        }
        .rs-salary-label {
          font-size: 0.72rem;
          color: #94a3b8;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .rs-badge {
          font-size: 0.78rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          background: var(--rs-accent-light, rgba(67,97,238,0.08));
          border: 1px solid var(--rs-accent-border, rgba(67,97,238,0.2));
          color: var(--rs-accent, #4361ee);
          letter-spacing: 0.04em;
          transition: all 0.3s ease;
        }

        /* ── custom range input ── */
        .rs-slider-wrap {
          position: relative;
          margin-bottom: 0.75rem;
        }

        .rs-track-bg {
          height: 6px;
          background: #e8ecf4;
          border-radius: 100px;
          position: relative;
          overflow: visible;
          pointer-events: none;
        }

        .rs-track-fill {
          height: 100%;
          border-radius: 100px;
          background: var(--rs-track, linear-gradient(90deg, #818cf8, #4361ee));
          transition: width 0.15s ease, background 0.4s ease;
          position: relative;
        }

        /* thumb dot at end of fill */
        .rs-track-fill::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px; height: 18px;
          border-radius: 50%;
          background: var(--rs-accent, #4361ee);
          border: 3px solid white;
          box-shadow: 0 2px 10px var(--rs-accent-border, rgba(67,97,238,0.35));
          transition: background 0.4s ease, box-shadow 0.4s ease;
          pointer-events: none;
        }

        .rs-range-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
          -webkit-appearance: none;
          margin: 0;
        }

        .rs-range-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 0.6rem;
        }
        .rs-range-labels span {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 500;
        }

        /* milestones */
        .rs-milestones {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding: 0 0px;
        }
        .rs-milestone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          opacity: 0.4;
          transition: opacity 0.2s ease;
        }
        .rs-milestone.active { opacity: 1; }
        .rs-milestone-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--ms-color, #94a3b8);
          border: 2px solid white;
          box-shadow: 0 0 0 2px var(--ms-color, #94a3b8);
          transition: transform 0.2s ease;
        }
        .rs-milestone.active .rs-milestone-dot { transform: scale(1.3); }
        .rs-milestone-label {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--ms-color, #94a3b8);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        /* ── company banner ── */
        .rs-company-banner {
          border-radius: 16px;
          padding: 1.1rem 1.5rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: var(--rs-accent-light, rgba(67,97,238,0.06));
          border: 1px solid var(--rs-accent-border, rgba(67,97,238,0.18));
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .rs-company-text {
          font-family: 'roboto', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--rs-accent, #4361ee);
          transition: color 0.4s ease;
        }
        .rs-company-sub {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        /* ── content grid ── */
        .rs-content-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 700px) {
          .rs-content-grid { grid-template-columns: 1fr; }
        }

        /* skills card */
        .rs-card {
          background: #ffffff;
          border: 1px solid #e8ecf4;
          border-radius: 16px;
          padding: 1.5rem;
        }
        .rs-card-title {
          font-family: 'roboto', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f1117;
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rs-card-title::before {
          content: '';
          display: inline-block;
          width: 3px; height: 14px;
          border-radius: 2px;
          background: var(--rs-accent, #4361ee);
          flex-shrink: 0;
          transition: background 0.4s ease;
        }

        .rs-skill-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .rs-skill-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.865rem;
          color: #374151;
          line-height: 1.5;
        }
        .rs-skill-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--rs-accent, #4361ee);
          flex-shrink: 0;
          margin-top: 6px;
          transition: background 0.4s ease;
        }

        /* effort card */
        .rs-effort-card {
          background: #ffffff;
          border: 1px solid #e8ecf4;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* SVG illustration */
        .rs-svg-wrap {
          width: 80px; height: 80px;
          border-radius: 20px;
          background: var(--rs-accent-light, rgba(67,97,238,0.06));
          border: 1px solid var(--rs-accent-border, rgba(67,97,238,0.14));
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
          transition: background 0.4s ease, border-color 0.4s ease;
        }

        .rs-difficulty-label {
          font-family: 'roboto', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--rs-accent, #4361ee);
          margin-bottom: 0.25rem;
          transition: color 0.4s ease;
        }
        .rs-difficulty-sub {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-bottom: 1.25rem;
        }

        .rs-score-row {
          font-size: 0.7rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.6rem;
          align-self: flex-start;
        }

        .rs-dots-row {
          display: flex;
          gap: 5px;
          margin-bottom: 1rem;
          align-self: flex-start;
        }
        .rs-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          transition: background 0.3s ease;
        }
        .rs-dot.filled {
          background: var(--rs-accent, #4361ee);
        }
        .rs-dot.empty {
          background: #e8ecf4;
        }

        .rs-effort-bar-track {
          width: 100%;
          height: 6px;
          background: #e8ecf4;
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 0.5rem;
          align-self: stretch;
        }
        .rs-effort-bar-fill {
          height: 100%;
          border-radius: 100px;
          background: var(--rs-track, linear-gradient(90deg, #818cf8,#4361ee));
          transition: width 0.5s cubic-bezier(0.4,0,0.2,1), background 0.4s ease;
        }
        .rs-effort-note {
          font-size: 0.72rem;
          color: #cbd5e1;
          align-self: flex-start;
        }

        /* ── CTA ── */
        .rs-cta {
          border-radius: 16px;
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: var(--rs-accent-light, rgba(67,97,238,0.05));
          border: 1px solid var(--rs-accent-border, rgba(67,97,238,0.16));
          transition: all 0.4s ease;
          flex-wrap: wrap;
        }
        .rs-cta-text h3 {
          font-family: 'roboto', sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f1117;
          margin-bottom: 0.2rem;
          letter-spacing: -0.01em;
        }
        .rs-cta-text p {
          font-size: 0.855rem;
          color: #64748b;
          margin: 0;
        }
        .rs-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 22px;
          border-radius: 12px;
          background: var(--rs-accent, #4361ee);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }
        .rs-cta-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px -4px var(--rs-accent-border, rgba(67,97,238,0.4));
        }

        @media (max-width: 600px) {
          .rs-slider-card { padding: 1.25rem; }
          .rs-salary-num  { font-size: 2rem; }
        }
      `}</style>

      {/* CSS vars on wrapper */}
      <div style={{
        '--rs-accent':        data.accent,
        '--rs-accent-light':  data.accentLight,
        '--rs-accent-border': data.accentBorder,
        '--rs-track':         data.trackColor,
      }}>

        {/* ── header ── */}
        <div className="rs-header">
          <h2>What salary are you aiming for?</h2>
          <p>Drag the slider — see exactly what skills and effort each level needs.</p>
        </div>

        {/* ── slider card ── */}
        <div className="rs-slider-card">
          <div className="rs-salary-row">
            <div>
              <div className="rs-salary-num">{value} LPA</div>
              <div className="rs-salary-label">Target Salary</div>
            </div>
            <div className="rs-badge">{data.badge}</div>
          </div>

          <div className="rs-slider-wrap" style={{ height: 6, marginBottom: '1.75rem' }}>
            <div className="rs-track-bg">
              <div className="rs-track-fill" style={{ width: `${pct}%` }} />
            </div>
            <input
              type="range"
              className="rs-range-input"
              min="0" max={SLIDER_MAX}
              value={value}
              onChange={e => setValue(Number(e.target.value))}
            />
          </div>

          <div className="rs-range-labels">
            <span>0 LPA</span>
            <span>25 LPA</span>
          </div>

          {/* milestone markers */}
          <div className="rs-milestones">
            {[
              { label: '8 LPA',  color: '#16a34a', threshold: 8  },
              { label: '12 LPA', color: '#3b82f6', threshold: 12 },
              { label: '17 LPA', color: '#4361ee', threshold: 17 },
              { label: '25 LPA', color: '#d97706', threshold: 25 },
            ].map(ms => (
              <div
                key={ms.label}
                className={`rs-milestone${value >= ms.threshold - 1 ? ' active' : ''}`}
                style={{ '--ms-color': ms.color }}
                onClick={() => setValue(ms.threshold)}
              >
                <div className="rs-milestone-dot" />
                <div className="rs-milestone-label">{ms.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── company banner ── */}
        <div className="rs-company-banner">
          <div>
            <div className="rs-company-text">{data.companies}</div>
            <div className="rs-company-sub">Target companies at this salary band</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke={data.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* ── content grid ── */}
        <div className="rs-content-grid">

          {/* skills */}
          <div className="rs-card">
            <div className="rs-card-title">Skills Required</div>
            <ul className="rs-skill-list">
              {data.skills.map((skill, i) => (
                <li key={i} className="rs-skill-item">
                  <span className="rs-skill-dot" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* effort */}
          <div className="rs-effort-card">
            <div className="rs-svg-wrap">
              <data.SvgIllustration />
            </div>

            <div className="rs-difficulty-label">{data.difficulty}</div>
            <div className="rs-difficulty-sub">{data.effort}/10 effort score</div>

            <div className="rs-score-row">Effort level</div>
            <div className="rs-dots-row">
              {dots.map(d => (
                <div key={d} className={`rs-dot ${d <= data.effort ? 'filled' : 'empty'}`} />
              ))}
            </div>

            <div className="rs-effort-bar-track">
              <div className="rs-effort-bar-fill" style={{ width: `${data.effort * 10}%` }} />
            </div>

            <div className="rs-effort-note">Based on 5,000+ Ligand alumni</div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="rs-cta">
          <div className="rs-cta-text">
            <h3>Start learning with Ligand</h3>
            <p>We guide every student from where they are to where they want to be.</p>
          </div>
          <button className="rs-cta-btn">
            Get started
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default RangeSlider;