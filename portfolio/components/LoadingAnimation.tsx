"use client"

import { useEffect, useRef } from "react"
import RiveAnimation from "@/components/RiveAnimation"

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
      {/* Rive animation - using the same pattern as your working component */}
      <div className=" overflow-x-hidden absolute left-0 right-0 w-[100vw] h-[100vh] z-999 opacity-60  md:block flex justify-center items-center">
        
        <RiveAnimation animationSrc="/planet.riv" />
      </div>

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
