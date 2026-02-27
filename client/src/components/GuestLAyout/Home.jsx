/**
 * Ligand Software Solutions — Clean 3D Floating Code Orb
 * 
 * A single, elegant 3D component with smooth animations and hover effects
 */
import { SiExpress, SiMongodb, SiTypescript } from "react-icons/si";
import  { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Html } from "@react-three/drei";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Clock, Video, Briefcase, BarChart, Code, CheckCircle,
  ChevronRight, GraduationCap, Cpu, Database, BookMarked,
  Award, Target, Brain, Rocket, Star, Users,
  Zap, Mail, Phone, MapPin,
  Twitter, Github, Linkedin, Instagram,
} from "lucide-react";
import { 
  SiReact, SiNodedotjs, SiPython, SiDocker, SiJavascript
} from "react-icons/si";
import RangeSlider from "./RangeSlider";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   PURE WHITE THEME TOKENS
───────────────────────────────────────────────────────────── */
const THEME = {
  bg: "#ffffff",
  bgAlt: "#fafafa",
  bgGradient: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)",
  
  text: "#1a1e2b",
  textLight: "#4a5568",
  textMuted: "#718096",
  
  accent: "#002fff",
  accentLight: "#4895ef",
  accentGradient: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
  
  purple: "#7209b7",
  pink: "#f72585",
  success: "#06d6a0",
  warning: "#ffd166",
  
  border: "#e9ecef",
  borderDark: "#dee2e6",
  shadow: "rgba(0, 0, 0, 0.03)",
  shadowHover: "rgba(67, 97, 238, 0.08)",
  
  cardBg: "#ffffff",
  cardBgAlt: "#f8fafc",
  glass: "rgba(255, 255, 255, 0.9)",
};


  const techStack = [
    {
      icon: <SiReact className="ligand-tech-icon react" />,
      label: "React",
      url: "https://react.dev",
    },
    {
      icon: <SiNodedotjs className="ligand-tech-icon node" />,
      label: "Node.js",
      url: "https://nodejs.org",
    },
    {
      icon: <SiMongodb className="ligand-tech-icon mongo" />,
      label: "MongoDB",
      url: "https://www.mongodb.com",
    },
    {
      icon: <SiExpress className="ligand-tech-icon express" />,
      label: "Express.js",
      url: "https://expressjs.com",
    },
  ];


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

   

    /* Grid Background */
    // .grid-bg {
    //   background-image: 
    //     linear-gradient(${THEME.border} 1px, transparent 1px),
    //     linear-gradient(90deg, ${THEME.border} 1px, transparent 1px);
    //   background-size: 50px 50px;
    //   opacity: 0.5;
    // }

    /* Animations */
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.05); }
    }

    /* Scrollbar */
    
    /* Tech Stack Card Styles */
.ligand-tech-icon {
  font-size: 32px;
  transition: all 0.3s ease;
}

.ligand-tech-icon.react {
  color: #61dafb;
}

.ligand-tech-icon.node {
  color: #68a063;
}

.ligand-tech-icon.mongo {
  color: #47a248;
}

.ligand-tech-icon.express {
  color: #000000;
}

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
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s ease;
}

.ligand-dashboard-card:hover::before {
  left: 100%;
}

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

.ligand-nav-dot-red {
  background-color: #ff6b6b;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
}

.ligand-nav-dot-yellow {
  background-color: #ffd93d;
  box-shadow: 0 2px 8px rgba(255, 217, 61, 0.4);
}

.ligand-nav-dot-green {
  background-color: #6bcf7f;
  box-shadow: 0 2px 8px rgba(107, 207, 127, 0.4);
}

.ligand-nav-dot:hover {
  transform: scale(1.2);
}

.ligand-dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .ligand-dashboard-grid {
    grid-template-columns: repeat(4, 1fr);
  }
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
  background: linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(58, 12, 163, 0.05));
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

/* Tech Stack specific hover effects */
.ligand-dashboard-card:hover .ligand-tech-icon.react {
  filter: drop-shadow(0 4px 12px rgba(97, 218, 251, 0.5));
}

.ligand-dashboard-card:hover .ligand-tech-icon.node {
  filter: drop-shadow(0 4px 12px rgba(104, 160, 99, 0.5));
}

