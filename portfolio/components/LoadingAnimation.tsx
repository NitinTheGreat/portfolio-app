"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function LoadingAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Create a particle effect in the background
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLDivElement[] = []
    const particleCount = 30

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full bg-indigo-500/20"

      // Random size between 5px and 20px
      const size = Math.random() * 15 + 5
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random animation duration between 10s and 20s
      const duration = Math.random() * 10 + 10
      particle.style.animation = `float ${duration}s ease-in-out infinite`

      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach((particle) => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-indigo-950 overflow-hidden relative"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="w-64 h-64 relative z-10"
      >
        <div className="w-24 h-24 border-t-4 border-indigo-500 rounded-full animate-spin mx-auto"></div>
        <div className="mt-8 text-2xl font-bold text-center text-white">Loading...</div>
      </motion.div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  )
}
