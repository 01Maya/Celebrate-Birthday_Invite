"use client"

import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
  rotation: number
  swayAmount: number
  startX: number
  spinAmount: number
}

export interface ConfettiRef {
  trigger: () => void
}

// ✅ ForwardRef lets parent (Home) control replay without re-rendering
const Confetti = forwardRef<ConfettiRef>((_, ref) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const particleIdRef = useRef(0)

  const createParticles = (count: number) => {
    const colors = [
      "#c896c8", "#f5a6cc", "#f4c9b8", "#a8d8d8", "#c8f4d4",
      "#ffe6cc", "#ffd6e8", "#d4f1f4", "#e8d5f2", "#ffc0e3",
      "#ffb3d9", "#b3e5fc", "#f0a5d8", "#a0d8f0", "#c8e6f5"
    ]

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: particleIdRef.current++,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 3.5 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 20,
      rotation: Math.random() * 360,
      swayAmount: 60 + Math.random() * 120,
      startX: (Math.random() - 0.5) * 300,
      spinAmount: 360 + Math.random() * 1080,
    }))

    // ✅ Append new confetti instead of restarting
    setParticles((prev) => [...prev, ...newParticles])

    // 🧹 Remove older confetti after 8s to keep memory light
    setTimeout(() => {
      setParticles((prev) => prev.slice(count))
    }, 8000)
  }

  // ✅ Run automatically on mount
  useEffect(() => {
    createParticles(350)
  }, [])

  // ✅ Allow parent to trigger confetti again
  useImperativeHandle(ref, () => ({
    trigger() {
      createParticles(350)
    },
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.left}%`,
            top: "-40px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: "50%",
            opacity: 0.95,
            filter: `blur(${particle.size * 0.08}px)`,
            boxShadow: `0 0 ${particle.size}px ${particle.color}60`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, typeof window !== "undefined" ? window.innerHeight + 100 : 1000],
            x: [
              particle.startX,
              Math.sin((particle.id / 350) * Math.PI) * particle.swayAmount * 1.2,
              particle.startX * 0.7,
            ],
            rotate: [0, particle.spinAmount],
            opacity: [0.95, 0.8, 0.4, 0.15, 0],
            scale: [0.8, 1.1, 1, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut",
            times: [0, 0.25, 0.6, 0.85, 1],
            repeat: 0,
          }}
        />
      ))}
    </div>
  )
})

Confetti.displayName = "Confetti"
export default Confetti