.ligand-dashboard-card:hover .ligand-tech-icon.mongo {
  filter: drop-shadow(0 4px 12px rgba(71, 162, 72, 0.5));
}

.ligand-dashboard-card:hover .ligand-tech-icon.express {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

/* Animation for badge dot */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .ligand-dashboard-preview {
    padding: 1.5rem;
  }
  
  .ligand-dashboard-card {
    padding: 1rem 0.5rem;
  }
  
  .ligand-tech-icon {
    font-size: 28px;
  }
  
  .ligand-tech-label {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .ligand-dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .ligand-dashboard-card {
    padding: 0.8rem 0.4rem;
  }
  
  .ligand-tech-icon {
    font-size: 24px;
  }
}
    
  `}</style>
);

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
      if (e.target.closest('a, button, [data-cursor], .interactive')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: isHovering ? '56px' : '32px',
          height: isHovering ? '56px' : '32px',
          border: `2px solid ${isHovering ? THEME.pink : THEME.accent}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          width: '4px',
          height: '4px',
          backgroundColor: isHovering ? THEME.pink : THEME.accent,
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   ELEGANT 3D CODE ORB - Single, clean component with smooth animations
───────────────────────────────────────────────────────────── */
const CodeOrb = () => {
  const orbRef = useRef();
  const particlesRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth rotation based on mouse
  useFrame((state) => {
    if (orbRef.current) {
      if (hovered) {
        // Gentle follow mouse when hovered
        const targetRotY = mousePos.x * 0.3;
        const targetRotX = mousePos.y * 0.2;
        
        orbRef.current.rotation.y += (targetRotY - orbRef.current.rotation.y) * 0.05;
        orbRef.current.rotation.x += (targetRotX - orbRef.current.rotation.x) * 0.05;
      } else {
        // Slow auto-rotation when not hovered
        orbRef.current.rotation.y += 0.002;
        orbRef.current.rotation.x += 0.001;
      }
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Tech icons to float around
  const techIcons = [
    { icon: SiReact, color: '#61dafb', delay: 0 },
    { icon: SiNodedotjs, color: '#68a063', delay: 0.5 },
    { icon: SiPython, color: '#3776ab', delay: 1 },
    { icon: SiDocker, color: '#2496ed', delay: 1.5 },
    { icon: SiJavascript, color: '#f7df1e', delay: 2 },
  ];

  return (
    <group
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main glowing orb */}
      <Float
        speed={2}
        rotationIntensity={0.4}
        floatIntensity={0.5}
      >
        <mesh ref={orbRef} scale={hovered ? 1.1 : 1}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshPhysicalMaterial
            color={THEME.accent}
            emissive={THEME.accent}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            roughness={0.2}
            metalness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>
      </Float>

      {/* Inner core */}
      <mesh scale={0.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Floating tech icons in a ring */}
      {techIcons.map((tech, i) => {
        const angle = (i / techIcons.length) * Math.PI * 2;
        const radius = 2.2;
        
        return (
          <Float
            key={i}
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <Html
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.5,
                Math.sin(angle) * radius * 0.3
              ]}
              center
              distanceFactor={6}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  scale: hovered ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: tech.delay,
                }}
                style={{
                  background: 'white',
                  padding: '10px',
                  borderRadius: '12px',
                  boxShadow: `0 8px 20px ${tech.color}40`,
                  border: `2px solid ${tech.color}`,
                  transform: `scale(${hovered ? 1.2 : 1})`,
                  transition: 'transform 0.3s ease',
                }}
              >
                <tech.icon size={28} color={tech.color} />
              </motion.div>
            </Html>
          </Float>
        );
      })}

      {/* Subtle particle ring */}
      <group ref={particlesRef}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 1.8;
          
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.3,
                Math.sin(angle) * radius * 0.5
              ]}
            >
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial
                color={THEME.accent}
                emissive={THEME.accent}
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.8}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={THEME.accent}
          emissive={THEME.accent}
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

