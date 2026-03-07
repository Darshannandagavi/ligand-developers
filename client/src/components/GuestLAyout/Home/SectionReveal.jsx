import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   SECTION REVEAL ANIMATION
───────────────────────────────────────────────────────────── */
const SectionReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.7,
      delay,
      ease: [0.43, 0.13, 0.23, 0.96],
    }}
  >
    {children}
  </motion.div>
);

export default SectionReveal;
