"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GradientHeading } from "@/components/animations/text-animations"
import ScratchCard from "@/components/animations/scratch-card"

const galleryImages = [
  { id: 1, emoji: "🎉", label: "Party", memory: "Let's celebrate!", color: "#a066a0" },   // Deeper Lilac
  { id: 2, emoji: "🥂", label: "Cheers", memory: "To new moments!", color: "#e06a9d" },  // Rich Blush
  { id: 3, emoji: "🎊", label: "Joy", memory: "Pure happiness!", color: "#6fb5b5" },     // Calm Teal
  { id: 4, emoji: "🍰", label: "Cake", memory: "Sweet memories!", color: "#e19076" },    // Warm Peach
  { id: 5, emoji: "🎈", label: "Balloons", memory: "Up in the air!", color: "#7ecf98" }, // Fresh Mint
  { id: 6, emoji: "💃", label: "Dance", memory: "Dance away!", color: "#d060a8" },       // Bright Magenta
]

export default function Gallery() {
  const [revealedCards, setRevealedCards] = useState<number[]>([])

  return (
    <section
      id="gallery"
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-blush/5 to-background overflow-hidden"
    >
      {/* Background floating blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: [100, 150, 120][i % 3],
              height: [100, 150, 120][i % 3],
              background: [
                "rgba(200, 150, 200, 0.1)",
                "rgba(168, 216, 216, 0.1)",
                "rgba(244, 201, 184, 0.1)",
              ][i % 3],
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 100}%`,
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, 20, -10],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <GradientHeading text="Moments & Memories" className="text-5xl md:text-6xl mb-4" />
          <p className="text-foreground/70 text-lg drop-shadow-md">
            Discover special memories — scratch the cards!
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ScratchCard
                width={240}
                height={240}
                className="mx-auto w-full h-60 md:w-80 md:h-80"
                revealContent={
                  <motion.div
                    className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-lilac/20 via-gold/20 to-baby-blue/20 backdrop-blur-sm rounded-xl p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="text-6xl md:text-7xl mb-3"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {img.emoji}
                    </motion.div>
                    <p className="text-sm md:text-base font-bold text-foreground text-center">
                      {img.memory}
                    </p>
                  </motion.div>
                }
              >
                <div className="text-center px-4">
                  {/* ✅ Dynamic text color */}
                  <p
                    className="text-3xl md:text-4xl font-bold transition-all duration-300"
                    style={{ color: img.color }}
                  >
                    {img.label}
                  </p>
                </div>
              </ScratchCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
