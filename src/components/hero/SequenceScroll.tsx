"use client";

import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from "motion/react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { cn } from "@/lib/utils";

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  const frameCount = 192;
  const { images, loaded, progress } = useImagePreloader(frameCount);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // We want the sequence to finish EARLY around 80% of the scroll
  // because the last 20% (100vh) is covered by the next section
  // 500vh safe / 600vh total = 0.83
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const effectiveProgress = Math.min(latest / 0.8, 1);

    // Smoothly map progress to frame index
    const index = Math.min(
      Math.max(Math.floor(effectiveProgress * (frameCount - 1)), 0),
      frameCount - 1,
    );
    setFrameIndex(index);
  });

  // Text Animations - Distributed evenly across the safe timeline (0-0.8)

  // Text 1 (0-15%): Visible at start, fades out
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.18], [0, -50]);

  // Text 2 (20-35%): Fades in, visible, fades out
  const opacity2 = useTransform(
    scrollYProgress,
    [0.2, 0.23, 0.32, 0.35],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(scrollYProgress, [0.2, 0.35], [50, -50]);

  // Text 3 (40-55%): Fades in, visible, fades out
  const opacity3 = useTransform(
    scrollYProgress,
    [0.4, 0.43, 0.52, 0.55],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(scrollYProgress, [0.4, 0.55], [50, -50]);

  // Text 4 (60-80%): Fades in, stays visible until overlap starts (around 0.85)
  // FULLY VISIBLE by 0.65 to ensure it's readable
  const opacity4 = useTransform(scrollYProgress, [0.6, 0.65, 0.85], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.6, 0.75], [50, 0]); // Stop moving earlier

  // Draw frame on canvas
  useEffect(() => {
    if (!loaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img) return;

    // Function to mimic object-fit: cover
    const drawImageCover = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const x = (canvasWidth - imgWidth * scale) / 2;
      const y = (canvasHeight - imgHeight * scale) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    drawImageCover();
  }, [frameIndex, loaded, images]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw immediately
        if (loaded && images[frameIndex]) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          const img = images[frameIndex];
          if (ctx && img) {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = img.width;
            const imgHeight = img.height;
            const scale = Math.max(
              canvasWidth / imgWidth,
              canvasHeight / imgHeight,
            );
            const x = (canvasWidth - imgWidth * scale) / 2;
            const y = (canvasHeight - imgHeight * scale) / 2;
            ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-burgundy">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Loading Overlay */}
        {!loaded && (
          <div className="fixed inset-0 flex items-center justify-center bg-burgundy z-[100] text-blush pointer-events-auto">
            <div className="text-center">
              <h2 className="text-2xl font-light mb-4 animate-pulse uppercase tracking-[0.2em]">
                {progress === 100 ? "Ready" : "Loading Memories..."}
              </h2>
              <div className="w-64 h-[2px] bg-wine/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blush transition-all duration-300 ease-out shadow-[0_0_10px_rgba(255,197,197,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-mono opacity-40">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        )}

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
          {/* 0% - Centered */}
          <motion.div
            style={{ opacity: opacity1, y: y1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-blush drop-shadow-lg mb-4">
              Happy Valentine’s Day,
              <br />
              <span className="text-gold">Chicka Cantikk</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light">
              You are the most beautiful chapter of my life.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
