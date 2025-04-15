"use client"

import { useState, useEffect, type RefObject } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { HiMenu, HiX } from "react-icons/hi"

interface NavbarProps {
    heroRef: RefObject<HTMLElement | null>
    projectsRef: RefObject<HTMLElement | null>
    aboutRef: RefObject<HTMLElement | null>
    contactRef: RefObject<HTMLElement | null>
  }
export default function Navbar({ heroRef, projectsRef, aboutRef, contactRef }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" })
        setIsMobileMenuOpen(false)
      }
    }

  const navItems = [
    { name: "Home", ref: heroRef },
    { name: "Projects", ref: projectsRef },
    { name: "About", ref: aboutRef },
    { name: "Contact", ref: contactRef },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled ? "bg-slate-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Nitin Pandey
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => scrollToSection(item.ref)}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            
              >
                {item.name}
              </motion.button>
            ))}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </motion.button>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500"
          style={{ scaleX, transformOrigin: "0%" }}
        />
      </motion.header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-md pt-20 px-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <nav className="flex flex-col items-center space-y-8 py-10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                className="text-xl text-white/80 hover:text-white transition-colors"
                onClick={() => scrollToSection(item.ref)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Resume
            </motion.a>
          </nav>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-6">
            <motion.a
              href="https://github.com/NItinTheGreat"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaGithub className="w-6 h-6 text-white/80 hover:text-white" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/nitinkrpandey"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaLinkedin className="w-6 h-6 text-white/80 hover:text-white" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </>
  )
}
