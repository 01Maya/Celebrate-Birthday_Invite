"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { GradientHeading } from "@/components/animations/text-animations"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
  >
    <motion.div
      className="bg-gradient-to-br from-lilac/25 to-gold/25 rounded-2xl p-6 md:p-8 min-w-24 md:min-w-32 border-2 border-lilac/30 relative overflow-hidden"
      animate={{
        boxShadow: [
          "0 0 20px rgba(200, 150, 200, 0.4)",
          "0 0 40px rgba(200, 150, 200, 0.6)",
          "0 0 20px rgba(200, 150, 200, 0.4)",
        ],
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
      />
      <p className="text-4xl md:text-5xl font-bold text-lilac relative z-10 drop-shadow-lg tabular-nums">
        {String(value).padStart(2, "0")}
      </p>
    </motion.div>
    <p className="text-sm md:text-base text-foreground/80 mt-4 uppercase tracking-widest font-bold drop-shadow-sm">
      {label}
    </p>
  </motion.div>
)

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // 🎯 Set your target event date and time here
    const targetDate = new Date("2025-11-26T18:30:00").getTime()
    // ^ Example: Dec 14, 2025, 6:30 PM (local time)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // ⏰ If countdown is over, reset to zero
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="countdown"
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background to-baby-blue/5 overflow-hidden"
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(200,150,200,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(168,216,216,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(244,201,184,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <GradientHeading text="Time Until Celebration" className="text-5xl md:text-6xl mb-4" />
          <p className="text-foreground/80 text-lg drop-shadow-md font-medium">
            Save the date and mark your calendars!
          </p>
        </motion.div>

        {/* Countdown grid */}
        <motion.div
          className="flex justify-center gap-3 md:gap-6 mb-12 flex-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CountdownUnit value={timeLeft.days} label="Days" />
          <div className="flex items-center text-2xl md:text-3xl text-lilac/60 font-bold">:</div>
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <div className="flex items-center text-2xl md:text-3xl text-lilac/60 font-bold">:</div>
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <div className="flex items-center text-2xl md:text-3xl text-lilac/60 font-bold">:</div>
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="glass px-10 py-4 rounded-full text-lilac font-bold text-lg hover:shadow-2xl transition-all duration-300 border-2 border-lilac/40 hover:border-lilac/80 backdrop-blur-md"
            whileHover={{ scale: 1.1, y: -8, boxShadow: "0 25px 50px rgba(200, 150, 200, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Save the Date 💾
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
