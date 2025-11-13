"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "event-details", "gallery", "countdown", "location", "closing"]
      let current = "home"

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if section is in viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section
            break
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Details", id: "event-details" },
    { label: "Gallery", id: "gallery" },
    { label: "Countdown", id: "countdown" },
    { label: "Location", id: "location" },
    { label: "RSVP", id: "closing" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) {
      console.log("[v0] Section not found:", id)
      return
    }

    setIsOpen(false)

    // Use setTimeout to allow menu to close first
    setTimeout(() => {
      const navHeight = 80
      const elementTop = element.getBoundingClientRect().top
      const scrollTop = window.scrollY
      const offset = elementTop + scrollTop - navHeight

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-background/90 shadow-xl" : "bg-background/50"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-serif font-bold cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("home")}
          >
          <span
            style={{
              background: "linear-gradient(135deg, #7b3e82 0%, #d85a8a 50%, #3fa6a6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
            }}
          >
            🎉 Celebrate
          </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 font-medium text-sm relative group transition-colors duration-300 ${
                  activeSection === item.id ? "text-lilac" : "text-foreground/70 hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-lilac to-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-lilac" /> : <Menu className="w-6 h-6 text-lilac" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden border-t border-lilac/10 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-2 bg-background/95 backdrop-blur-md max-h-96 overflow-y-auto">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 font-medium rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-lilac/20 text-lilac"
                        : "text-foreground/80 hover:text-lilac hover:bg-lilac/10"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <div className="h-16" />
    </>
  )
}
