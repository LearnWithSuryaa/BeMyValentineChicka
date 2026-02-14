"use client";

import { motion } from "motion/react";
import Image from "next/image";

const memories = [
  {
    id: 1,
    src: "/memories/photo-1.jpg",
    span: "col-span-1 md:col-span-2 row-span-2",
    title: "Late Night Talks",
  },
  {
    id: 2,
    src: "/memories/photo-2.jpg",
    span: "col-span-1",
    title: "New Year Vibes",
  },
  {
    id: 3,
    src: "/memories/photo-3.jpg",
    span: "col-span-1",
    title: "Special Day",
  },
  {
    id: 4,
    src: "/memories/photo-4.jpg",
    span: "col-span-1 md:col-span-2",
    title: "Cozy Evenings",
  },
  {
    id: 5,
    src: "/memories/photo-5.jpg",
    span: "col-span-1",
    title: "Just Us",
  },
];

export default function MemoryGallery() {
  return (
    <section className="min-h-screen bg-burgundy py-20 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-blush font-bold text-center mb-16"
        >
          Our Memories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 gap-4 h-[80vh]">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${memory.span} relative rounded-3xl overflow-hidden group cursor-pointer bg-wine/20`}
            >
              <Image
                src={memory.src}
                alt={memory.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white/90 font-medium text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {memory.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
