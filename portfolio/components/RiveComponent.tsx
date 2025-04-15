"use client"

import { useEffect, useRef } from "react"
import { useRive } from "@rive-app/react-canvas"

export default function RiveComponent() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { rive, RiveComponent: RiveCanvas } = useRive({
    src: "/hero/hero.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    artboard: "New Artboard",
  })

  // Adjust the animation based on mouse movement
  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!rive) return

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

      // Use these values to influence the animation if needed
      // For example, you could set inputs on your state machine
      // if you have inputs like "mouseX" and "mouseY"
      // mouseXInput?.value = normalizedX
      // mouseYInput?.value = normalizedY
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [rive])

  return (
    <div ref={containerRef} className="w-full h-full">
      <RiveCanvas className="w-full h-full" />
    </div>
  )
}
