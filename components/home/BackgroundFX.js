// components/home/BackgroundFX.js
import { useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundFX() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(270deg, #000, #0b0b0b, #111, #0b0e10)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Particles layer */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#CBA135" },
            move: { enable: true, speed: 0.55, direction: "top" },
            number: { value: 28, density: { enable: true, area: 900 } },
            opacity: { value: 0.38 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />
    </>
  );
}
