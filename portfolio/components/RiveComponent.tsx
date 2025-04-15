"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function RiveComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current!
      const rect = container.getBoundingClientRect()

      // Calculate mouse position relative to container center
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Calculate normalized values (-1 to 1)
      const normalizedX = (mouseX - centerX) / centerX
      const normalizedY = (mouseY - centerY) / centerY

      setMousePosition({ x: normalizedX, y: normalizedY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Create animated particles instead of using Rive
  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-cyan-900/30" />

      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/20"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: `calc(${Math.random() * 100}% + ${mousePosition.x * 20}px)`,
            y: `calc(${Math.random() * 100}% + ${mousePosition.y * 20}px)`,
            scale: [Math.random() * 0.5 + 0.5, Math.random() * 1 + 0.8, Math.random() * 0.5 + 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}

      {/* Larger central element */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 blur-xl"
        initial={{ x: "50%", y: "50%", scale: 1 }}
        animate={{
          x: `calc(50% + ${mousePosition.x * 30}px)`,
          y: `calc(50% + ${mousePosition.y * 30}px)`,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          width: "300px",
          height: "300px",
          marginLeft: "-150px",
          marginTop: "-150px",
        }}
      />
    </div>
  )
}
