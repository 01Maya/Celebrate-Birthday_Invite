"use client"

import { motion } from "framer-motion"

export function GlitchButton() {
  return (
    <motion.button
      className="glass px-8 py-4 rounded-full text-lilac font-medium border-2 border-lilac/40 backdrop-blur-md relative overflow-hidden group"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-lilac/20 to-gold/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative">Interact</span>
    </motion.button>
  )
}

export function FloatingButton({ children, ...props }: any) {
  return (
    <motion.button
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export function PulseElement() {
  return (
    <motion.div
      className="w-4 h-4 rounded-full bg-lilac"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
      }}
    />
  )
}
