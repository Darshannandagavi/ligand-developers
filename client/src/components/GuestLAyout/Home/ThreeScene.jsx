import { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Html } from "@react-three/drei";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiJavascript,
} from "react-icons/si";
import { THEME } from "../constants/theme";

/* ─────────────────────────────────────────────────────────────
   CODE ORB
───────────────────────────────────────────────────────────── */
const CodeOrb = () => {
  const orbRef = useRef();
  const particlesRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (orbRef.current) {
      if (hovered) {
        const targetRotY = mousePos.x * 0.3;
        const targetRotX = mousePos.y * 0.2;
        orbRef.current.rotation.y +=
          (targetRotY - orbRef.current.rotation.y) * 0.05;
        orbRef.current.rotation.x +=
          (targetRotX - orbRef.current.rotation.x) * 0.05;
      } else {
        orbRef.current.rotation.y += 0.002;
        orbRef.current.rotation.x += 0.001;
      }
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const techIcons = [
    { icon: SiReact,      color: "#61dafb", delay: 0   },
    { icon: SiNodedotjs,  color: "#68a063", delay: 0.5 },
    { icon: SiPython,     color: "#3776ab", delay: 1   },
    { icon: SiDocker,     color: "#2496ed", delay: 1.5 },
    { icon: SiJavascript, color: "#f7df1e", delay: 2   },
  ];

  return (
    <group
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main glowing orb */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
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
          <Float key={i} speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <Html
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.5,
                Math.sin(angle) * radius * 0.3,
              ]}
              center
              distanceFactor={6}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  scale: hovered ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 3, repeat: Infinity, delay: tech.delay }}
                style={{
                  background: "white",
                  padding: "10px",
                  borderRadius: "12px",
                  boxShadow: `0 8px 20px ${tech.color}40`,
                  border: `2px solid ${tech.color}`,
                  transform: `scale(${hovered ? 1.2 : 1})`,
                  transition: "transform 0.3s ease",
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
                Math.sin(angle) * radius * 0.5,
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
   THREE SCENE
───────────────────────────────────────────────────────────── */
const ThreeScene = () => (
  <Canvas
    camera={{ position: [0, 0, 6], fov: 45 }}
    style={{ width: "100%", height: "100%", background: "transparent" }}
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

export { CodeOrb };
export default ThreeScene;
