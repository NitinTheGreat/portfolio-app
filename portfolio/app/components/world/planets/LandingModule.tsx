"use client"

import { planetById } from "@/lib/planets"

const POSITION = planetById.landing.worldPosition

export function LandingModule() {
  return (
    <group position={POSITION} rotation={[0.1, -0.5, 0]}>
      <mesh>
        <boxGeometry args={[1.5, 0.8, 1]} />
        <meshStandardMaterial color="#2a3242" metalness={0.6} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.501]}>
        <planeGeometry args={[0.9, 0.42]} />
        <meshBasicMaterial color="#ffd9a8" toneMapped={false} />
      </mesh>
      <mesh position={[-0.55, 0.5, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 6]} />
        <meshStandardMaterial color="#c8ccd2" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.55, -0.2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.62, 6]} />
        <meshStandardMaterial color="#c8ccd2" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.5, 0.48, 0.15]}>
        <cylinderGeometry args={[0.015, 0.015, 0.44, 6]} />
        <meshStandardMaterial color="#c8ccd2" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.95, -0.05, 0]}>
        <boxGeometry args={[0.5, 0.28, 0.6]} />
        <meshStandardMaterial color="#222a38" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
}
