// ...existing code...
"use client"

import { motion } from "framer-motion"
import { MapPin, Phone } from "lucide-react"
import { GradientHeading } from "@/components/animations/text-animations"

export default function Location() {
  return (
    <section
      id="location"
      className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-baby-blue/5 to-blush/5 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(168, 216, 216, 0.15) 0%, transparent 70%)",
            "radial-gradient(circle at 60% 40%, rgba(200, 150, 200, 0.15) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 60%, rgba(244, 201, 184, 0.15) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <GradientHeading text="Location & Details" className="text-5xl md:text-6xl mb-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Info section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="space-y-6">
              <motion.div
                className="glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-lilac/10 hover:border-lilac/40"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <MapPin className="w-7 h-7 text-lilac mt-1 flex-shrink-0 drop-shadow-md" />
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2 drop-shadow-md">Venue</h3>
                    <p className="text-foreground/80 font-medium leading-relaxed drop-shadow-sm">
                      The Grand Ballroom
                      <br />
                      125 Luxury Avenue
                      <br />
                      Downtown, City 12345
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-lilac/10 hover:border-lilac/40"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Phone className="w-7 h-7 text-lilac mt-1 flex-shrink-0 drop-shadow-md" />
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2 drop-shadow-md">Contact</h3>
                    <p className="text-foreground/80 font-medium leading-relaxed drop-shadow-sm">
                      +1 (555) 123-4567
                      <br />
                      Available 10 AM - 6 PM
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Map visualization */}
          <motion.div
            className="glass rounded-2xl flex flex-col items-center overflow-hidden relative border border-lilac/10 p-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Top: visual map / icon area (fixed aspect) */}
            <div className="w-full aspect-video bg-gradient-to-br from-baby-blue/20 to-mint/20 flex items-center justify-center relative rounded-xl overflow-hidden">
              <motion.div className="relative w-40 h-40 flex items-center justify-center">
                {/* Outer pulsing ring (limited size so it won't cover caption) */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-lilac/50"
                  animate={{ scale: [1, 1.8, 2.2], opacity: [0.9, 0.4, 0] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                />
                {/* Middle pulsing ring */}
                <motion.div
                  className="absolute inset-6 rounded-full border-2 border-lilac/70"
                  animate={{ scale: [1, 1.5, 1.8], opacity: [1, 0.6, 0.2] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                />
                <MapPin className="w-10 h-10 text-lilac relative z-20 drop-shadow-lg" />
              </motion.div>
            </div>

            {/* Caption moved below the visual area to avoid overlap */}
            <p className="mt-4 text-center text-foreground font-bold text-lg drop-shadow-md z-10">
              📍 The Grand Ballroom
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
// ...existing code...