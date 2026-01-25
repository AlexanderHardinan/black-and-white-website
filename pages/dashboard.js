// pages/dashboard.js
import Head from "next/head";
import { motion } from "framer-motion";

import StatsOverview from "../components/dashboard/StatsOverview";
import TrendCharts from "../components/dashboard/TrendCharts";
import WorldMap from "../components/dashboard/WorldMap";
import EditorialHighlights from "../components/dashboard/EditorialHighlights";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | The Culinary World Gazette</title>
        <meta
          name="description"
          content="Editorial analytics, trends, and global map insights for The Culinary World Gazette."
        />
      </Head>

      <div className="container py-10 sm:py-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              EDITORIAL DASHBOARD
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              Global Editorial Overview
            </h1>

            <p className="text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed">
              Analytics and editorial control room for featured stories, trend signals, and
              global discovery insights—built for modern publishing workflows.
            </p>
          </div>
        </motion.div>

        {/* Top grid: stats + highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-base sm:text-lg font-semibold tracking-wide">
                  Editorial Metrics
                </h2>
                <span className="text-xs text-white/60">
                  Snapshot (demo)
                </span>
              </div>
              <StatsOverview />
            </div>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-base sm:text-lg font-semibold tracking-wide">
                  Editorial Highlights
                </h2>
                <span className="text-xs text-white/60">
                  Curated (demo)
                </span>
              </div>
              <EditorialHighlights />
            </div>
          </motion.section>
        </div>

        {/* Middle grid: charts */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-5 sm:mt-6"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <h2 className="text-base sm:text-lg font-semibold tracking-wide">
                Trend Signals
              </h2>
              <p className="text-xs text-white/60">
                Story velocity, interest curve, and category momentum (demo)
              </p>
            </div>
            <TrendCharts />
          </div>
        </motion.section>

        {/* Bottom grid: map */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-5 sm:mt-6"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-semibold tracking-wide">
                  Global Reach Map
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Regional spotlight and discovery routes (demo)
                </p>
              </div>
              <div className="text-xs text-white/60">
                Tap regions to highlight
              </div>
            </div>

            <WorldMap />
          </div>
        </motion.section>

        {/* Note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-8 sm:mt-10 text-xs text-white/55"
        >
          This dashboard is currently running with demo data. Next steps will wire it
          into your site content model without changing existing design or structure.
        </motion.div>
      </div>
    </>
  );
}
