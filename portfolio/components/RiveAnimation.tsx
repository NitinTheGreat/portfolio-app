"use client"

import { useEffect, useRef, useState } from "react"
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas"

interface RiveAnimationProps {
  animationSrc: string
  stateMachine?: string
  autoplay?: boolean
}

export default function RiveAnimation({
  animationSrc,
  stateMachine = "State Machine 1",
  autoplay = true,
}: RiveAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRiveLoaded, setIsRiveLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const { rive, RiveComponent: RiveCanvas } = useRive({
    src: animationSrc,
    stateMachines: stateMachine,
    autoplay: autoplay,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoad: () => setIsRiveLoaded(true),
    // onError: () => setHasError(true),
  })

  // Adjust the animation based on mouse movement
  useEffect(() => {
    if (!containerRef.current || !rive || hasError) return

    const handleMouseMove = (e: MouseEvent) => {
      try {
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

        // Try to find inputs in the state machine
        try {
          const inputs = rive.stateMachineInputs(stateMachine)
          const mouseXInput = inputs?.find((input) => input.name === "mouseX")
          const mouseYInput = inputs?.find((input) => input.name === "mouseY")

          if (mouseXInput) mouseXInput.value = normalizedX
          if (mouseYInput) mouseYInput.value = normalizedY
        } catch (error) {
          // Silently handle if inputs don't exist
        }
      } catch (error) {
        // Silently handle any errors
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [rive, hasError, stateMachine])

  // Fallback content if Rive fails to load
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-cyan-900/30 animate-gradient"></div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      {!isRiveLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <RiveCanvas className="w-full h-full" />
    </div>
  )
}