/* ─────────────────────────────────────────────────────────────
   3D SCENE SETUP
───────────────────────────────────────────────────────────── */
const ThreeScene = () => (
  <Canvas
    camera={{ position: [0, 0, 6], fov: 45 }}
    style={{ width: '100%', height: '100%', background: 'transparent' }}
    gl={{ antialias: true, alpha: true }}
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color={THEME.accent} />
      <pointLight position={[0, 5, 0]} intensity={0.8} color={THEME.pink} />
      
      <CodeOrb />
      
      <Environment preset="city" />
    </Suspense>
  </Canvas>
);

/* ─────────────────────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────────────────────── */
const MagneticButton = ({ children, href, onClick, variant = 'primary', className = '' }) => {
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
      buttonRef.current.style.transform = 'translate(0, 0)';
    }
  };

  const baseStyles = {
    padding: '14px 32px',
    borderRadius: '14px',
    fontWeight: '600',
    fontSize: '1rem',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.3px',
  };

  const variantStyles = {
    primary: {
      background: THEME.accentGradient,
      color: 'white',
      boxShadow: `0 10px 25px ${THEME.accent}30`,
    },
    secondary: {
      background: 'transparent',
      color: THEME.text,
      border: `2px solid ${THEME.border}`,
    },
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`interactive ${className}`}
      style={{ ...baseStyles, ...variantStyles[variant] }}
    >
      {children}
    </Component>
  );
};

/* ─────────────────────────────────────────────────────────────
   SECTION REVEAL ANIMATION
───────────────────────────────────────────────────────────── */
const SectionReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.7, 
      delay, 
      ease: [0.43, 0.13, 0.23, 0.96] 
    }}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────────────────────
   HERO SECTION WITH 3D CODE ORB
