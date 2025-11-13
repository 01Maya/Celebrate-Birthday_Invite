"use client"

import { motion } from "framer-motion"
import { Mail, MessageSquare, Share2 } from "lucide-react"
import { RevealText } from "@/components/animations/text-animations"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function ClosingSection() {
  return (
    <section
      id="closing"
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-blush/5 to-background overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{
              background: ["from-lilac/15", "from-gold/15", "from-baby-blue/15", "from-peach/15"][i],
              left: `${(i * 25) % 100}%`,
              top: `${(i * 30) % 100}%`,
            }}
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main message */}
          <motion.h2
            className="text-5xl md:text-7xl font-serif font-bold mb-8 drop-shadow-xl bg-gradient-to-r from-lilac via-gold via-peach to-baby-blue bg-clip-text text-transparent animate-gradient-shift"
            variants={itemVariants}
          >
            <RevealText text="Can't wait to celebrate this special day with you!" />
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-2xl text-foreground/90 mb-12 leading-relaxed drop-shadow-lg font-medium"
            variants={itemVariants}
          >
            Your presence is the greatest gift. Let's create unforgettable memories together in an evening filled with
            joy, elegance, and celebration.
          </motion.p>

          {/* See You Soon text with enhanced animation */}
<motion.div className="mb-12" variants={itemVariants}>
  <motion.p
    className="text-4xl md:text-5xl font-serif font-bold drop-shadow-lg"
    animate={{ scale: [1, 1.1, 1], y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
    style={{
      background: "linear-gradient(135deg, #b980b8 0%, #e78fb3 50%, #79c8c8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    ✨ See You Soon! ✨
  </motion.p>
</motion.div>


          {/* Social icons with enhanced animations */}
          <motion.div className="flex justify-center gap-6 mb-12 flex-wrap" variants={containerVariants}>
            {[
              { icon: Mail, label: "Email", color: "text-lilac" },
              { icon: MessageSquare, label: "WhatsApp", color: "text-mint" },
              { icon: Share2, label: "Instagram", color: "text-peach" },
            ].map((social, i) => {
              const Icon = social.icon
              return (
                <motion.button
                  key={i}
                  className={`glass p-5 rounded-full ${social.color} hover:shadow-2xl transition-all duration-300 border-2 border-lilac/20 hover:border-lilac/40 backdrop-blur-md`}
                  variants={itemVariants}
                  whileHover={{ y: -15, scale: 1.2, boxShadow: "0 20px 40px rgba(200, 150, 200, 0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-7 h-7" />
                </motion.button>
              )
            })}
          </motion.div>

          {/* Closing text */}
          <motion.p
            className="text-base md:text-lg text-foreground/70 uppercase tracking-widest font-bold drop-shadow-md"
            variants={itemVariants}
          >
            With love and excitement 🎈💕
          </motion.p>
        </motion.div>
      </div>

      {/* Enhanced floating confetti particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ["#c896c8", "#f5a6cc", "#f4c9b8", "#a8d8d8"][Math.floor(Math.random() * 4)],
              boxShadow: `0 0 ${3 + Math.random() * 4}px currentColor`,
            }}
            animate={{ y: [0, -150, 0], opacity: [0, 0.8, 0], x: Math.random() * 50 - 25 }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}
