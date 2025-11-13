"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface ScratchCardProps {
  children: React.ReactNode
  revealContent: React.ReactNode
  className?: string
  width?: number
  height?: number
}

export default function ScratchCard({
  children,
  revealContent,
  className = "",
  width = 240,
  height = 240,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const revealedRef = useRef(false)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    contextRef.current = ctx

    // Draw gradient scratch surface
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "#d4a5d4")
    gradient.addColorStop(0.5, "#f5a6cc")
    gradient.addColorStop(1, "#a8d8d8")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add shimmer/shine effect
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.lineWidth = 2
    ctx.strokeRect(2, 2, width - 4, height - 4)

    // Add instruction text
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
    ctx.font = "bold 18px Poppins"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Scratch", width / 2, height / 2 - 18)
    ctx.fillText("me!", width / 2, height / 2 + 10)
    ctx.font = "24px Arial"
    ctx.fillText("✨", width / 2, height / 2 + 50)

    revealedRef.current = false
  }, [width, height])

  const checkRevealed = useCallback(() => {
    if (!contextRef.current || revealedRef.current) return

    const ctx = contextRef.current
    try {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data
      let clearedPixels = 0
      const totalPixels = data.length / 4

      // Count pixels with alpha < 128 (transparent/scratched)
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 128) {
          clearedPixels++
        }
      }

      const percentage = (clearedPixels / totalPixels) * 100

      // Reveal at 40% scratched
      if (percentage > 40) {
        revealedRef.current = true
        setIsRevealed(true)
      }
    } catch (e) {
      console.error("Reveal check error:", e)
    }
  }, [width, height])

  const handleScratch = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current || !contextRef.current) return

      const canvas = canvasRef.current
      const ctx = contextRef.current
      const rect = canvas.getBoundingClientRect()

      const x = clientX - rect.left
      const y = clientY - rect.top

      // Larger brush size for better mobile interaction
      const brushSize = 30

      ctx.globalCompositeOperation = "destination-out"
      ctx.beginPath()
      ctx.arc(x, y, brushSize, 0, Math.PI * 2)
      ctx.fill()

      checkRevealed()
    },
    [checkRevealed],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseDown = () => setIsDrawing(true)
    const handleMouseUp = () => setIsDrawing(false)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return
      e.preventDefault()
      handleScratch(e.clientX, e.clientY)
    }

    const handleTouchStart = (e: TouchEvent) => {
      setIsDrawing(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDrawing) return
      e.preventDefault()
      if (e.touches.length > 0) {
        handleScratch(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchEnd = () => setIsDrawing(false)

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseleave", handleMouseUp)
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true })
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseleave", handleMouseUp)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDrawing, handleScratch])

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl select-none ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Reveal content underneath */}
      <div className="absolute inset-0 pointer-events-none">{revealContent}</div>

      {/* Canvas scratch overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          style={{
            touchAction: "none",
            display: "block",
            background: "transparent",
          }}
        />
      )}

      {/* Revealed content animation */}
      {isRevealed && (
        <motion.div
          className="absolute inset-0 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
