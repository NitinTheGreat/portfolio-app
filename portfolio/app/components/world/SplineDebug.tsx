"use client"

import { useMemo } from "react"
import { Line } from "@react-three/drei"
import { cameraCurve, planetAnchors } from "@/lib/spline"

export function SplineDebug() {
  const points = useMemo(() => cameraCurve.getPoints(200), [])

  return (
    <group>
      <Line points={points} color="#ffffff" lineWidth={1} transparent opacity={0.7} />
      {planetAnchors.map((anchor) => (
        <mesh key={anchor.id} position={anchor.position}>
          <sphereGeometry args={[0.7, 12, 12]} />
          <meshBasicMaterial color="#ff3b6b" wireframe />
        </mesh>
      ))}
    </group>
  )
}
