"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SequenceScroll from "@/components/hero/SequenceScroll";
import AboutUs from "@/components/sections/AboutUs";
import MemoryGallery from "@/components/sections/MemoryGallery";
import JourneyStats from "@/components/sections/JourneyStats";
import RelationshipQuiz from "@/components/sections/RelationshipQuiz";
import LoveLetter from "@/components/sections/LoveLetter";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  return (
    <main className="relative bg-burgundy min-h-screen">
      <AnimatePresence mode="wait">
        {!isQuizCompleted ? (
          <motion.div
            key="quiz-gate"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="z-50 relative"
          >
            <RelationshipQuiz onComplete={() => setIsQuizCompleted(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <SequenceScroll />
            <div className="relative z-10 -mt-[100vh] rounded-t-[3rem] overflow-hidden bg-burgundy shadow-2xl pb-20">
              <div id="story">
                <AboutUs />
              </div>
              <div id="memories">
                <MemoryGallery />
              </div>
              <div id="stats">
                <JourneyStats />
              </div>
              {/* Optional: Show Quiz again or keep it hidden since we passed it */}
              <div id="quiz" className="hidden">
                <RelationshipQuiz />
              </div>
              <div id="letter">
                <LoveLetter />
              </div>
              <FinalCTA />

              <footer className="py-12 text-center text-blush/40 text-sm">
                <p>Made with ❤️ just for you Chickaa.</p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
