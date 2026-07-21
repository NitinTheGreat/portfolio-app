"use client"

import { useRef } from "react"
import type { Group } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { Starfield } from "./Starfield"
import { MilkyWay } from "./MilkyWay"

export function Sky() {
  const ref = useRef<Group>(null)

  useAmbientFrame((_, __, state) => {
    ref.current?.position.copy(state.camera.position)
  })

  return (
    <group ref={ref}>
      <MilkyWay />
      <Starfield />
    </group>
  )
}
