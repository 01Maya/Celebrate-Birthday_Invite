"use client"

import { motion } from "framer-motion"

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-background via-blush/5 to-baby-blue/10 flex items-center justify-center z-50"
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="text-center">
        <motion.div
          className="w-20 h-24 rounded-full bg-gradient-to-br from-lilac to-blush mx-auto mb-8 relative"
          animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        >
          {/* Balloon string */}
          <motion.div
            className="absolute bottom-0 left-1/2 w-0.5 h-12 bg-lilac/40"
            style={{ translateX: "-50%", originY: "top" }}
          />
        </motion.div>

        {/* Loading text with shimmer */}
        <motion.p
          className="text-lilac font-serif text-2xl font-semibold"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading your celebration...
        </motion.p>

        {/* Decorative dots */}
        <motion.div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-lilac/60"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Number.POSITIVE_INFINITY }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
