"use client"

import { MiniMap } from "./MiniMap"
import { SkipButton } from "./SkipButton"
import { SoundToggle } from "./SoundToggle"
import { CoordinatesReadout } from "./CoordinatesReadout"
import { PlanetOverlay } from "./PlanetOverlay"

export function HudLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <PlanetOverlay />
      <MiniMap />
      <SkipButton />
      <SoundToggle />
      <CoordinatesReadout />
    </div>
  )
}
