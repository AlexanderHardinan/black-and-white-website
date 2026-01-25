// components/home/BackgroundFX.js
import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundFX() {
  const reduceMotion = useReducedMotion();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const floatAnim = (delay = 0, duration = 10) =>
    reduceMotion
      ? undefined
      : {
          y: [0, -10, 0],
          transition: {
            delay,
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };

  return (
    <>
      {/* Base animated gradient */}
      <motion.div
        className="absolute inset-0 -z-50"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={reduceMotion ? undefined : { backgroundPosition: "100% 50%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(270deg, #000, #0b0b0b, #111, #0b0e10)",
          backgroundSize: "400% 400%",
        }}
        aria-hidden="true"
      />

      {/* Vignette + soft glows */}
      <div
        className="absolute inset-0 -z-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 420px at 25% 20%, rgba(203,161,53,0.10), transparent 60%)," +
            "radial-gradient(800px 500px at 78% 30%, rgba(255,255,255,0.06), transparent 60%)," +
            "radial-gradient(900px 700px at 50% 80%, rgba(0,0,0,0.65), transparent 65%)," +
            "radial-gradient(1200px 900px at 50% 50%, rgba(0,0,0,0.55), rgba(0,0,0,0.88))",
        }}
        aria-hidden="true"
      />

      {/* Collage “screens” behind the hero (reference-style layers) */}
      <div className="absolute inset-0 -z-30 pointer-events-none overflow-hidden">
        {/* Left back screen */}
        <motion.div
          className="hidden md:block absolute left-[2%] top-[18%] w-[360px] lg:w-[420px] h-[260px] lg:h-[290px] rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          style={{ transform: "rotate(-6deg)" }}
          animate={floatAnim(0.1, 11)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/40" />
            <div className="p-5">
              <div className="h-2.5 w-28 rounded-full bg-white/20" />
              <div className="mt-3 h-3.5 w-44 rounded-full bg-white/12" />
              <div className="mt-6 grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded-2xl border border-white/10 bg-white/5"
                  />
                ))}
              </div>
              <div className="mt-4 h-20 rounded-2xl border border-white/10 bg-white/5" />
            </div>
          </div>
        </motion.div>

        {/* Right back screen */}
        <motion.div
          className="hidden md:block absolute right-[3%] top-[12%] w-[380px] lg:w-[460px] h-[300px] lg:h-[340px] rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          style={{ transform: "rotate(5deg)" }}
          animate={floatAnim(0.25, 12.5)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/45" />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-24 rounded-full bg-white/20" />
                <div className="h-2.5 w-10 rounded-full bg-white/10" />
              </div>
              <div className="mt-4 h-24 rounded-2xl border border-white/10 bg-white/5" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-20 rounded-2xl border border-white/10 bg-white/5" />
                <div className="h-20 rounded-2xl border border-white/10 bg-white/5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Small lower-left tile */}
        <motion.div
          className="hidden lg:block absolute left-[8%] bottom-[10%] w-[280px] h-[190px] rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
          style={{ transform: "rotate(2deg)" }}
          animate={floatAnim(0.4, 10.5)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/50" />
            <div className="p-5">
              <div className="h-3 w-32 rounded-full bg-white/14" />
              <div className="mt-4 h-20 rounded-2xl border border-white/10 bg-white/5" />
              <div className="mt-3 flex gap-2">
                <div className="h-8 w-20 rounded-full border border-white/10 bg-white/5" />
                <div className="h-8 w-16 rounded-full border border-white/10 bg-white/5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Small lower-right tile */}
        <motion.div
          className="hidden lg:block absolute right-[7%] bottom-[12%] w-[300px] h-[200px] rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
          style={{ transform: "rotate(-2deg)" }}
          animate={floatAnim(0.55, 11.2)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/50" />
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="h-24 rounded-2xl border border-white/10 bg-white/5" />
                <div className="h-24 rounded-2xl border border-white/10 bg-white/5" />
              </div>
              <div className="mt-4 h-3 w-44 rounded-full bg-white/12" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Particles */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-20"
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
