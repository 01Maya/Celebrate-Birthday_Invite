"use client"

import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [sparkles, setSparkles] = useState<any[]>([])

  // ✅ Generate sparkles ONLY on client-side
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: ["#c896c8", "#f5a6cc", "#f4c9b8"][Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.5 + 0.2,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }))

    setSparkles(generated)
  }, [])

  // ⛔ Prevents flash
  if (sparkles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">

      {/* 🎈 Floating balloons */}
      <div className="absolute top-20 left-10 w-8 h-10 rounded-full bg-gradient-to-br from-lilac to-blush animate-float opacity-20" />
      <div className="absolute top-40 right-20 w-6 h-8 rounded-full bg-gradient-to-br from-baby-blue to-mint animate-float opacity-20" />
      <div className="absolute bottom-32 left-1/4 w-7 h-9 rounded-full bg-gradient-to-br from-gold to-peach animate-float opacity-20" />

      {/* ✨ Floating sparkles — hydration safe */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: s.left,
            top: s.top,
            backgroundColor: s.color,
            opacity: s.opacity,
            animation: `pulse ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* 🌈 Soft animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-blush/5 to-baby-blue/5 animate-pulse opacity-30" />
    </div>
  )
}
