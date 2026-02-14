"use client";

import { motion } from "motion/react";

export default function FinalCTA() {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-wine to-blush animate-gradient bg-[length:400%_400%]" />

      {/* Overlay to darken slightly */}
      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <h2 className="text-6xl md:text-9xl font-bold text-white mb-8 drop-shadow-xl">
          You are my forever.
        </h2>

        <button
          className="px-12 py-5 bg-white text-wine font-bold text-xl rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform"
          onClick={() => alert("Happy Valentine's Day Chicka Cantikkkk! ❤️")}
        >
          Open My Heart
        </button>
      </motion.div>
    </section>
  );
}
