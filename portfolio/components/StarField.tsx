"use client"

import { useRef, useEffect } from "react"

interface StarFieldProps {
  mousePosition: { x: number; y: number }
}

export default function StarField({ mousePosition }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize stars array first
    const stars: { x: number; y: number; size: number; brightness: number }[] = []

    // Set canvas dimensions to match window size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Clear existing stars
      stars.length = 0
      
      // Generate new stars
      const starCount = Math.floor((canvas.width * canvas.height) / 1000)
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random() * 0.8 + 0.2,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial setup

    // Animation loop
    function animate() {
      if (!canvas) return
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate parallax effect based on mouse position
      const parallaxX = mousePosition.x * 30
      const parallaxY = mousePosition.y * 30

      // Draw stars with parallax effect
      stars.forEach((star) => {
        const depth = star.size / 2.5 // Smaller stars move more (appear further away)
        const offsetX = parallaxX * depth
        const offsetY = parallaxY * depth

        if (ctx) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
          ctx.beginPath()
          ctx.arc(star.x + offsetX, star.y + offsetY, star.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [mousePosition])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
