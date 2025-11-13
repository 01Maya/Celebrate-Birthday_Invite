"use client"

import { useEffect, useState, useRef } from "react"

interface CursorPosition {
  x: number
  y: number
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const trailRef = useRef<{ x: number; y: number }[]>([])
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdateRef.current > 16) {
        setMousePosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
        lastUpdateRef.current = now

        trailRef.current.push({ x: e.clientX, y: e.clientY })
        if (trailRef.current.length > 25) {
          trailRef.current.shift()
        }
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      trailRef.current = []
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div>
      <style>{`
        * { cursor: none; }
        a, button, [role="button"] { cursor: none; }

        @keyframes shimmer {
          0% { transform: scale(1) rotate(0deg); opacity: 0.8; filter: brightness(1.2); }
          50% { transform: scale(1.3) rotate(180deg); opacity: 0.4; filter: brightness(1.5); }
          100% { transform: scale(1) rotate(360deg); opacity: 0.8; filter: brightness(1.2); }
        }

        @keyframes glitter {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>

      {isVisible && (
        <>
          {/* ✨ Shimmering Glitter Trail */}
          <div className="fixed inset-0 pointer-events-none z-[99999]">
            {trailRef.current.map((pos, i) => {
              const opacity = (i + 1) / Math.max(trailRef.current.length, 1)
              const size = 6 + i * 0.8
              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: pos.x - size / 2,
                    top: pos.y - size / 2,
                    width: `${size}px`,
                    height: `${size}px`,
                    background: `radial-gradient(circle, rgba(255,215,180,0.9), rgba(200,150,200,0.6))`,
                    opacity: opacity * 0.5,
                    boxShadow: `0 0 ${8 + i * 1.5}px rgba(230, 180, 255, 0.5), 0 0 ${4 + i}px rgba(255, 230, 180, 0.3)`,
                    animation: `shimmer ${2 + i * 0.05}s infinite linear, glitter ${1.5 + i * 0.1}s ease-in-out infinite`,
                    filter: `blur(${Math.max(0, i * 0.15)}px)`,
                    pointerEvents: "none",
                  }}
                />
              )
            })}
          </div>

          {/* ✨ Main Cursor Ring */}
          <div
            className="fixed w-5 h-5 rounded-full border-2 border-lilac pointer-events-none z-50"
            style={{
              left: mousePosition.x - 10,
              top: mousePosition.y - 10,
              transform: "translate(0, 0)",
              boxShadow: "0 0 10px rgba(200, 150, 200, 0.5)",
              backdropFilter: "blur(2px)",
            }}
          />

          {/* ✨ Inner Cursor Glow */}
          <div
            className="fixed w-2 h-2 rounded-full bg-gradient-to-r from-lilac to-gold pointer-events-none z-50"
            style={{
              left: mousePosition.x - 4,
              top: mousePosition.y - 4,
              boxShadow: "0 0 8px rgba(255, 200, 255, 0.8), 0 0 12px rgba(255, 220, 180, 0.5)",
              animation: "glitter 1.5s ease-in-out infinite",
            }}
          />
        </>
      )}
    </div>
  )
}
