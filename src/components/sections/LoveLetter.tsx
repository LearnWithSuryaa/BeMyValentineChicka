"use client";

import { motion } from "motion/react";
import { useState } from "react";

const letters = [
  "My dearest, from the moment our eyes met, I knew...",
  "Every laugh we share echoes in my heart forever.",
  "You are my safe haven, my quiet place in a loud world.",
  "I promise to love you, today, tomorrow, and always.",
];

export default function LoveLetter() {
  const [index, setIndex] = useState(0);

  return (
    <section className="min-h-screen bg-wine flex flex-col items-center justify-center py-20 relative z-20 overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden">
        <span className="text-[20vw] font-bold text-blush whitespace-nowrap">
          LOVE YOU
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl font-light text-gold mb-12 tracking-widest uppercase">
          My Vows to You
        </h2>

        <div className="h-64 flex items-center justify-center">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl md:text-4xl text-white font-light italic leading-relaxed"
          >
            &quot;{letters[index]}&quot;
          </motion.p>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          {letters.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-gold scale-125" : "bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
