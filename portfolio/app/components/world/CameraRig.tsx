"use client"

import { useMemo } from "react"
import { useThree } from "@react-three/fiber"
import { Vector3 } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { usePortfolio } from "@/store/portfolio"
import { cameraPositionAt, cameraLookAtAt } from "@/lib/spline"
import { planets, planetById, type PlanetId } from "@/lib/planets"

const INITIAL_DIR = new Vector3(1, 0.2, -3).normalize()
const ZONE = 0.05
const ORBIT_RADIUS = 9
const ORBIT_SPAN = Math.PI * 0.66
const BASE_ANGLE = 1.2
const SNAP_ANGLES: Record<number, number> = { 3: 1.2 + Math.PI }
const SNAP_INDICES = [1, 2, 3, 4, 5, 6]
const LAST = planets.length - 1

const UP = new Vector3(0, 1, 0)
const smoothstep = (e: number) => e * e * (3 - 2 * e)

export function CameraRig({ camTarget, tOverride }: { camTarget?: string; tOverride?: number }) {
  const camera = useThree((state) => state.camera)
  const splinePos = useMemo(() => new Vector3(), [])
  const ahead = useMemo(() => new Vector3(), [])
  const tangent = useMemo(() => new Vector3(), [])
  const dir = useMemo(() => new Vector3(), [])
  const splineLook = useMemo(() => new Vector3(), [])
  const orbitPos = useMemo(() => new Vector3(), [])
  const planetPos = useMemo(() => new Vector3(), [])
  const finalPos = useMemo(() => new Vector3(), [])
  const finalLook = useMemo(() => new Vector3(), [])
  const forward = useMemo(() => new Vector3(), [])
  const right = useMemo(() => new Vector3(), [])
  const up = useMemo(() => new Vector3(), [])

  useAmbientFrame(() => {
    if (camTarget && planetById[camTarget as PlanetId]) {
      const [px, py, pz] = planetById[camTarget as PlanetId].worldPosition
      camera.position.set(px + 6, py + 2, pz + 8)
      camera.lookAt(px, py, pz)
      return
    }

    const t = tOverride ?? usePortfolio.getState().scrollProgress

    cameraPositionAt(t, splinePos)
    cameraLookAtAt(t, ahead)
    tangent.copy(ahead).sub(splinePos).normalize()
    const heroBlend = Math.min(Math.max(t / 0.1, 0), 1)
    dir.copy(INITIAL_DIR).lerp(tangent, heroBlend).normalize()
    splineLook.copy(splinePos).add(dir)

    let snapBlend = 0
    for (const i of SNAP_INDICES) {
      const pt = i / LAST
      const d = Math.abs(t - pt)
      if (d < ZONE) {
        snapBlend = 1 - smoothstep(d / ZONE)
        planetPos.set(...planets[i].worldPosition)
        const angle = (SNAP_ANGLES[i] ?? BASE_ANGLE) + ((t - pt) / ZONE) * (ORBIT_SPAN / 2)
        orbitPos.set(
          planetPos.x + Math.cos(angle) * ORBIT_RADIUS,
          planetPos.y + 2.5,
          planetPos.z + Math.sin(angle) * ORBIT_RADIUS,
        )
        break
      }
    }

    if (snapBlend > 0) {
      finalPos.copy(splinePos).lerp(orbitPos, snapBlend)
      finalLook.copy(splineLook).lerp(planetPos, snapBlend)
      forward.copy(finalLook).sub(finalPos)
      right.copy(forward).cross(UP).normalize()
      finalLook.addScaledVector(right, 1.8 * snapBlend)
    } else {
      finalPos.copy(splinePos)
      finalLook.copy(splineLook)
    }

    const cursor = usePortfolio.getState().cursor
    forward.copy(finalLook).sub(finalPos)
    right.copy(forward).cross(UP).normalize()
    up.copy(right).cross(forward).normalize()
    finalLook.addScaledVector(right, cursor.x * 0.25).addScaledVector(up, cursor.y * 0.25)

    camera.position.copy(finalPos)
    camera.lookAt(finalLook)
  })

  return null
}
