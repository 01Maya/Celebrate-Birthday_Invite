"use client"

import { motion } from "framer-motion"

interface TextAnimationsProps {
  text: string
  className?: string
  delay?: number
}

export function TypewriterText({ text, className = "", delay = 0 }: TextAnimationsProps) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.3,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export function ShimmerText({ text, className = "" }: TextAnimationsProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-lilac via-gold to-baby-blue bg-clip-text text-transparent font-bold ${className}`}
      animate={{
        backgroundPosition: ["0% center", "100% center", "0% center"],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {text}
    </motion.span>
  )
}

export function GradientHeading({ text, className = "" }: TextAnimationsProps) {
  return (
    <motion.h2
      className={`font-serif font-bold drop-shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        background: "linear-gradient(135deg, #c896c8 0%, #f5a6cc 25%, #f4c9b8 50%, #a8d8d8 75%, #c8f4d4 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        backgroundSize: "200% 200%",
        animation: "gradient-shift 4s ease infinite",
      }}
    >
      {text}
    </motion.h2>
  )
}

export function RevealText({ text, className = "" }: TextAnimationsProps) {
  return (
    <div className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.05,
            duration: 0.4,
          }}
          viewport={{ once: true }}
          className="inline-block mr-2 text-foreground"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export function EnhancedHeading({ text, className = "" }: TextAnimationsProps) {
  return (
    <motion.h1
      className={`font-serif font-bold drop-shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <span
        style={{
          background: "linear-gradient(135deg, #c896c8 0%, #f5a6cc 25%, #f4c9b8 50%, #a8d8d8 75%, #c8f4d4 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 4s ease infinite",
          display: "inline-block",
        }}
      >
        {text}
      </span>
    </motion.h1>
  )
}
