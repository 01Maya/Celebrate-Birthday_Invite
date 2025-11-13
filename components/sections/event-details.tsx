"use client"

import { motion } from "framer-motion"
import { GradientHeading } from "@/components/animations/text-animations"

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
}

const details = [
  {
    icon: "🎂",
    title: "What",
    content: "Ava's 21st Birthday Bash",
    description: "A glamorous celebration of an incredible year",
  },
  {
    icon: "🕐",
    title: "When",
    content: "Saturday, December 14th, 2024",
    description: "7:00 PM - 11:00 PM",
  },
  {
    icon: "📍",
    title: "Where",
    content: "The Grand Ballroom",
    description: "125 Luxury Avenue, Downtown",
  },
]

export default function EventDetails() {
  return (
    <section
      id="event-details"
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background to-blush/5 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full opacity-10"
            style={{
              background: ["from-lilac/20", "from-gold/20", "from-baby-blue/20"][i],
              left: ["10%", "70%", "50%"][i],
              top: ["20%", "60%", "40%"][i],
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 8 + i * 2, repeat: Number.POSITIVE_INFINITY }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <GradientHeading text="Event Details" className="text-5xl md:text-6xl mb-4" />
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-lilac to-gold mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {details.map((detail, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-lilac/10 hover:border-lilac/40"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ y: -15, boxShadow: "0 30px 60px rgba(200, 150, 200, 0.25)" }}
            >
              <motion.div
                className="text-6xl mb-4 inline-block"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {detail.icon}
              </motion.div>
              <h3 className="text-lilac font-serif text-2xl font-bold mb-2 drop-shadow-md">{detail.title}</h3>
              <p className="text-foreground font-medium text-lg mb-2 drop-shadow-sm">{detail.content}</p>
              <p className="text-foreground/70 text-sm drop-shadow-sm">{detail.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Decorative sparkles */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block text-5xl"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.1, 0.95] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          >
            ✨ ✨ ✨
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
