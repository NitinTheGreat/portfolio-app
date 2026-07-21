"use client"

import { useMemo } from "react"
import { useThree } from "@react-three/fiber"
import { Vector3 } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { usePortfolio } from "@/store/portfolio"
import { cameraPositionAt, cameraLookAtAt } from "@/lib/spline"

const INITIAL_DIR = new Vector3(1, 0.2, -3).normalize()

export function CameraRig() {
  const camera = useThree((state) => state.camera)
  const position = useMemo(() => new Vector3(), [])
  const lookPoint = useMemo(() => new Vector3(), [])
  const tangentDir = useMemo(() => new Vector3(), [])
  const dir = useMemo(() => new Vector3(), [])

  useAmbientFrame(() => {
    const t = usePortfolio.getState().scrollProgress
    cameraPositionAt(t, position)
    camera.position.copy(position)

    cameraLookAtAt(t, lookPoint)
    tangentDir.copy(lookPoint).sub(position).normalize()

    const blend = Math.min(Math.max(t / 0.1, 0), 1)
    dir.copy(INITIAL_DIR).lerp(tangentDir, blend).normalize()
    lookPoint.copy(position).add(dir)
    camera.lookAt(lookPoint)
  })

  return null
}
