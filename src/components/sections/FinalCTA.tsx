"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className="px-12 py-5 bg-white text-wine font-bold text-xl rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Open My Heart
        </button>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white/95 text-center p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full relative border-4 border-blush"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-wine hover:bg-blush/20 rounded-full p-2 transition-colors"
              >
                ✕
              </button>

              <div className="mb-6 text-6xl animate-bounce">❤️</div>

              <h3 className="text-3xl md:text-4xl font-bold text-wine mb-4 font-outfit">
                Happy Valentine's Day!
              </h3>

              <p className="text-xl md:text-2xl text-wine/80 font-medium leading-relaxed">
                Chicka Cantikkkk! <br />I love you so much! 🌹
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(false)}
                className="mt-8 px-8 py-3 bg-wine text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
