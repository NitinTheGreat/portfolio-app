"use client"

import { useMemo, useRef } from "react"
import { BackSide, Color, type Mesh } from "three"
import { useAmbientFrame } from "@/hooks/useAmbientClock"

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vPos;
  uniform vec3 uDusk;
  uniform vec3 uNoon;
  uniform vec3 uDeep;
  void main() {
    float h = clamp(vPos.y / 400.0 * 0.5 + 0.5, 0.0, 1.0);
    vec3 lower = mix(uDusk, uNoon, smoothstep(0.0, 0.5, h));
    vec3 col = mix(lower, uDeep, smoothstep(0.45, 1.0, h));
    gl_FragColor = vec4(col, 1.0);
  }
`

export function Sky() {
  const ref = useRef<Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uDusk: { value: new Color("#f2c89a") },
      uNoon: { value: new Color("#8fb5c9") },
      uDeep: { value: new Color("#2b3a55") },
    }),
    [],
  )

  useAmbientFrame((_, __, state) => {
    ref.current?.position.copy(state.camera.position)
  })

  return (
    <mesh ref={ref} frustumCulled={false}>
      <sphereGeometry args={[400, 32, 16]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}
