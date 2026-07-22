"use client"

import { MiniMap } from "./MiniMap"
import { HudMenu } from "./HudMenu"
import { SoundToggle } from "./SoundToggle"
import { CoordinatesReadout } from "./CoordinatesReadout"
import { PlanetOverlay } from "./PlanetOverlay"
import { ModalRoot } from "./ModalRoot"

export function HudLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <PlanetOverlay />
      <MiniMap />
      <HudMenu />
      <SoundToggle />
      <CoordinatesReadout />
      <ModalRoot />
    </div>
  )
}