───────────────────────────────────────────────────────────── */
const HeroSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fillHeights, setFillHeights] = useState([0, 0, 0, 0]);

  // Stats data with different colors
  const stats = [
    { 
      label: 'Students Trained', 
      value: '5000+',
      icon: <Users size={24} />,
      color: '#4361ee',
      fillLevel: 85
    },
    { 
      label: 'Placement Rate', 
      value: '92%',
      icon: <Briefcase size={24} />,
      color: '#f72585',
      fillLevel: 92
    },
    { 
      label: 'Partner Companies', 
      value: '200+',
      icon: <Star size={24} />,
      color: '#06d6a0',
      fillLevel: 70
    },
    { 
      label: 'Live Projects', 
      value: '1000+',
      icon: <Code size={24} />,
      color: '#ffd166',
      fillLevel: 88
    },
  ];

  // Update fill heights on hover
  useEffect(() => {
    if (hoveredIndex !== null) {
      const newHeights = [0, 0, 0, 0];
      newHeights[hoveredIndex] = stats[hoveredIndex].fillLevel;
      setFillHeights(newHeights);
    } else {
      setFillHeights([0, 0, 0, 0]);
    }
  }, [hoveredIndex]);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: THEME.bgGradient,
        overflow: 'hidden',
      }}
    >
      {/* Grid Background */}
      <GridBackground />

      {/* Subtle floating gradient orbs */}
      

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${THEME.pink}08 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(70px)',
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: `${THEME.accent}08`,
                color: THEME.accent,
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                border: `1px solid ${THEME.accent}20`,
              }}
            >
              <Zap size={14} style={{ marginRight: '6px', display: 'inline' }} />
              A Dedicated Learning Platform for Ligand Students
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Master Modern
              <br />
              <span className="gradient-text">Software Development</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: '1.125rem',
                color: THEME.textLight,
                lineHeight: 1.8,
                maxWidth: '500px',
                marginBottom: '2.5rem',
              }}
            >
              Join Ligand Software Solutions and transform your career with 
              industry-leading curriculum, hands-on projects, and personalized 
              mentorship from expert developers.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}
          >
            <MagneticButton href="/login" variant="primary">
              Get Started
              <ChevronRight size={18} />
            </MagneticButton>
            <MagneticButton href="#about" variant="secondary">
              Watch Demo
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right Column - Graph Ruler Cards */}
        
                <div className="ligand-dashboard-preview">
                  <div className="ligand-dashboard-header"></div>
                  <div className="ligand-dashboard-content">
                    <div className="ligand-dashboard-nav">
                      <div className="ligand-nav-dot ligand-nav-dot-red"></div>
                      <div className="ligand-nav-dot ligand-nav-dot-yellow"></div>
                      <div className="ligand-nav-dot ligand-nav-dot-green"></div>
                    </div>
                    <div className="ligand-dashboard-grid">
                      {techStack.map((tech, i) => (
                        <a
                          key={tech.label}
                          href={tech.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ligand-dashboard-link"
                        >
                          <div
                            className={`ligand-dashboard-card ${
                              i % 2 === 0
                                ? "ligand-card-gradient"
                                : "ligand-card-gray"
                            }`}
                          >
                            <div className="ligand-tech-icon-wrapper">
                              {tech.icon}
                              <span className="ligand-tech-label">
                                {tech.label}
                              </span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="ligand-media-player">
                      <div className="ligand-badge">
                        <div className="ligand-badge-dot"></div>
                        <span>A Dedicated Learning Platform for Ligand Students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
     

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: THEME.textMuted,
          fontSize: '0.875rem',
          zIndex: 10,
        }}
      >
        <span>Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight size={18} style={{ transform: 'rotate(90deg)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────────────────────────── */
const FeaturesSection = () => {
  const features = [
    {
      icon: <Clock size={24} />,
      title: 'Daily Assessments',
      description: 'Regular coding challenges and quizzes to track your progress',
      color: '#4361ee',
    },
    {
      icon: <BookMarked size={24} />,
      title: 'Comprehensive Notes',
      description: 'Organized study materials and reference documentation',
      color: '#7209b7',
    },
    {
      icon: <Video size={24} />,
      title: 'Live & Recorded Classes',
      description: 'Interactive sessions with expert trainers',
      color: '#f72585',
    },
    {
      icon: <Code size={24} />,
      title: 'Code Repository',
      description: 'Real-world projects and practice code examples',
      color: '#06d6a0',
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Mock Interviews',
      description: 'Industry-standard technical interview practice',
      color: '#ffd166',
    },
    {
      icon: <BarChart size={24} />,
      title: 'Performance Analytics',
      description: 'Detailed insights into your learning journey',
      color: '#4361ee',
    },
  ];

  return (
    <section
      style={{
        padding: '6rem 2rem',
        background: THEME.bgAlt,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: THEME.accent,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Why Choose Us
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginTop: '0.5rem',
              }}
            >
              Everything You Need to{' '}
              <span className="gradient-text">Succeed</span>
            </h2>
          </div>
        </SectionReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{
                background: THEME.cardBg,
                padding: '2.5rem',
                borderRadius: '24px',
                boxShadow: `0 10px 30px ${THEME.shadow}`,
                border: `1px solid ${THEME.border}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  background: `${feature.color}10`,
                  color: feature.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                {feature.title}
              </h3>
              <p style={{ color: THEME.textLight, lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   COURSES SECTION
───────────────────────────────────────────────────────────── */
const CoursesSection = () => {
  const courses = [
    {
      title: 'MERN Stack Development',
      description: 'Master MongoDB, Express.js, React, and Node.js',
      icon: SiReact,
      color: '#61dafb',
      duration: '16 weeks',
      level: 'Intermediate',
      students: '2.5k+',
    },
    {
      title: 'Data Structures & Algorithms',
      description: 'Master coding interviews with DSA fundamentals',
      icon: SiJavascript,
      color: '#f7df1e',
      duration: '12 weeks',
      level: 'Beginner',
      students: '3k+',
    },
    {
      title: 'System Design',
      description: 'Learn to design scalable distributed systems',
      icon: SiReact,
      color: '#4361ee',
      duration: '10 weeks',
      level: 'Advanced',
      students: '1.2k+',
    },
    {
      title: 'DevOps & Cloud',
      description: 'Master Docker, Kubernetes, and cloud platforms',
      icon: SiDocker,
      color: '#2496ed',
      duration: '14 weeks',
      level: 'Intermediate',
      students: '1.8k+',
    },
    {
      title: 'Python Full Stack',
      description: 'Build applications with Python, Django, and React',
      icon: SiPython,
      color: '#3776ab',
      duration: '16 weeks',
      level: 'Beginner',
      students: '2.2k+',
    },
    {
      title: 'Mobile Development',
      description: 'Create cross-platform apps with React Native',
      icon: SiReact,
      color: '#61dafb',
      duration: '12 weeks',
      level: 'Intermediate',
      students: '1.5k+',
    },
  ];

  return (
    <section style={{ padding: '6rem 2rem', background: THEME.bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: THEME.accent,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Our Programs
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginTop: '0.5rem',
              }}
            >
              Comprehensive{' '}
              <span className="gradient-text">Course Catalog</span>
            </h2>
          </div>
        </SectionReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
          }}
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{
                background: THEME.cardBg,
                padding: '2rem',
                borderRadius: '24px',
                boxShadow: `0 10px 30px ${THEME.shadow}`,
                border: `1px solid ${THEME.border}`,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  fontSize: '6rem',
                  opacity: 0.05,
                  color: course.color,
                  transform: 'rotate(15deg)',
                }}
              >
                <course.icon />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: `${course.color}15`,
                    color: course.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}
                >
                  <course.icon />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>{course.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        background: THEME.bgAlt,
                        borderRadius: '100px',
                        color: THEME.textLight,
                      }}
                    >
                      {course.duration}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        background: `${course.color}15`,
                        borderRadius: '100px',
                        color: course.color,
                      }}
                    >
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ color: THEME.textLight, lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {course.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: THEME.textMuted, fontSize: '0.875rem' }}>
                  <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {course.students} enrolled
                </span>
                <MagneticButton variant="outline" style={{ padding: '8px 16px' }}>
                  Learn More
                  <ChevronRight size={14} />
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS SECTION
───────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   BENEFITS SECTION
───────────────────────────────────────────────────────────── */
const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Rocket size={28} />,
      title: 'Industry-Ready Curriculum',
      description: 'Learn what actually matters in the industry',
    },
    {
      icon: <Brain size={28} />,
      title: 'Personalized Learning',
      description: 'Adaptive learning paths based on your goals',
    },
    {
      icon: <Target size={28} />,
      title: 'Placement Focused',
      description: 'Dedicated placement assistance and support',
    },
    {
      icon: <Award size={28} />,
      title: 'Certification',
      description: 'Get certified and boost your resume',
    },
  ];

  return (
    <section style={{ padding: '6rem 2rem', background: THEME.bg }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: THEME.accent,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Benefits
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginTop: '0.5rem',
              }}
            >
              Why Students{' '}
              <span className="gradient-text">Choose Us</span>
            </h2>
          </div>
        </SectionReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                background: THEME.cardBg,
                padding: '2.5rem',
                borderRadius: '24px',
                boxShadow: `0 10px 30px ${THEME.shadow}`,
                border: `1px solid ${THEME.border}`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '70px',
                  background: `${THEME.accent}10`,
                  color: THEME.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                {benefit.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                {benefit.title}
              </h3>
              <p style={{ color: THEME.textLight, fontSize: '0.875rem' }}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Range Slider Component */}
        <RangeSlider />
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   FOOTER SECTION
───────────────────────────────────────────────────────────── */


const GridCell = ({ introActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [introOn, setIntroOn] = useState(false);

  useEffect(() => {
    if (introActive) {
      // randomly activate some cells
      if (Math.random() > 0.7) {
        const delay = Math.random() * 800;

        const timer = setTimeout(() => {
          setIntroOn(true);

          // fade out before intro ends
          setTimeout(() => {
            setIntroOn(false);
          }, 500);
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
        animate={{
          borderColor: active ? "#ff6b6b" : THEME.border,
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          border: `1px solid`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

const GridBackground = () => {
  const rows = 9;
  const cols = 17;

  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroActive(false);
    }, 1500);

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
/* ─────────────────────────────────────────────────────────────
   MAIN HOME COMPONENT
───────────────────────────────────────────────────────────── */
const Home = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    let lenis;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });

    return () => {
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
    {/* <GridBackground /> */}
      <GlobalStyles />
      <CustomCursor />
      
      <main style={{marginTop:"50px"}}>
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        
        <BenefitsSection />
      </main>
    </>
  );
};

export default Home;