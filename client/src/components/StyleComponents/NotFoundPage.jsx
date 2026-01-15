import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import "./NotFoundPage.css";
import { FaSoundcloud } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const canvasRef = useRef(null);
  const terminalRef = useRef(null);

  // Floating code symbols animation controls
  const floatingControls = useAnimation();

  // Terminal typing simulation
  useEffect(() => {
    const messages = [
      "> npm run dev",
      "✔ Server running successfully...",
      "✔ MongoDB connected successfully...",
      "✗ GET /undefined-route 404",
      "> Error: Route not found",
      "> Suggestion: Check your routing config",
      "> Debug: console.log(routes);",
      "> Hint: Try /dashboard instead",
    ];

    let currentLine = 0;
    let currentChar = 0;
    const lines = [];

    const typeNextChar = () => {
      if (currentLine < messages.length) {
        if (currentChar === 0) {
          lines.push({
            text: "",
            isError:
              messages[currentLine].startsWith("✗") ||
              messages[currentLine].startsWith("> Error"),
          });
          setTerminalLines([...lines]);
        }

        if (currentChar < messages[currentLine].length) {
          lines[currentLine].text += messages[currentLine][currentChar];
          setTerminalLines([...lines]);
          currentChar++;
          setTimeout(typeNextChar, 30 + Math.random() * 70);
        } else {
          currentLine++;
          currentChar = 0;
          setTimeout(typeNextChar, 500);
        }
      }
    };

    const typeTimer = setTimeout(typeNextChar, 1000);

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(typeTimer);
      clearInterval(cursorInterval);
    };
  }, []);

  // Floating animations
  useEffect(() => {
    floatingControls.start({
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [floatingControls]);

  // Matrix rain effect on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "01{}/<>;[]()#@!$%^&*-+=|~`";
    const chars = matrix.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
    }

    let animationId;

    const draw = () => {
      ctx.fillStyle = "rgba(102, 126, 234, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient effect for characters
        const gradient = ctx.createLinearGradient(x, y, x, y + fontSize * 3);
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.5, "#667eea");
        gradient.addColorStop(1, "#764ba2");
        ctx.fillStyle = gradient;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Interactive button hover effects
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  // Glitch animation variants
  const glitchVariants = {
    initial: { x: 0 },
    glitch: {
      x: [0, -5, 5, -3, 3, 0],
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="not-found-container">
      {/* Matrix rain background */}
      <canvas ref={canvasRef} className="matrix-canvas" />

      {/* Animated gradient overlay */}
      <div className="gradient-overlay" />

      {/* Floating code symbols */}
      <div className="floating-symbols">
        {[
          "{",
          "}",
          "<",
          ">",
          ";",
          "(",
          ")",
          "[",
          "]",
          "=",
          "+",
          "-",
          "*",
          "/",
        ].map((symbol, index) => (
          <motion.div
            key={index}
            className="floating-symbol"
            style={{
              left: `${10 + ((index * 6) % 80)}%`,
              top: `${20 + ((index * 7) % 60)}%`,
              fontSize: `${1 + (index % 3)}rem`,
              opacity: 0.1 + (index % 3) * 0.1,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(index) * 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="content-wrapper">
        {/* Left content section */}
        <motion.div
          className="left-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glitch effect on 404 */}
          <motion.div
            className="error-header"
            variants={glitchVariants}
            >
            <NavLink to='/404INVADERS' style={{textDecoration:"none"}}><h1 className="error-code">
              4
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                0
              </motion.span>
              4
            </h1></NavLink>

            <motion.h2
              className="main-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="heading-text">Dead Endpoint Detected</span>
              <motion.div
                className="scan-line"
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </motion.h2>
          </motion.div>

          

          {/* Animated code snippet */}
          <motion.div
            className="code-snippet"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="code-header">
              <div className="code-dots">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
              </div>
              <span>error-handler.js</span>
            </div>
            <pre className="code-content">
              <code>
                <div>
                  <span className="code-keyword">const</span>{" "}
                  <span className="code-variable">handle404</span> ={" "}
                  <span className="code-keyword">async</span> () =&nbsp;{"{"}
                </div>

                <div className="code-indent">
                  <span className="code-keyword">try</span>
                  {" {"}
                </div>

                <div className="code-indent-2">
                  <span className="code-builtin">console</span>.
                  <span className="code-function">warn</span>(
                  <span className="code-string">"🚫 Route not found"</span>);
                </div>

                <div className="code-indent-2">
                  <span className="code-keyword">await</span>{" "}
                  <span className="code-function">redirectToSafeRoute</span>();
                </div>

                <div className="code-indent">{"}"}</div>

                <div className="code-indent">
                  <span className="code-keyword">catch</span> (err) {"{"}
                </div>

                <div className="code-indent-2">
                  <span className="code-builtin">console</span>.
                  <span className="code-function">error</span>(
                  <span className="code-string">"💥"</span>, err);
                </div>

                <div className="code-indent-2">
                  <span className="code-function">fallbackToHome</span>();
                </div>

                <div className="code-indent">{"}"}</div>
                <div>{"}"}</div>
              </code>
            </pre>
          </motion.div>

          {/* Interactive buttons */}
          <div className="cta-section">
            <motion.a
              href="/"
              className="cta-button primary"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={() => setHoveredButton("primary")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <motion.span
                animate={{
                  x: hoveredButton === "primary" ? [0, 5, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <i className="fas fa-rocket" /> Back TO Dashboard
              </motion.span>
              <motion.div
                className="button-particles"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredButton === "primary" ? 1 : 0,
                  scale: hoveredButton === "primary" ? 1 : 0,
                }}
              />
            </motion.a>

            

            
          </div>

          
        </motion.div>

        {/* Right terminal section */}
        
        <motion.div
          className="right-terminal"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
            <motion.p
            className="supporting-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            The route you're looking for returned a 404. Even senior devs
            encounter missing endpoints while exploring new stacks. Consider
            this a learning breakpoint.
          </motion.p>
          <div className="terminal-container">
            <div className="terminal-header">
              <div className="terminal-title">
                <i className="fas fa-terminal" /> bash — 404_terminal
              </div>
              <div className="terminal-controls">
                <div className="terminal-control minimize" />
                <div className="terminal-control maximize" />
                <div className="terminal-control close" />
              </div>
            </div>

            <div className="terminal-body" ref={terminalRef}>
              <div className="terminal-welcome">
                <span className="terminal-prompt">visitor@liganddev:~$</span>{" "}
                welcome_Ligand_Developers
              </div>

              <div className="terminal-output">
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className={`terminal-line ${
                      line.isError ? "error-line" : ""
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {line.text}
                  </motion.div>
                ))}

                <div className="terminal-input-line">
                  <span className="terminal-prompt">visitor@liganddev:~$</span>
                  <span className="terminal-cursor">
                    {cursorVisible ? "▋" : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="terminal-footer">
              <div className="terminal-stats">
                <span>
                  <i className="fas fa-bolt" /> CPU: 42%
                </span>
                <span>
                  <i className="fas fa-memory" /> MEM: 1.2GB
                </span>
                <span>
                  <i className="fas fa-network-wired" /> NET: 127.0.0.1:3000
                </span>
              </div>
            </div>
          </div>

          {/* Animated developer avatar */}
          <motion.div className="developer-avatar" animate={floatingControls}>
            <div className="avatar-container">
              <div className="avatar-head">
                <div className="avatar-eye left" />
                <div className="avatar-eye right" />
                <div className="avatar-mouth" />
              </div>
              <div className="avatar-body">
                <div className="avatar-laptop">
                  <div className="laptop-screen">
                    <motion.div
                      className="screen-content"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      {">_"}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="avatar-thought"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, type: "spring" }}
            >
              <i className="fas fa-question-circle" /> 404??
            </motion.div>
          </motion.div>

          {/* Connection nodes animation */}
          <div className="connection-nodes">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="connection-node"
                style={{
                  left: `${(i * 15) % 100}%`,
                  top: `${20 + ((i * 12) % 60)}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Connection lines */}
            <svg className="connection-lines" width="100%" height="100%">
              <motion.path
                d="M20,50 Q150,30 250,80 T400,40"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.path
                d="M80,120 Q200,90 300,150 T450,100"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 1, repeat: Infinity }}
              />
            </svg>
          </div>
        </motion.div>
      </div>

      

     
    </div>
  );
};

export default NotFoundPage;
