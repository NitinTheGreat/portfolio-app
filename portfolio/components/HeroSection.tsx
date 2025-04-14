"use client"

import { forwardRef, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import HeroCanvas from "@/components/HeroCanvas"
import { FaArrowDown } from "react-icons/fa"

const HeroSection = forwardRef<HTMLElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="h-screen relative flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      <HeroCanvas />

      <div className="z-10 text-center px-4 relative">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Nitin Pandey
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          Crafting digital experiences with code and creativity
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
            <FaArrowDown className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="#contact"
            className="px-8 py-3 rounded-full bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-slate-400 flex items-start justify-center p-1"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <motion.div
            className="w-1 h-2 bg-slate-400 rounded-full"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
})

HeroSection.displayName = "HeroSection"
export default HeroSection
