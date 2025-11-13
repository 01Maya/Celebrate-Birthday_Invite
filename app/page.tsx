"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "@/components/sections/hero"
import EventDetails from "@/components/sections/event-details"
import Gallery from "@/components/sections/gallery"
import Countdown from "@/components/sections/countdown"
import Location from "@/components/sections/location"
import ClosingSection from "@/components/sections/closing"
import Confetti, { ConfettiRef } from "@/components/animations/confetti"
import FloatingElements from "@/components/animations/floating-elements"
import Preloader from "@/components/animations/preloader"
import CustomCursor from "@/components/animations/custom-cursor"
import Navbar from "@/components/navigation/navbar"

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const confettiRef = useRef<ConfettiRef>(null)

  // Show confetti once loading completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setShowConfetti(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // ✅ Trigger new confetti burst without restarting animation
  const handleReplayConfetti = () => {
    confettiRef.current?.trigger()
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>

      <FloatingElements />

      {/* Confetti component now controlled via ref */}
      {!isLoading && showConfetti && <Confetti ref={confettiRef} />}

      {/* ✨ Minimal Replay Button */}
      <motion.button
        onClick={handleReplayConfetti}
        className="fixed bottom-8 right-8 z-40 glass rounded-full px-6 py-3 text-sm font-medium text-lilac hover:bg-lilac/10 transition-all duration-300 hover:shadow-lg"
        whileHover={{ scale: 1.08, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      >
        ✨ Replay
      </motion.button>

      <main className="overflow-x-hidden bg-background" id="home">
        <Hero />
        <EventDetails />
        <Gallery />
        <Countdown />
        <Location />
        <ClosingSection />
      </main>
    </>
  )
}
