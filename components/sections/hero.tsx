"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { RevealText } from "@/components/animations/text-animations"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.3, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.8,
    },
  },
}

const emphasizeVariants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 0.98, 1.02, 1],
    transition: {
      delay: 0.6,
      duration: 0.8,
      times: [0, 0.2, 0.4, 0.6, 1],
    },
  },
}

export default function Hero() {
  const scrollToNext = () => {
    const eventSection = document.getElementById("event-details")
    if (eventSection) {
      const offset = 70
      const top = eventSection.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background"
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            // 🌸 Blush → Periwinkle
            "linear-gradient(135deg, rgba(242, 210, 255, 0.55) 0%, rgba(191, 222, 255, 0.55) 100%)",

            // 💜 Soft Lilac → Blush Rose
            "linear-gradient(225deg, rgba(225, 200, 255, 0.55) 0%, rgba(255, 205, 225, 0.55) 100%)",

            // 💙 Baby Blue → Pink Mist
            "linear-gradient(315deg, rgba(205, 225, 255, 0.55) 0%, rgba(255, 210, 235, 0.55) 100%)",
          ],
        }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}

        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}

        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
      />

      {/* Floating blob animations */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-lilac/20 to-gold/20 blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 20, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-baby-blue/20 to-mint/20 blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -20, 0], rotate: [0, -45, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-peach/15 to-blush/15 blur-3xl"
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="relative z-10 text-center max-w-3xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={popUpVariants}>
          <motion.h1
            className="text-6xl md:text-8xl font-serif font-bold mb-6 drop-shadow-2xl"
            variants={emphasizeVariants}
            initial="hidden"
            animate="visible"
          >
            🎈{" "} 
            <span className="bg-gradient-to-r from-lilac via-gold to-baby-blue bg-clip-text animate-gradient-shift">
              You're Invited! ✨
            </span>
          </motion.h1>
        </motion.div>

        <motion.div
          className="text-xl md:text-3xl text-foreground font-light leading-relaxed drop-shadow-lg mb-8 font-poppins"
          variants={itemVariants}
        >
          <RevealText text="Let's celebrate this special day together with joy, elegance, and unforgettable moments." />
        </motion.div>

        <motion.button
          onClick={scrollToNext}
          className="glass px-8 py-4 rounded-full text-lilac font-bold text-lg mb-12 hover:shadow-2xl transition-all duration-300 border-2 border-lilac/40 hover:border-lilac/80 backdrop-blur-md"
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -10, boxShadow: "0 25px 50px rgba(200, 150, 200, 0.35)" }}
          whileTap={{ scale: 0.95 }}
        >
          See Details ↓
        </motion.button>

        {/* Enhanced scroll indicator */}
        <motion.div
        className="flex justify-center cursor-pointer"
        onClick={() => {
          const section = document.getElementById("event-details")
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }}
        animate={{ y: [0, 12, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
        whileHover={{ scale: 1.1 }}
      >
        <ChevronDown className="w-8 h-8 text-[#8b6ea3] opacity-90 hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
      </motion.div>
    </section>
  )
}
