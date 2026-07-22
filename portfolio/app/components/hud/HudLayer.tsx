"use client"

import { MiniMap } from "./MiniMap"
import { HudMenu } from "./HudMenu"
import { SoundToggle } from "./SoundToggle"
import { CoordinatesReadout } from "./CoordinatesReadout"
import { PlanetOverlay } from "./PlanetOverlay"
import { ConstellationOverlay } from "./ConstellationOverlay"
import { LandingOverlay } from "./LandingOverlay"
import { ModalRoot } from "./ModalRoot"

export function HudLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <PlanetOverlay />
      <ConstellationOverlay />
      <LandingOverlay />
      <MiniMap />
      <HudMenu />
      <SoundToggle />
      <CoordinatesReadout />
      <ModalRoot />
    </div>
  )
}
