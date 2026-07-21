import { CatmullRomCurve3, Vector3 } from "three"
import { planets, type PlanetId } from "@/lib/planets"

const cameraOffsets: Record<PlanetId, [number, number, number]> = {
  home: [0, 0, 0],
  aeza: [6, 4, 14],
  iivy: [-5, 4, 14],
  donna: [7, 5, 14],
  drishti: [-6, 4, 14],
  "conjunction-triage": [4, 3, 14],
  landing: [0, 4, 13],
}

const controlPoints = planets.map((planet) => {
  const [px, py, pz] = planet.worldPosition
  const [ox, oy, oz] = cameraOffsets[planet.id]
  return new Vector3(px + ox, py + oy, pz + oz)
})

export const cameraCurve = new CatmullRomCurve3(controlPoints, false, "catmullrom", 0.5)

export const planetAnchors = planets.map((planet) => ({
  id: planet.id,
  position: new Vector3(...planet.worldPosition),
}))

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export function cameraPositionAt(t: number, target: Vector3) {
  return cameraCurve.getPointAt(clamp01(t), target)
}

export function cameraLookAtAt(t: number, target: Vector3) {
  return cameraCurve.getPointAt(Math.min(clamp01(t) + 0.01, 0.999), target)
}
