"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#memories", label: "Memories" },
  { href: "#stats", label: "Journey" },
  { href: "#letter", label: "My Letter" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-blush pointer-events-none">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter pointer-events-auto"
        >
          US
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm uppercase tracking-widest hover:text-white transition-colors pointer-events-auto"
        >
          Menu
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-burgundy flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-blush text-sm uppercase tracking-widest hover:text-white"
            >
              Close
            </button>

            <ul className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl md:text-6xl text-blush hover:text-gold font-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
