import React, { useState, useEffect } from "react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import { HiSparkles } from "react-icons/hi";

const HoliModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if modal should be shown
    const checkModalVisibility = () => {
      // Get current date
      const today = new Date();
      const currentYear = today.getFullYear();
      
      // For testing: You can uncomment this line to force a specific date
      // const today = new Date(2024, 2, 10); // March 10, 2024 for testing
      
      // Holi date range: March 1st to March 12th
      const startDate = new Date(currentYear, 2, 1); // Month is 0-indexed, so 2 = March
      const endDate = new Date(currentYear, 2, 8); // March 12th
      
      // Set time to midnight for accurate date comparison
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      
      // Check if current date is within range
      const isWithinHoliRange = today >= startDate && today <= endDate;
      
      console.log('Date check:', {
        today: today.toDateString(),
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
        isWithinHoliRange
      });
      
      if (!isWithinHoliRange) {
        console.log('Not within Holi date range');
        setIsOpen(false);
        return;
      }
      
      // Check localStorage if modal has been shown this year
      const modalShownKey = `holiModalShown_${currentYear}`;
      const hasModalBeenShown = localStorage.getItem(modalShownKey);
      
      console.log('localStorage check:', { 
        key: modalShownKey, 
        hasModalBeenShown,
        timestamp: new Date().toLocaleString()
      });
      
      if (!hasModalBeenShown) {
        // Show modal and set localStorage
        console.log('Showing modal for the first time this year');
        setIsOpen(true);
        localStorage.setItem(modalShownKey, 'true');
      } else {
        console.log('Modal already shown this year');
        setIsOpen(false);
      }
    };

    // Add a small delay to ensure everything is loaded
    const timer = setTimeout(() => {
      checkModalVisibility();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Close when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  // Add a reset function for testing (you can call this from browser console)
  // window.resetHoliModal = () => {
  //   const currentYear = new Date().getFullYear();
  //   localStorage.removeItem(`holiModalShown_${currentYear}`);
  //   window.location.reload();
  // };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-card">
          {/* New style: organic color droplets (no blurred circles) */}
          <div className="droplet droplet-1"></div>
          <div className="droplet droplet-2"></div>
          <div className="droplet droplet-3"></div>
          <div className="droplet droplet-4"></div>
          <div className="droplet droplet-5"></div>
          <div className="droplet droplet-6"></div>

          {/* Tech Badges - repositioned slightly for new look */}
          <div className="badge react">
            <FaReact /> React
          </div>
          <div className="badge node">
            <FaNodeJs /> Node
          </div>
          <div className="badge mongo">
            <SiMongodb /> MongoDB
          </div>
          <div className="badge express">
            <SiExpress /> Express
          </div>

          <div className="content">
            <h1>
              Happy Holi <HiSparkles style={{ color: '#f4873f', fontSize: '28px' }} />
            </h1>

            <p>
              May your code compile without errors and your life be filled with vibrant colors!
              <br />
              <span className="wish-from">🎨 from Ligand Softwares</span>
            </p>

            {/* Button placed in its own row below */}
            <div className="button-row">
              <button onClick={closeModal}>Paint Your Knowledge</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ----- overlay (same logic, refined) ----- */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(30, 20, 40, 0.7); /* deeper purple tint */
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ----- card with different style: pastel glass with border & texture ----- */
        .modal-card {
          position: relative;
          width: 90%;
          max-width: 800px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          border-radius: 48px 16px 48px 16px; /* playful asymmetric radius */
          padding: 60px 40px 50px 40px;
          text-align: center;
          box-shadow: 0 30px 50px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 200, 150, 0.3) inset;
          overflow: hidden;
          animation: slidePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Poppins', 'Segoe UI', system-ui, sans-serif;
          border: 1px solid rgba(255,255,255,0.6);
        }

        @keyframes slidePop {
          0% { transform: scale(0.9) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        /* ----- droplets / abstract color blobs (new style) ----- */
        .droplet {
          position: absolute;
          border-radius: 70% 30% 60% 40% / 50% 60% 40% 50%;
          filter: blur(2px);
          opacity: 0.5;
          mix-blend-mode: multiply;
          animation: wobble 12s infinite alternate ease-in-out;
        }

        .droplet-1 {
          width: 300px;
          height: 260px;
          top: -120px;
          left: -80px;
          background: #ff99cc;
          opacity: 0.3;
          transform: rotate(15deg);
        }
        .droplet-2 {
          width: 200px;
          height: 320px;
          top: -50px;
          right: -60px;
          background: #ffdb8e;
          opacity: 0.35;
          border-radius: 40% 60% 70% 30% / 40% 50% 50% 60%;
        }
        .droplet-3 {
          width: 350px;
          height: 280px;
          bottom: -130px;
          left: -70px;
          background: #a3c6ff;
          opacity: 0.3;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
        .droplet-4 {
          width: 250px;
          height: 300px;
          bottom: -100px;
          right: -50px;
          background: #a6f0b0;
          opacity: 0.35;
        }
        .droplet-5 {
          width: 150px;
          height: 150px;
          top: 30%;
          left: 15%;
          background: #f1a7ff;
          opacity: 0.25;
          filter: blur(4px);
        }
        .droplet-6 {
          width: 180px;
          height: 180px;
          bottom: 15%;
          right: 10%;
          background: #ffe585;
          opacity: 0.3;
          filter: blur(6px);
        }

        @keyframes wobble {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          100% { transform: translate(20px, -15px) rotate(8deg) scale(1.05); }
        }

        /* ----- heading new style: vibrant with shadow ----- */
        h1 {
          font-size: 44px;
          font-weight: 700;
          margin: 0 0 16px 0;
          background: linear-gradient(145deg, #b347ea, #3b82f6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-shadow: 2px 4px 12px rgba(236, 72, 153, 0.2);
          letter-spacing: -0.02em;
        }

        p {
          font-size: 18px;
          color: #2d3748;
          margin-bottom: 30px;
          line-height: 1.7;
          font-weight: 500;
          background: rgba(255,255,240,0.4);
          padding: 16px 24px;
          border-radius: 60px;
          display: inline-block;
          backdrop-filter: blur(2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        /* Wish from Ligand Softwares */
        .wish-from {
          display: block;
          margin-top: 8px;
          font-size: 16px;
          font-weight: 600;
          background: linear-gradient(135deg, #f97316, #d946ef);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
        }

        /* ----- button row: places button in its own block below ----- */
        .button-row {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 10px;
        }

        /* ----- smaller button with fresh gradient ----- */
        button {
          padding: 10px 28px; /* smaller size */
          border-radius: 40px;
          border: none;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          background: linear-gradient(125deg, #f43f5e, #e11d48, #fb7185);
          box-shadow: 0 12px 22px -6px #f43f5e80;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
          border: 1px solid rgba(255,255,255,0.3);
          line-height: 1.2;
        }

        button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 18px 30px -8px #be185d;
          background: linear-gradient(125deg, #e11d48, #be185d, #f43f5e);
        }

        /* ----- tech badges: new bright style with slight rotation and shadows ----- */
        .badge {
          position: absolute;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border-radius: 40px;
          padding: 10px 20px;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255,215,0,0.3);
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1e1e2f;
          transition: all 0.2s;
          border: 1px solid rgba(255, 255, 255, 0.6);
          animation: floatSoft 5s infinite alternate;
        }

        .badge:hover {
          transform: scale(1.05);
          background: white;
        }

        /* different float for each */
        .react {
          top: 24px;
          left: 24px;
          animation: float 5s infinite alternate;
        }
        .node {
          top: 24px;
          right: 24px;
          animation: float 6s infinite alternate-reverse;
        }
        .mongo {
          bottom: 24px;
          left: 24px;
          animation: float 5.5s infinite alternate;
        }
        .express {
          bottom: 24px;
          right: 24px;
          animation: float 4.5s infinite alternate-reverse;
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-12px) rotate(1deg); }
        }

        @keyframes floatSoft {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }

        /* react icon colored */
        .badge.react svg { color: #61dafb; font-size: 18px; }
        .badge.node svg { color: #8cc84b; font-size: 18px; }
        .badge.mongo svg { color: #47a248; font-size: 18px; }
        .badge.express svg { color: #000000; font-size: 16px; }

        /* content spacing */
        .content {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ----- responsive adjustments (finer) ----- */
        @media (max-width: 700px) {
          .modal-card {
            padding: 45px 25px 40px 25px;
            border-radius: 32px 12px 32px 12px;
          }
          h1 {
            font-size: 34px;
            gap: 6px;
          }
          p {
            font-size: 16px;
            padding: 14px 20px;
          }
          .wish-from {
            font-size: 14px;
          }
          button {
            padding: 8px 24px;
            font-size: 15px;
          }
          .badge {
            padding: 6px 14px;
            font-size: 13px;
          }
        }

        @media (max-width: 500px) {
          .modal-card {
            padding: 35px 18px 30px 18px;
          }
          h1 {
            font-size: 28px;
            flex-wrap: wrap;
          }
          p {
            font-size: 15px;
            padding: 12px 16px;
            margin-bottom: 20px;
          }
          .wish-from {
            font-size: 13px;
          }
          .badge {
            padding: 4px 10px;
            font-size: 12px;
          }
          .react { top: 16px; left: 16px; }
          .node { top: 16px; right: 16px; }
          .mongo { bottom: 16px; left: 16px; }
          .express { bottom: 16px; right: 16px; }
          button {
            padding: 7px 20px;
            font-size: 14px;
          }
        }

        /* for very small screens, adjust badge size further */
        @media (max-width: 380px) {
          .badge {
            padding: 3px 8px;
            font-size: 11px;
          }
          h1 {
            font-size: 24px;
          }
          p {
            font-size: 13px;
          }
          .wish-from {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default HoliModal;