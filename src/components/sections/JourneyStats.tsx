"use client";

import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Counter({
  from,
  to,
  label,
}: {
  from: number;
  to: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const spring = useSpring(from, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, spring, to]);

  return (
    <div ref={ref} className="text-center">
      <motion.span className="text-6xl md:text-8xl font-bold text-gold block mb-2">
        {display}
      </motion.span>
      <span className="text-xl md:text-2xl text-blush/80 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function JourneyStats() {
  const startDate = new Date("2025-04-18");
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const daysTogether = Math.ceil(diffTime / (1000 + 60 * 60 * 24));
  // Wait, let's fix the math: 1000 * 60 * 60 * 24
  const days = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <section className="min-h-[50vh] bg-burgundy py-20 relative z-20 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <Counter from={0} to={days} label="Days Together" />
        <Counter from={0} to={1000000} label="Memories Created" />
        <div className="text-center">
          <span className="text-6xl md:text-8xl font-bold text-gold block mb-2">
            ∞
          </span>
          <span className="text-xl md:text-2xl text-blush/80 uppercase tracking-widest">
            Love
          </span>
        </div>
      </div>
    </section>
  );
}
