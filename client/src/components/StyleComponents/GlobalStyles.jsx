import { THEME } from "../GuestLAyout/Home/theme";
/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      background: ${THEME.bg};
      color: ${THEME.text};
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

    /* Custom Cursor Styles */
    * {
      cursor: none !important;
    }

    /* Smooth Scrolling */
    html.lenis {
      height: auto;
    }
    
    .lenis.lenis-smooth {
      scroll-behavior: auto;
    }

    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
    }

    /* Animations */
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.05); }
    }

    /* Tech Stack Card Styles */
    .ligand-tech-icon {
      font-size: 32px;
      transition: all 0.3s ease;
    }

    .ligand-tech-icon.react  { color: #61dafb; }
    .ligand-tech-icon.node   { color: #68a063; }
    .ligand-tech-icon.mongo  { color: #47a248; }
    .ligand-tech-icon.express{ color: #000000; }

    .ligand-dashboard-link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .ligand-dashboard-card {
      padding: 1.2rem 0.8rem;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid transparent;
    }

    .ligand-dashboard-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.6s ease;
    }

    .ligand-dashboard-card:hover::before { left: 100%; }

    .ligand-dashboard-card:hover {
      transform: translateY(-6px) scale(1.02);
      border-color: rgba(67, 97, 238, 0.3);
      box-shadow: 
        0 15px 30px -10px rgba(67, 97, 238, 0.2),
        0 0 0 1px rgba(67, 97, 238, 0.1) inset;
    }

    .ligand-tech-icon-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }

    .ligand-tech-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #dcdcdc;
      letter-spacing: 0.3px;
      opacity: 0.8;
      transition: opacity 0.3s ease;
    }

    .ligand-dashboard-card:hover .ligand-tech-label {
      opacity: 1;
      color: rgb(255, 255, 255);
    }

    /* Dashboard Preview Container */
    .ligand-dashboard-preview {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.5) inset;
      border: 1px solid rgba(255, 255, 255, 0.8);
    }

    .ligand-dashboard-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 24px 24px 0 0;
      opacity: 0.9;
    }

    .ligand-dashboard-content {
      margin-top: 2rem;
      background: #343434;
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.8);
    }

    .ligand-dashboard-nav {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1.5rem;
      padding: 0.5rem;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 30px;
      width: fit-content;
    }

    .ligand-nav-dot {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .ligand-nav-dot-red    { background-color: #ff6b6b; box-shadow: 0 2px 8px rgba(255,107,107,0.4); }
    .ligand-nav-dot-yellow { background-color: #ffd93d; box-shadow: 0 2px 8px rgba(255,217,61,0.4);  }
    .ligand-nav-dot-green  { background-color: #6bcf7f; box-shadow: 0 2px 8px rgba(107,207,127,0.4);}

    .ligand-nav-dot:hover { transform: scale(1.2); }

    .ligand-dashboard-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    @media (min-width: 768px) {
      .ligand-dashboard-grid { grid-template-columns: repeat(4, 1fr); }
    }

    .ligand-media-player {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem 0 0.5rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .ligand-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 500;
      background: linear-gradient(135deg, rgba(67,97,238,0.05), rgba(58,12,163,0.05));
      color: #dcdcdc;
      border: 1px solid rgba(67, 97, 238, 0.1);
      backdrop-filter: blur(5px);
    }

    .ligand-badge-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: #dcdcdc;
      margin-right: 0.6rem;
      animation: pulse 2s infinite;
    }

    /* Tech Stack hover glow effects */
    .ligand-dashboard-card:hover .ligand-tech-icon.react   { filter: drop-shadow(0 4px 12px rgba(97,218,251,0.5));  }
    .ligand-dashboard-card:hover .ligand-tech-icon.node    { filter: drop-shadow(0 4px 12px rgba(104,160,99,0.5));  }
    .ligand-dashboard-card:hover .ligand-tech-icon.mongo   { filter: drop-shadow(0 4px 12px rgba(71,162,72,0.5));   }
    .ligand-dashboard-card:hover .ligand-tech-icon.express { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));       }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.95); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .ligand-dashboard-preview { padding: 1.5rem; }
      .ligand-dashboard-card    { padding: 1rem 0.5rem; }
      .ligand-tech-icon         { font-size: 28px; }
      .ligand-tech-label        { font-size: 0.7rem; }
    }

    @media (max-width: 480px) {
      .ligand-dashboard-grid { grid-template-columns: repeat(2, 1fr); }
      .ligand-dashboard-card { padding: 0.8rem 0.4rem; }
      .ligand-tech-icon      { font-size: 24px; }
    }
  `}</style>
);

export default GlobalStyles;