"use client"

import { useMemo } from "react"
import { useThree } from "@react-three/fiber"
import { Vector3 } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"
import { usePortfolio } from "@/store/portfolio"
import { cameraPositionAt, cameraLookAtAt } from "@/lib/spline"

export function CameraRig() {
  const camera = useThree((state) => state.camera)
  const position = useMemo(() => new Vector3(), [])
  const lookAt = useMemo(() => new Vector3(), [])

  useAmbientFrame(() => {
    const t = usePortfolio.getState().scrollProgress
    cameraPositionAt(t, position)
    camera.position.copy(position)
    cameraLookAtAt(t, lookAt)
    camera.lookAt(lookAt)
  })

  return null
}
