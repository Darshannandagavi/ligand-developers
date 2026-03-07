import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import GlobalStyles from "../StyleComponents/GlobalStyles";
import CustomCursor from "../StyleComponents/CustomCursor";
import HeroSection from "./Home/HeroSection"
import FeaturesSection from "./Home/FeaturesSection"
import BenefitsSection from "./Home/BenefitsSection"
import CoursesSection from "./Home/CoursesSection"
gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
const Home = () => {
  useEffect(() => {
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <CustomCursor />

      <main style={{ marginTop: "50px" }}>
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <BenefitsSection />
      </main>
    </>
  );
};

export default Home;