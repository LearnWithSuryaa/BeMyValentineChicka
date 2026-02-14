"use client";

import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";

const paragraph =
  "It started with a simple 'Hello,' but it turned into a lifetime of 'I love you.' From late-night calls to quiet mornings, every second spent with you feels like a beautiful dream I never want to wake up from.";

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "center 0.5"],
  });

  const chars = paragraph.split(" ").map((word) => word + " ");

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-burgundy py-20 relative z-20"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm md:text-base tracking-widest uppercase text-gold mb-12"
        >
          Our Story
        </motion.h2>

        <p className="text-3xl md:text-5xl leading-tight font-light flex flex-wrap justify-center">
          {chars.map((word, i) => {
            const start = i / chars.length;
            const end = start + 1 / chars.length;
            return (
              <Word key={i} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

const Word = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const color = useTransform(progress, range, ["#ffc5c5", "#d4af37"]); // Blush to Gold
  const blur = useTransform(progress, range, ["4px", "0px"]);

  return (
    <motion.span
      style={{ opacity, color, filter: `blur(${blur})` }}
      className="mr-3 text-3xl md:text-5xl transition-colors duration-200"
    >
      {children}
    </motion.span>
  );
};
